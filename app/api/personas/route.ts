import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    const personaData = await request.json();

    const db = await getDatabase();
    const result = await db.collection('personas').insertOne({
      ...personaData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      persona: {
        _id: result.insertedId,
        ...personaData,
      },
    });
  } catch (error: any) {
    console.error('Create persona error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create persona' },
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
      const persona = await db.collection('personas').findOne({
        _id: new ObjectId(id),
      });
      return NextResponse.json({ persona });
    }

    const personas = await db
      .collection('personas')
      .find({})
      .sort({ updatedAt: -1 })
      .toArray();

    return NextResponse.json({ personas });
  } catch (error: any) {
    console.error('Fetch personas error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch personas' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json();

    const db = await getDatabase();
    await db.collection('personas').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Update persona error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update persona' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    await db.collection('personas').deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete persona error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete persona' },
      { status: 500 }
    );
  }
}
