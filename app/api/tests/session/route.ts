/**
 * API route for creating new test sessions
 * POST /api/tests/session
 */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, userId } = body;

    // Create new session
    const session = {
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: userId || null,
      category: category || 'all',
      startTime: Date.now(),
      answers: [],
      currentDifficulty: 5,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: session,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create session' },
      { status: 500 }
    );
  }
}

/*
Example Request:
POST /api/tests/session
{
  "category": "quran",
  "userId": "user123"
}

Example Response:
{
  "success": true,
  "data": {
    "id": "session_1703123456789_abc123def",
    "userId": "user123",
    "category": "quran",
    "startTime": 1703123456789,
    "answers": [],
    "currentDifficulty": 5,
    "isCompleted": false,
    "createdAt": "2023-12-21T10:30:56.789Z"
  }
}
*/