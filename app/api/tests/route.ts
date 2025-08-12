/**
 * API route for fetching available tests
 * GET /api/tests?category=&difficulty=&limit=
 */
import { NextRequest, NextResponse } from 'next/server';
import seedQuestions from '@/data/adaptive-seed.json';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const difficulty = searchParams.get('difficulty');
  const limit = parseInt(searchParams.get('limit') || '10');

  try {
    let questions = [...seedQuestions];

    // Filter by category
    if (category && category !== 'all') {
      questions = questions.filter(q => q.category === category);
    }

    // Filter by difficulty
    if (difficulty && difficulty !== 'all') {
      const difficultyNum = parseInt(difficulty);
      questions = questions.filter(q => Math.abs(q.difficulty - difficultyNum) <= 1);
    }

    // Limit results
    questions = questions.slice(0, limit);

    return NextResponse.json({
      success: true,
      data: questions,
      total: questions.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tests' },
      { status: 500 }
    );
  }
}

/*
Example Request:
GET /api/tests?category=quran&difficulty=5&limit=10

Example Response:
{
  "success": true,
  "data": [
    {
      "id": "q1",
      "category": "quran",
      "difficulty": 5,
      "type": "mcq",
      "text": { "ar": "...", "en": "..." },
      "choices": [...],
      "correctChoiceId": "a",
      "explanation": { "ar": "...", "en": "..." },
      "tags": ["..."]
    }
  ],
  "total": 1
}
*/