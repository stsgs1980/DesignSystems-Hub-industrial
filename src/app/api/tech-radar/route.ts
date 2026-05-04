import { NextResponse } from 'next/server'
import { techRadarData } from '@/lib/data'

export async function GET() {
  try {
    return NextResponse.json(techRadarData)
  } catch (error) {
    console.error('Error fetching tech radar:', error)
    return NextResponse.json({ error: 'Failed to fetch tech radar' }, { status: 500 })
  }
}
