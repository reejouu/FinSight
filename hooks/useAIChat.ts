"use client";

import { useState, useRef, useEffect } from 'react';
import { useFinanceStore } from '@/store/useFinanceStore';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  streaming?: boolean;
};

export function useAIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { transactions, budgets } = useFinanceStore();

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content };
    const assistantId = (Date.now() + 1).toString();
    const tempAssistantMsg: Message = { id: assistantId, role: 'assistant', content: '', streaming: true };

    setMessages(prev => [...prev, userMsg, tempAssistantMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          transactions,
          budgets
        }),
      });

      if (!response.body) throw new Error('No body in response');
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        streamedContent += decoder.decode(value, { stream: true });
        
        setMessages(prev => prev.map(m => 
          m.id === assistantId ? { ...m, content: streamedContent } : m
        ));
      }

      setMessages(prev => prev.map(m => 
        m.id === assistantId ? { ...m, streaming: false } : m
      ));
    } catch (err) {
      console.error(err);
      setMessages(prev => prev.map(m => 
        m.id === assistantId 
          ? { ...m, content: 'Sorry, I encountered an error answering your request.', streaming: false } 
          : m
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => setMessages([]);

  return {
    messages,
    input,
    setInput,
    isLoading,
    sendMessage,
    clearChat,
    bottomRef
  };
}