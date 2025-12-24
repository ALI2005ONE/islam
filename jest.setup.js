import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }) => children,
}))

// Mock hooks
jest.mock('@/hooks/useAdaptiveTest', () => ({
  useAdaptiveTest: jest.fn(() => ({
    currentQuestion: null,
    currentAnswer: null,
    sessionStats: {
      questionsAnswered: 0,
      correctAnswers: 0,
      accuracy: 0,
      currentDifficulty: 5,
    },
    isLoading: false,
    error: null,
    submitAnswer: jest.fn(),
    skipQuestion: jest.fn(),
    flagQuestion: jest.fn(),
    nextQuestion: jest.fn(),
    previousQuestion: jest.fn(),
    canGoNext: false,
    canGoPrevious: false,
    endTest: jest.fn(),
  })),
}))

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})