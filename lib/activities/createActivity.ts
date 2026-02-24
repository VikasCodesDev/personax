import { getActivityModel } from '@/models/Activity';

interface CreateActivityParams {
  userId: string;
  type: 'persona_created' | 'analysis_completed' | 'chat_session';
  description: string;
  metadata?: any;
}

export async function createActivity(params: CreateActivityParams) {
  try {
    const Activity = await getActivityModel();
    
    await Activity.create({
      userId: params.userId,
      type: params.type,
      description: params.description,
      metadata: params.metadata,
    });
  } catch (error) {
    console.error('Failed to create activity:', error);
    // Don't throw - activity logging shouldn't break main functionality
  }
}
