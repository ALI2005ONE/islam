/**
 * API route for submitting answers to test sessions
 * POST /api/tests/session/[id]/answer
 */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sessionId = params.id;
    const body = await request.json();
    const { questionId, userAnswer, isCorrect, difficulty, timeSpent } = body;

    // In a real implementation, you would:
    // 1. Validate the session exists
    // 2. Store the answer in database
    // 3. Update session statistics
    // 4. Calculate next difficulty level

    const answer = {
      questionId,
      userAnswer,
      isCorrect,
      timestamp: Date.now(),
      difficulty,
      timeSpent: timeSpent || null,
    };

    // Mock response - in real implementation, fetch from database
    const updatedSession = {
      id: sessionId,
      answers: [answer], // In reality, append to existing answers
      currentDifficulty: isCorrect ? Math.min(10, difficulty + 1) : Math.max(1, difficulty - 1),
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: {
        answer,
        session: updatedSession,
        nextDifficulty: updatedSession.currentDifficulty,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to submit answer' },
      { status: 500 }
    );
  }
}

/*
Example Request:
POST /api/tests/session/session_123/answer
{
  "questionId": "q1",
  "userAnswer": "a",
  "isCorrect": true,
  "difficulty": 5,
  "timeSpent": 30
}

Example Response:
{
  "success": true,
  "data": {
    "answer": {
      "questionId": "q1",
      "userAnswer": "a",
      "isCorrect": true,
      "timestamp": 1703123456789,
      "difficulty": 5,
      "timeSpent": 30
    },
    "session": {
      "id": "session_123",
      "answers": [...],
      "currentDifficulty": 6,
      "lastUpdated": "2023-12-21T10:30:56.789Z"
    },
    "nextDifficulty": 6
  }
}
*/