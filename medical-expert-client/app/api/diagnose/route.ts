import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { patient } = await req.json()

  try {
    const response = await fetch(`http://localhost:8080/diagnose?patient=${encodeURIComponent(patient)}`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error('Failed to get diagnosis from Prolog server')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error getting diagnosis:', error)
    return NextResponse.json({ error: 'Failed to get diagnosis' }, { status: 500 })
  }
}

