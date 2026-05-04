import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const entities = await db.designEntity.findMany({
      orderBy: {
        popularity: 'desc'
      }
    })
    
    return NextResponse.json(entities)
  } catch (error) {
    console.error('Error fetching entities:', error)
    return NextResponse.json({ error: 'Failed to fetch entities' }, { status: 500 })
  }
}
