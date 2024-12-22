'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

type Symptom = 'fever' | 'rash' | 'headache' | 'runny_nose' | 'conjunctivitis' | 'cough' | 'body_ache' | 'chills' | 'sore_throat' | 'sneezing' | 'swollen_glands' | 'fatigue' | 'nausea' | 'vomiting' | 'diarrhea'

const symptoms: Symptom[] = ['fever', 'rash', 'headache', 'runny_nose', 'conjunctivitis', 'cough', 'body_ache', 'chills', 'sore_throat', 'sneezing', 'swollen_glands', 'fatigue', 'nausea', 'vomiting', 'diarrhea']

const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [messages, setMessages] = useState<any[]>([])

  useEffect(() => {
    const ws = new WebSocket(url)
    ws.onopen = () => console.log('WebSocket connection opened')
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      setMessages((prevMessages) => [...prevMessages, message])
    }
    ws.onclose = () => console.log('WebSocket connection closed')
    setSocket(ws)

    return () => {
      ws.close()
    }
  }, [url])

  const sendMessage = (message: any) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message))
    }
  }

  return { messages, sendMessage }
}

export default function DiagnosisPage() {
  const { messages, sendMessage } = useWebSocket('ws://localhost:8080/diagnose')
  const [name, setName] = useState('')
  const [currentSymptomIndex, setCurrentSymptomIndex] = useState<number>(-1)
  const [patientSymptoms, setPatientSymptoms] = useState<Record<Symptom, boolean>>({} as Record<Symptom, boolean>)
  const [diagnosis, setDiagnosis] = useState<string[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1]
      setDiagnosis(latestMessage.diagnosis)
      setIsLoading(false)
    }
  }, [messages])

  const handleStart = () => {
    if (name) {
      setCurrentSymptomIndex(0)
    }
  }

  const handleAnswer = (answer: boolean) => {
    const currentSymptom = symptoms[currentSymptomIndex]
    setPatientSymptoms(prev => ({ ...prev, [currentSymptom]: answer }))

    if (currentSymptomIndex < symptoms.length - 1) {
      setCurrentSymptomIndex(currentSymptomIndex + 1)
    } else {
      getDiagnosis()
    }
  }

  const getDiagnosis = () => {
    setIsLoading(true)
    sendMessage({ patient: name, symptoms: patientSymptoms })
  }

  const reset = () => {
    setName('')
    setCurrentSymptomIndex(-1)
    setPatientSymptoms({} as Record<Symptom, boolean>)
    setDiagnosis(null)
  }

  const currentSymptom = symptoms[currentSymptomIndex]

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <Link href="/" className="inline-flex items-center text-lg mb-8 hover:text-primary">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </Link>
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="space-y-4">
            <CardTitle className="text-3xl">Medical Expert System</CardTitle>
            <CardDescription className="text-lg">
              Answer the questions to get a diagnosis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {currentSymptomIndex === -1 && (
              <div className="space-y-6">
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-lg p-6"
                />
                <Button 
                  onClick={handleStart} 
                  disabled={!name}
                  size="lg"
                  className="w-full text-lg py-6"
                >
                  Start Diagnosis
                </Button>
              </div>
            )}
            {currentSymptomIndex >= 0 && currentSymptomIndex < symptoms.length && !diagnosis && (
              <div className="space-y-6">
                <p className="text-xl">{name}, do you have {currentSymptom.replace('_', ' ')}?</p>
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    onClick={() => handleAnswer(true)}
                    size="lg"
                    className="text-lg py-6"
                  >
                    Yes
                  </Button>
                  <Button 
                    onClick={() => handleAnswer(false)}
                    size="lg"
                    className="text-lg py-6"
                  >
                    No
                  </Button>
                </div>
              </div>
            )}
            {isLoading && (
              <p className="text-xl text-center">Getting diagnosis...</p>
            )}
            {diagnosis && (
              <div className="space-y-6">
                {diagnosis.length > 0 ? (
                  <>
                    <p className="text-xl">{name}, based on your symptoms, you probably have:</p>
                    <ul className="space-y-2">
                      {diagnosis.map((disease, index) => (
                        <li key={index} className="text-lg">
                          • {disease.replace('_', ' ')}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="text-xl">Sorry, I don't seem to be able to diagnose the disease.</p>
                )}
                <Button 
                  onClick={reset}
                  size="lg"
                  className="w-full text-lg py-6"
                >
                  Start Over
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}