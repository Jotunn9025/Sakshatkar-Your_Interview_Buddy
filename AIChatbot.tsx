'use client'

import { useState } from 'react'
import { useChat } from 'ai/react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function AIChatbot({ selectedQuestion, code }: { selectedQuestion: any, code: string }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: selectedQuestion ? [
      { role: 'system', content: `You are an AI assistant helping with LeetCode problems. The current problem is: ${selectedQuestion.title}` },
      { role: 'user', content: `Can you help me with the problem "${selectedQuestion.title}"?` }
    ] : [],
    body: {
      code,
      questionTitle: selectedQuestion?.title
    },
  });

  return (
    <Card className="h-full flex flex-col bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle>AI Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full">
          {messages.map(m => (
            <div key={m.id} className="mb-4">
              <p className="font-bold">{m.role === 'user' ? 'You:' : 'AI:'}</p>
              <p>{m.content}</p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask a question..."
          />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  )
}

