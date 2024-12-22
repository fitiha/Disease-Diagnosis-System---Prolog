import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { patient, symptoms } = req.body

    try {
      const response = await fetch('http://localhost:8080/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patient, symptoms }),
      })

      if (!response.ok) {
        throw new Error('Failed to get diagnosis from Prolog server')
      }

      const data = await response.json()
      res.status(200).json(data)
    } catch (error) {
      console.error('Error getting diagnosis:', error)
      res.status(500).json({ error: 'Failed to get diagnosis from Prolog server' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}