import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { analyzePersonality } from '@/lib/groq';

export async function POST(request: NextRequest) {
  try {
    const { name, description, sampleText } = await request.json();

    if (!name || !description || !sampleText) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get AI analysis
    const analysis = await analyzePersonality(name, description, sampleText);

    // Save to database
    const db = await getDatabase();
    const result = await db.collection('analyses').insertOne({
      name,
      description,
      sampleText,
      ...analysis,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      analysis: {
        name,
        description,
        sampleText,
        ...analysis,
      },
    });
  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyze personality' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const db = await getDatabase();

    if (id) {
      const { ObjectId } = require('mongodb');
      const analysis = await db.collection('analyses').findOne({
        _id: new ObjectId(id),
      });
      return NextResponse.json({ analysis });
    }

    const analyses = await db
      .collection('analyses')
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({ analyses });
  } catch (error: any) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch analyses' },
      { status: 500 }
    );
  }
}
