import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const stacks = await db.techStack.findMany()
    return NextResponse.json(stacks)
  } catch (error) {
    console.error('Error fetching tech stacks:', error)
    return NextResponse.json({ error: 'Failed to fetch tech stacks' }, { status: 500 })
  }
}
