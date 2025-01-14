'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function IDE({ selectedQuestion, code, setCode }: { selectedQuestion: any, code: string, setCode: (code: string) => void }) {
  // const [code, setCode] = useState('')

  const getStarterCode = (question: any) => {
    if (!question) return '';
    return `// ${question.title}\n\n// Write your solution here\n`;
  }

  useEffect(() => {
    if (selectedQuestion) {
      setCode(getStarterCode(selectedQuestion));
    }
  }, [selectedQuestion, setCode]);

  const handleRunCode = () => {
    // Implement code execution logic here
    console.log('Running code:', code)
  }

  return (
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
  )
}

