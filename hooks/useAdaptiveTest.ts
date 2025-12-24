@@ .. @@
 import { useState, useEffect, useCallback } from 'react';
 import { Question, Answer, TestSession, SessionStats } from '@/types/question';
 import { selectNextQuestion, calculateSessionStats, shouldEndTest } from '@/lib/adaptive';
-import seedQuestions from '@/data/adaptive-seed.json';
 
 interface UseAdaptiveTestReturn {
   currentQuestion: Question | null;
   currentAnswer: Answer | null;
   sessionStats: SessionStats;
   isLoading: boolean;
   error: string | null;
   submitAnswer: (userAnswer: string) => void;
   skipQuestion: () => void;
   flagQuestion: () => void;
   nextQuestion: () => void;
   previousQuestion: () => void;
   canGoNext: boolean;
   canGoPrevious: boolean;
   endTest: () => void;
 }
 
 const STORAGE_KEY = 'adaptive_test_session';
 
+// Mock questions data
+const seedQuestions: Question[] = [
+  {
+    id: "q1",
+    category: "quran",
+    difficulty: 3,
+    type: "mcq",
+    text: {
+      ar: "كم عدد سور القرآن الكريم؟",
+      en: "How many chapters (surahs) are in the Quran?"
+    },
+    choices: [
+      {
+        id: "a",
+        text: {
+          ar: "114 سورة",
+          en: "114 chapters"
+        }
+      },
+      {
+        id: "b",
+        text: {
+          ar: "110 سورة",
+          en: "110 chapters"
+        }
+      },
+      {
+        id: "c",
+        text: {
+          ar: "120 سورة",
+          en: "120 chapters"
+        }
+      },
+      {
+        id: "d",
+        text: {
+          ar: "100 سورة",
+          en: "100 chapters"
+        }
+      }
+    ],
+    correctChoiceId: "a",
+    explanation: {
+      ar: "القرآن الكريم يحتوي على 114 سورة، من الفاتحة إلى الناس",
+      en: "The Holy Quran contains 114 chapters, from Al-Fatiha to An-Nas"
+    },
+    references: ["المصحف الشريف"],
+    tags: ["قرآن", "أساسيات"]
+  },
+  {
+    id: "q2",
+    category: "quran",
+    difficulty: 4,
+    type: "true_false",
+    text: {
+      ar: "سورة الفاتحة تُسمى أيضاً أم الكتاب",
+      en: "Surah Al-Fatiha is also called Umm Al-Kitab (Mother of the Book)"
+    },
+    correctChoiceId: "true",
+    explanation: {
+      ar: "نعم، سورة الفاتحة لها عدة أسماء منها أم الكتاب وأم القرآن والسبع المثاني",
+      en: "Yes, Surah Al-Fatiha has several names including Umm Al-Kitab, Umm Al-Quran, and As-Sab' Al-Mathani"
+    },
+    references: ["تفسير ابن كثير"],
+    tags: ["فاتحة", "أسماء"]
+  },
+  {
+    id: "q3",
+    category: "hadith",
+    difficulty: 3,
+    type: "mcq",
+    text: {
+      ar: "من قال: 'إنما الأعمال بالنيات'؟",
+      en: "Who said: 'Actions are but by intention'?"
+    },
+    choices: [
+      {
+        id: "a",
+        text: {
+          ar: "عمر بن الخطاب رضي الله عنه",
+          en: "Umar ibn Al-Khattab (RA)"
+        }
+      },
+      {
+        id: "b",
+        text: {
+          ar: "أبو بكر الصديق رضي الله عنه",
+          en: "Abu Bakr As-Siddiq (RA)"
+        }
+      },
+      {
+        id: "c",
+        text: {
+          ar: "النبي محمد صلى الله عليه وسلم",
+          en: "Prophet Muhammad (PBUH)"
+        }
+      },
+      {
+        id: "d",
+        text: {
+          ar: "علي بن أبي طالب رضي الله عنه",
+          en: "Ali ibn Abi Talib (RA)"
+        }
+      }
+    ],
+    correctChoiceId: "c",
+    explanation: {
+      ar: "هذا حديث شريف رواه عمر بن الخطاب عن النبي صلى الله عليه وسلم",
+      en: "This is a noble hadith narrated by Umar ibn Al-Khattab from Prophet Muhammad (PBUH)"
+    },
+    references: ["صحيح البخاري", "صحيح مسلم"],
+    tags: ["نية", "أعمال"]
+  },
+  {
+    id: "q4",
+    category: "hadith",
+    difficulty: 5,
+    type: "short_text",
+    text: {
+      ar: "أكمل الحديث: 'المسلم من سلم المسلمون من...'",
+      en: "Complete the hadith: 'A Muslim is one from whose tongue and hand Muslims are...'"
+    },
+    correctTextAnswer: "لسانه ويده",
+    explanation: {
+      ar: "الحديث الكامل: 'المسلم من سلم المسلمون من لسانه ويده'",
+      en: "The complete hadith: 'A Muslim is one from whose tongue and hand Muslims are safe'"
+    },
+    references: ["صحيح البخاري"],
+    tags: ["أخلاق", "معاملة"]
+  },
+  {
+    id: "q5",
+    category: "ahkam",
+    difficulty: 4,
+    type: "mcq",
+    text: {
+      ar: "كم عدد الصلوات المفروضة في اليوم؟",
+      en: "How many obligatory prayers are there in a day?"
+    },
+    choices: [
+      {
+        id: "a",
+        text: {
+          ar: "ثلاث صلوات",
+          en: "Three prayers"
+        }
+      },
+      {
+        id: "b",
+        text: {
+          ar: "أربع صلوات",
+          en: "Four prayers"
+        }
+      },
+      {
+        id: "c",
+        text: {
+          ar: "خمس صلوات",
+          en: "Five prayers"
+        }
+      },
+      {
+        id: "d",
+        text: {
+          ar: "ست صلوات",
+          en: "Six prayers"
+        }
+      }
+    ],
+    correctChoiceId: "c",
+    explanation: {
+      ar: "الصلوات المفروضة خمس: الفجر والظهر والعصر والمغرب والعشاء",
+      en: "The obligatory prayers are five: Fajr, Dhuhr, Asr, Maghrib, and Isha"
+    },
+    references: ["القرآن الكريم", "السنة النبوية"],
+    tags: ["صلاة", "فرائض"]
+  },
+  {
+    id: "q6",
+    category: "ahkam",
+    difficulty: 6,
+    type: "true_false",
+    text: {
+      ar: "يجوز للمسافر أن يقصر الصلاة الرباعية إلى ركعتين",
+      en: "A traveler may shorten four-unit prayers to two units"
+    },
+    correctChoiceId: "true",
+    explanation: {
+      ar: "نعم، يجوز للمسافر قصر الصلاة الرباعية (الظهر والعصر والعشاء) إلى ركعتين",
+      en: "Yes, a traveler may shorten four-unit prayers (Dhuhr, Asr, and Isha) to two units"
+    },
+    references: ["القرآن الكريم", "فقه السفر"],
+    tags: ["سفر", "قصر", "صلاة"]
+  }
+];
+
 export function useAdaptiveTest(category: string = 'all'): UseAdaptiveTestReturn {
   const [session, setSession] = useState<TestSession | null>(null);
   const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
   const [currentAnswer, setCurrentAnswer] = useState<Answer | null>(null);
   const [questionHistory, setQuestionHistory] = useState<Question[]>([]);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
 
   // Initialize session
   useEffect(() => {
     const initializeSession = () => {
       try {
         // Try to load existing session
         const savedSession = localStorage.getItem(STORAGE_KEY);
         let newSession: TestSession;
 
         if (savedSession) {
           newSession = JSON.parse(savedSession);
           // Validate session is for same category
           if (newSession.category !== category) {
             newSession = createNewSession(category);
           }
         } else {
           newSession = createNewSession(category);
         }
 
         setSession(newSession);
         loadFirstQuestion(newSession);
       } catch (err) {
         setError('Failed to initialize test session');
         console.error('Session initialization error:', err);
       } finally {
         setIsLoading(false);
       }
     };
 
     initializeSession();
   }, [category]);
 
   // Save session to localStorage whenever it changes
   useEffect(() => {
     if (session) {
       localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
     }
   }, [session]);
 
   const createNewSession = (category: string): TestSession => {
     return {
       id: `session_${Date.now()}`,
       category,
       startTime: Date.now(),
       answers: [],
       currentDifficulty: 5,
       isCompleted: false,
     };
   };
 
   const loadFirstQuestion = (session: TestSession) => {
-    const questions = seedQuestions as Question[];
+    const questions = seedQuestions;
     const firstQuestion = selectNextQuestion({
       previousAnswers: session.answers,
       pool: questions,
       difficulty: session.currentDifficulty,
       category: session.category,
     });
 
     if (firstQuestion) {
       setCurrentQuestion(firstQuestion);
       setQuestionHistory([firstQuestion]);
       setCurrentIndex(0);
     } else {
       setError('No questions available for this category');
     }
   };
 
   const submitAnswer = useCallback((userAnswer: string) => {
     if (!currentQuestion || !session) return;
 
     const isCorrect = checkAnswer(currentQuestion, userAnswer);
     const answer: Answer = {
       questionId: currentQuestion.id,
       userAnswer,
       isCorrect,
       timestamp: Date.now(),
       difficulty: currentQuestion.difficulty,
     };
 
     setCurrentAnswer(answer);
 
     // Update session with new answer
     const updatedSession = {
       ...session,
       answers: [...session.answers, answer],
     };
 
     setSession(updatedSession);
   }, [currentQuestion, session]);
 
   const checkAnswer = (question: Question, userAnswer: string): boolean => {
     switch (question.type) {
       case 'mcq':
       case 'true_false':
         return userAnswer === question.correctChoiceId;
       case 'short_text':
         return userAnswer.toLowerCase().trim() === question.correctTextAnswer?.toLowerCase().trim();
       default:
         return false;
     }
   };
 
   const nextQuestion = useCallback(() => {
     if (!session) return;
 
     // Check if we can move to next question in history
     if (currentIndex < questionHistory.length - 1) {
       setCurrentIndex(currentIndex + 1);
       setCurrentQuestion(questionHistory[currentIndex + 1]);
       setCurrentAnswer(null);
       return;
     }
 
     // Check if test should end
     if (shouldEndTest(session.answers)) {
       endTest();
       return;
     }
 
     // Load next question
-    const questions = seedQuestions as Question[];
+    const questions = seedQuestions;
     const nextQ = selectNextQuestion({
       previousAnswers: session.answers,
       pool: questions,
       difficulty: session.currentDifficulty,
       category: session.category,
     });
 
     if (nextQ) {
       setCurrentQuestion(nextQ);
       setQuestionHistory([...questionHistory, nextQ]);
       setCurrentIndex(questionHistory.length);
       setCurrentAnswer(null);
     } else {
       endTest();
     }
   }, [session, currentIndex, questionHistory]);
 
   const previousQuestion = useCallback(() => {
     if (currentIndex > 0) {
       setCurrentIndex(currentIndex - 1);
       setCurrentQuestion(questionHistory[currentIndex - 1]);
       
       // Find the answer for this question
       const questionId = questionHistory[currentIndex - 1].id;
       const answer = session?.answers.find(a => a.questionId === questionId) || null;
       setCurrentAnswer(answer);
     }
   }, [currentIndex, questionHistory, session]);
 
   const skipQuestion = useCallback(() => {
     nextQuestion();
   }, [nextQuestion]);
 
   const flagQuestion = useCallback(() => {
     // In a real implementation, this would mark the question for review
     console.log('Question flagged:', currentQuestion?.id);
   }, [currentQuestion]);
 
   const endTest = useCallback(() => {
     if (!session) return;
 
     const finalSession = {
       ...session,
       endTime: Date.now(),
       isCompleted: true,
     };
 
     setSession(finalSession);
     setCurrentQuestion(null);
     localStorage.removeItem(STORAGE_KEY);
   }, [session]);
 
   const sessionStats: SessionStats = session 
     ? calculateSessionStats(session.answers)
     : {
         questionsAnswered: 0,
         correctAnswers: 0,
         accuracy: 0,
         currentDifficulty: 5,
       };
 
   return {
     currentQuestion,
     currentAnswer,
     sessionStats,
     isLoading,
     error,
     submitAnswer,
     skipQuestion,
     flagQuestion,
     nextQuestion,
     previousQuestion,
     canGoNext: currentIndex < questionHistory.length - 1 || !!currentAnswer,
     canGoPrevious: currentIndex > 0,
     endTest,
   };
 }