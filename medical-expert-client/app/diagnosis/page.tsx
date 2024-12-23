'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

type Symptom = 'fever' | 'rash' | 'headache' | 'runny_nose' | 'conjunctivitis' | 'cough' | 'body_ache' | 'chills' | 'sore_throat' | 'sneezing' | 'swollen_glands' | 'fatigue' | 'nausea' | 'vomiting' | 'diarrhea'

const symptoms: Symptom[] = ['fever', 'rash', 'headache', 'runny_nose', 'conjunctivitis', 'cough', 'body_ache', 'chills', 'sore_throat', 'sneezing', 'swollen_glands', 'fatigue', 'nausea', 'vomiting', 'diarrhea']

const sendMessage = async ({ patient, symptoms }: { patient: string, symptoms: Record<string, boolean> }) => {
  try {
    const response = await fetch('http://localhost:8080/diagnose', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ patient, symptoms }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to get diagnosis from Prolog server: ${error}`);
  }
};


export default function DiagnosisPage() {
  const [name, setName] = useState('')
  const [currentSymptomIndex, setCurrentSymptomIndex] = useState<number>(-1)
  const [patientSymptoms, setPatientSymptoms] = useState<Record<Symptom, boolean>>({} as Record<Symptom, boolean>)
  const [diagnosis, setDiagnosis] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

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
      console.log({ patient: name, symptoms: patientSymptoms });
      getDiagnosis()
    }
  }

  const getDiagnosis = () => {
    setIsLoading(true)
    sendMessage({ patient: name, symptoms: patientSymptoms })
      .then((data) => {
        setDiagnosis(data.diagnosis)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error getting diagnosis:', error.message)
        setIsLoading(false)
      })
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
                <p className="text-xl">{name}, based on your symptoms, you probably have:</p>
                <ul className="space-y-2">
                  <li className="text-lg">
                    • {diagnosis.toUpperCase()}
                  </li>
                </ul>
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