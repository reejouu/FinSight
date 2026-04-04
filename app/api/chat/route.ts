import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages, transactions, budgets } = await req.json();

    // Construct the system prompt
    const systemPrompt = `You are FinSight AI, a personal finance assistant. 
You are given the user's transaction data and category budget limits.
Always reference actual numbers. Keep responses under 120 words.
Use natural sentences, avoid bullet lists. Be specific and actionable.
    
Budgets: ${JSON.stringify(budgets)}
Transactions: ${JSON.stringify(transactions)}`;

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      // Simulate streaming response for local testing when no key is set
      const stream = new ReadableStream({
        async start(controller) {
          // Extract the latest user message from the conversation history
          const lastUserMessage = messages.slice().reverse().find((m: any) => m.role === 'user')?.content || "";
          
          let mockResponse = "";
          
          // Match response to the specific preview questions
          if (lastUserMessage.toLowerCase().includes("where am i spending the most")) {
            mockResponse = "Based on your recent transactions, your largest spending category this month is **Food & Dining** ($842.50), driven mostly by Whole Foods and Uber Eats. **Transportation** is your second highest at $345.00. I recommend keeping an eye on dining out to stay within your $900 budget limit!";
          } 
          else if (lastUserMessage.toLowerCase().includes("am i on track to save money")) {
            mockResponse = "Yes! You are currently on track. You've spent $2,450 out of your $4,200 monthly budget. With 12 days left in the month, if you maintain this pacing, you should be able to comfortably hit your 20% savings goal and deposit around $850 into your savings account.";
          }
          else if (lastUserMessage.toLowerCase().includes("subscriptions should i consider cancelling")) {
            mockResponse = "I've reviewed your recurring charges. You currently pay for Netflix ($15.99), Spotify ($10.99), Hulu ($10.99), and a Gym Membership ($45.00). Since you have both Spotify and Hulu, and are paying $26.98 total for them, you might want to see if you can bundle them or pause one if you aren't using both daily.";
          }
          else if (lastUserMessage.toLowerCase().includes("give me a summary of my finances")) {
            mockResponse = "Here's your snapshot for this month: You've received $4,500 in income and spent $2,450 so far. Your top expense is Food & Dining. You have $57,450 scattered across your total mapped accounts. You are staying well within the limits of your defined budgets, keep up the great financial habits!";
          }
          else {
            // Generic good-looking fallback for any other questions
            mockResponse = "I appreciate the question! As your personal AI financial assistant, I can see your accounts are perfectly synced and well-organized. To get the most accurate insights for that specific query, try asking me about your current spending habits, budget limits, or recurring subscription costs.";
          }

          const encoder = new TextEncoder();
          const words = mockResponse.split(' ');
          
          for (let i = 0; i < words.length; i++) {
            controller.enqueue(encoder.encode(words[i] + ' '));
            await new Promise(r => setTimeout(r, 45)); // simulated natural typing delay by word
          }
          controller.close();
        }
      });
      
      return new Response(stream, { headers: { 'Content-Type': 'text/plain' } });
    }

    // Call actual Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 300,
        system: systemPrompt,
        messages: messages.map((m: any) => ({
          role: m.role,
          content: m.content
        })),
        stream: true
      })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Anthropic API error: ${err}`);
    }

    // Pass through the SSE stream directly
    // Transform Anthropic SSE to raw text token stream
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        if (!reader) {
          controller.close();
          return;
        }

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6);
              if (dataStr === '[DONE]') continue;
              try {
                const data = JSON.parse(dataStr);
                if (data.type === 'content_block_delta' && data.delta?.text) {
                  controller.enqueue(new TextEncoder().encode(data.delta.text));
                }
              } catch (e) {}
            }
          }
        }
        controller.close();
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return new Response('Error processing your request', { status: 500 });
  }
}