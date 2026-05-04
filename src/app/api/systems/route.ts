import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const systems = await db.designEntity.findMany({
      where: {
        type: { in: ['system', 'library'] }
      },
      orderBy: {
        popularity: 'desc'
      }
    })
    
    return NextResponse.json(systems)
  } catch (error) {
    console.error('Error fetching design systems:', error)
    return NextResponse.json({ error: 'Failed to fetch design systems' }, { status: 500 })
  }
}
