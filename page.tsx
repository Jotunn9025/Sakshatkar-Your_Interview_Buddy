'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useChat } from 'ai/react'
import { Code2, Home, Info } from 'lucide-react'
import Link from 'next/link'
import LeetCodePicker from './components/LeetCodePicker'
import Footer from './components/Footer'

function InterviewPrepApp() {
  const [code, setCode] = useState('')

  const { messages, input, handleInputChange, handleSubmit } = useChat()

  const handleRunCode = () => {
    console.log('Running code:', code)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
            <Code2 className="w-6 h-6" />
            <span>Code-Bro</span>
          </Link>
          <div className="space-x-4">
            <Link href="/" className="flex items-center space-x-1 hover:text-gray-300">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link href="/about" className="flex items-center space-x-1 hover:text-gray-300">
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow grid grid-cols-1 md:grid-cols-[1fr,2fr,1fr] gap-4 p-4">
        <LeetCodePicker />

        <Card className="h-full flex flex-col bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Code Editor</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <Textarea
              className="flex-grow resize-none font-mono bg-gray-900 text-gray-100 border-gray-700"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your code here..."
            />
            <Button className="mt-4" onClick={handleRunCode}>Run Code</Button>
          </CardContent>
        </Card>

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
      </main>

      <Footer />
    </div>
  )
}

export default InterviewPrepApp;

