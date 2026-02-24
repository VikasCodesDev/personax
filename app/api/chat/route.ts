import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { chatWithPersona } from '@/lib/groq';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    const { personaId, message, conversationHistory = [] } = await request.json();

    if (!personaId || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    
    // Get persona data
    const persona = await db.collection('personas').findOne({
      _id: new ObjectId(personaId),
    });

    if (!persona) {
      return NextResponse.json(
        { error: 'Persona not found' },
        { status: 404 }
      );
    }

    // Get AI response
    const response = await chatWithPersona(persona, message, conversationHistory);

    // Save or update chat
    const chatData = {
      personaId,
      personaName: persona.name,
      messages: [
        ...conversationHistory,
        { role: 'user', content: message, timestamp: new Date() },
        { role: 'assistant', content: response, timestamp: new Date() },
      ],
      updatedAt: new Date(),
    };

    const existingChat = await db.collection('chats').findOne({ personaId });

    if (existingChat) {
      await db.collection('chats').updateOne(
        { personaId },
        { $set: chatData }
      );
    } else {
      await db.collection('chats').insertOne({
        ...chatData,
        createdAt: new Date(),
      });
    }

    return NextResponse.json({
      success: true,
      response,
    });
  } catch (error: any) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process chat' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const personaId = searchParams.get('personaId');

    const db = await getDatabase();

    if (personaId) {
      const chat = await db.collection('chats').findOne({ personaId });
      return NextResponse.json({ chat });
    }

    const chats = await db
      .collection('chats')
      .find({})
      .sort({ updatedAt: -1 })
      .toArray();

    return NextResponse.json({ chats });
  } catch (error: any) {
    console.error('Fetch chat error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch chat' },
      { status: 500 }
    );
  }
}
