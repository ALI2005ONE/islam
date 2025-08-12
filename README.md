# Islamic Learning Platform - Adaptive Tests

A comprehensive Next.js application for Islamic education with adaptive testing capabilities.

## Features

### Adaptive Testing System
- **Smart Difficulty Adjustment**: Tests adapt to user performance in real-time
- **Multi-Category Support**: Quran, Hadith, Ahkam (Islamic Rulings), and Other
- **Question Types**: Multiple choice, True/False, Short text, Audio playback
- **Bilingual Support**: Arabic (RTL) and English (LTR) interfaces
- **Progress Tracking**: Detailed analytics and performance insights

### Technical Implementation
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **shadcn/ui** components
- **Jest** for testing
- **localStorage** for session persistence

## Adaptive Algorithm

The system uses a sophisticated algorithm to adjust question difficulty:

1. **Performance Window**: Analyzes last 5 answers
2. **Difficulty Adjustment**:
   - ≥80% correct → increase difficulty (+1, max 10)
   - ≤40% correct → decrease difficulty (-1, min 1)
   - 41-79% correct → maintain current level
3. **Question Selection**: Weighted random from difficulty ±1 range, preferring unseen questions

## API Endpoints

### GET /api/tests
Fetch available tests with filtering
```json
{
  "category": "quran|hadith|ahkam|other",
  "difficulty": "1-10",
  "limit": "number"
}
```

### POST /api/tests/session
Create new test session
```json
{
  "category": "string",
  "userId": "string"
}
```

### POST /api/tests/session/[id]/answer
Submit answer to session
```json
{
  "questionId": "string",
  "userAnswer": "string",
  "isCorrect": "boolean",
  "difficulty": "number",
  "timeSpent": "number"
}
```

### GET /api/tests/session/[id]/result
Get session results and analytics

## Data Model

### Question Structure
```typescript
interface Question {
  id: string;
  category: 'quran' | 'hadith' | 'ahkam' | 'other';
  difficulty: number; // 1-10
  type: 'mcq' | 'true_false' | 'short_text' | 'audio';
  text: { ar: string; en: string; translit?: string };
  choices?: Array<{ id: string; text: { ar: string; en: string } }>;
  correctChoiceId?: string;
  correctTextAnswer?: string;
  explanation: { ar: string; en: string };
  references?: string[];
  audioUrl?: string;
  tags: string[];
}
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Run tests**:
   ```bash
   npm test
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Testing

The system includes comprehensive tests:
- **Unit tests** for adaptive algorithm
- **Component tests** for UI interactions
- **Integration tests** for user workflows
- **Keyboard navigation** testing
- **Accessibility** compliance

## Accessibility Features

- **ARIA labels** and roles
- **Keyboard navigation** (Enter, Arrows, Esc)
- **Focus management**
- **Screen reader** support
- **High contrast** compatibility
- **RTL layout** support

## Performance Optimizations

- **Code splitting** by route
- **Lazy loading** of components
- **Optimized images** and assets
- **Efficient state management**
- **Minimal bundle size**

## Internationalization

- **RTL/LTR** layout switching
- **Arabic/English** content
- **Font optimization** for Arabic text
- **Cultural considerations** in UX design

## Contributing

1. Follow TypeScript strict mode
2. Write tests for new features
3. Ensure accessibility compliance
4. Maintain RTL compatibility
5. Add JSDoc comments for functions

## License

This project is for educational purposes in Islamic studies.