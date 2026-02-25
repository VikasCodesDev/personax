// app/api/dashboard/stats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth/getUserFromRequest';
import { getAnalysisModel } from '@/models/Analysis';
import { getMessageModel } from '@/models/Message';
import { getActivityModel } from '@/models/Activity';
import { connectMongoose } from '@/lib/mongoose';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    const authUser = getUserFromRequest(request);

    if (!authUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectMongoose();

    const Analysis = await getAnalysisModel();
    const Message = await getMessageModel();
    const Activity = await getActivityModel();

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }

    const [analysesCount, personasCount, messagesCount, recentActivities] = await Promise.all([
      Analysis.countDocuments({ userId: authUser.userId }),
      db.collection('personas').countDocuments({ userId: authUser.userId }),
      Message.countDocuments({ userId: authUser.userId }),
      Activity.find({ userId: authUser.userId })
        .sort({ createdAt: -1 })
        .limit(10)
        .lean()
    ]);

    return NextResponse.json({
      stats: {
        analyses: analysesCount,
        personas: personasCount,
        messages: messagesCount,
      },
      recentActivities: recentActivities.map((activity: any) => ({
        id: activity._id.toString(),
        type: activity.type,
        description: activity.description,
        createdAt: activity.createdAt,
        metadata: activity.metadata,
      })),
    });
  } catch (error: any) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch dashboard stats.' },
      { status: 500 }
    );
  }
}