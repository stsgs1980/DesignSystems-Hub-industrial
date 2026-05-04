import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { designEntitiesData, learningStepsData, coursesData, techStacksData } from '@/lib/data'

export async function POST() {
  try {
    // Seed design entities
    for (const entity of designEntitiesData) {
      await db.designEntity.upsert({
        where: { id: entity.id },
        update: entity,
        create: entity,
      })
    }
    
    // Seed learning steps
    for (const step of learningStepsData) {
      await db.learningStep.upsert({
        where: { id: step.id },
        update: step,
        create: step,
      })
    }
    
    // Seed courses
    for (const course of coursesData) {
      await db.course.upsert({
        where: { id: course.id },
        update: course,
        create: course,
      })
    }
    
    // Seed tech stacks
    for (const stack of techStacksData) {
      await db.techStack.upsert({
        where: { id: stack.id },
        update: stack,
        create: stack,
      })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully',
      entities: designEntitiesData.length,
      learningSteps: learningStepsData.length,
      courses: coursesData.length,
      techStacks: techStacksData.length
    })
  } catch (error) {
    console.error('Error seeding database:', error)
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Use POST method to seed the database' 
  })
}
