// Types
interface ScoreBreakdown {
  content: number;
  structure: number;
  relevance: number;
}

interface Answer {
  answer?: string;
  question?: string;
  score?: number;
  feedback?: string[];
  category?: string;
  breakdown?: ScoreBreakdown;
  timeSpent?: number;
}

interface CategoryScore {
  average: number;
  count: number;
  total: number;
}

interface PerformanceLevel {
  level: string;
  color: string;
  message: string;
}

interface OverallResults {
  totalScore: number;
  grade: string;
  summary: string;
  questionsAnswered: number;
  totalQuestions: number;
  completionRate: number;
  categoryScores: Record<string, CategoryScore>;
  recommendations: string[];
  strengths: string[];
  weaknesses: string[];
  averageTimePerQuestion: number;
}

/**
 * Calculate the overall interview score and generate comprehensive results
 */
export const calculateOverallScore = (answers: Answer[]): OverallResults => {
  const totalQuestions = answers.length;
  const answeredQuestions = answers.filter(
    (a) => a.answer && a.answer.trim().length > 0
  );
  const questionsAnswered = answeredQuestions.length;

  // Calculate total score (average of answered questions)
  const totalScoreSum = answeredQuestions.reduce(
    (sum, ans) => sum + (ans.score || 0),
    0
  );
  const totalScore =
    questionsAnswered > 0 ? Math.round(totalScoreSum / questionsAnswered) : 0;

  // Calculate completion rate
  const completionRate = Math.round((questionsAnswered / totalQuestions) * 100);

  // Calculate category scores
  const categoryScores = calculateCategoryScores(answers);

  // Get grade
  const grade = getGrade(totalScore);

  // Generate summary
  const summary = generateSummary(totalScore, completionRate, questionsAnswered);

  // Generate recommendations
  const recommendations = generateRecommendations(
    answers,
    categoryScores,
    totalScore
  );

  // Identify strengths and weaknesses
  const { strengths, weaknesses } = identifyStrengthsAndWeaknesses(
    categoryScores,
    answers
  );

  // Calculate average time per question
  const totalTime = answers.reduce((sum, ans) => sum + (ans.timeSpent || 0), 0);
  const averageTimePerQuestion =
    questionsAnswered > 0 ? Math.round(totalTime / questionsAnswered) : 0;

  return {
    totalScore,
    grade,
    summary,
    questionsAnswered,
    totalQuestions,
    completionRate,
    categoryScores,
    recommendations,
    strengths,
    weaknesses,
    averageTimePerQuestion,
  };
};

/**
 * Calculate scores for each category
 */
const calculateCategoryScores = (
  answers: Answer[]
): Record<string, CategoryScore> => {
  const categoryScores: Record<string, CategoryScore> = {};

  answers.forEach((ans) => {
    if (!ans.answer || !ans.answer.trim()) return;

    const category = ans.category || 'General';

    if (!categoryScores[category]) {
      categoryScores[category] = { average: 0, count: 0, total: 0 };
    }

    categoryScores[category].total += ans.score || 0;
    categoryScores[category].count += 1;
  });

  // Calculate averages
  Object.keys(categoryScores).forEach((category) => {
    const data = categoryScores[category];
    data.average =
      data.count > 0 ? Math.round(data.total / data.count) : 0;
  });

  return categoryScores;
};

/**
 * Get letter grade based on score
 */
export const getGrade = (score: number): string => {
  if (score >= 95) return 'A+';
  if (score >= 90) return 'A';
  if (score >= 85) return 'A-';
  if (score >= 80) return 'B+';
  if (score >= 75) return 'B';
  if (score >= 70) return 'B-';
  if (score >= 65) return 'C+';
  if (score >= 60) return 'C';
  if (score >= 55) return 'C-';
  if (score >= 50) return 'D+';
  if (score >= 45) return 'D';
  if (score >= 40) return 'D-';
  return 'F';
};

/**
 * Get performance level based on score
 */
export const getPerformanceLevel = (score: number): PerformanceLevel => {
  if (score >= 90) {
    return {
      level: 'Outstanding',
      color: '#059669', // Emerald
      message: 'Exceptional performance! You are interview-ready!',
    };
  }
  if (score >= 80) {
    return {
      level: 'Excellent',
      color: '#10b981', // Green
      message: 'Great job! You demonstrated strong interview skills.',
    };
  }
  if (score >= 70) {
    return {
      level: 'Good',
      color: '#3b82f6', // Blue
      message: 'Solid performance with room for improvement.',
    };
  }
  if (score >= 60) {
    return {
      level: 'Fair',
      color: '#f59e0b', // Amber
      message: 'Decent effort. Focus on adding more detail to your answers.',
    };
  }
  if (score >= 50) {
    return {
      level: 'Average',
      color: '#f97316', // Orange
      message: 'You have potential. Practice more to improve your responses.',
    };
  }
  if (score >= 40) {
    return {
      level: 'Below Average',
      color: '#ef4444', // Red
      message: 'Keep practicing! Work on answer structure and examples.',
    };
  }
  return {
    level: 'Needs Improvement',
    color: '#dc2626', // Dark Red
    message: "Don't give up! Consistent practice will help you improve.",
  };
};

/**
 * Generate summary based on performance
 */
const generateSummary = (
  score: number,
  completionRate: number,
  questionsAnswered: number
): string => {
  let summary = '';

  // Score-based summary
  if (score >= 80) {
    summary =
      'Excellent performance! You demonstrated strong interview skills with well-structured and detailed responses. ';
  } else if (score >= 60) {
    summary =
      'Good effort! You showed solid understanding of the questions with room for adding more specific examples. ';
  } else if (score >= 40) {
    summary =
      'Fair performance. Focus on providing more detailed answers with concrete examples from your experience. ';
  } else {
    summary =
      'Keep practicing! Work on structuring your answers better and include specific achievements. ';
  }

  // Completion-based addition
  if (completionRate === 100) {
    summary += 'You answered all questions, showing great commitment.';
  } else if (completionRate >= 80) {
    summary += `You answered ${questionsAnswered} questions. Try to complete all questions in your next attempt.`;
  } else if (completionRate >= 50) {
    summary += `You answered ${questionsAnswered} questions. Aim to answer more questions for better results.`;
  } else {
    summary += `You only answered ${questionsAnswered} questions. Make sure to attempt all questions.`;
  }

  return summary;
};

/**
 * Generate personalized recommendations
 */
const generateRecommendations = (
  answers: Answer[],
  categoryScores: Record<string, CategoryScore>,
  overallScore: number
): string[] => {
  const recommendations: string[] = [];

  // Find weakest category
  let weakestCategory = '';
  let lowestScore = 100;

  Object.entries(categoryScores).forEach(([category, data]) => {
    if (data.average < lowestScore && data.count > 0) {
      lowestScore = data.average;
      weakestCategory = category;
    }
  });

  // Recommendation based on weakest category
  if (weakestCategory && lowestScore < 70) {
    const categoryRecommendations: Record<string, string> = {
      Behavioral:
        'Practice behavioral questions using the STAR method (Situation, Task, Action, Result) to structure your answers better.',
      Technical:
        'Review core technical concepts and practice explaining complex ideas in simple terms.',
      Experience:
        'Prepare specific examples from your work history that highlight your achievements and impact.',
      'Problem Solving':
        'Work on breaking down problems step-by-step and explaining your thought process clearly.',
      Career:
        'Reflect on your career goals and how they align with the position you are applying for.',
      Introduction:
        'Craft a compelling elevator pitch that summarizes your background and value proposition.',
      General:
        'Focus on providing more structured and detailed responses to questions.',
    };

    recommendations.push(
      categoryRecommendations[weakestCategory] ||
        `Focus on improving your ${weakestCategory} answers with more specific examples and details.`
    );
  }

  // Check for short answers
  const shortAnswers = answers.filter((a) => {
    if (!a.answer) return false;
    const wordCount = a.answer.split(/\s+/).filter(Boolean).length;
    return wordCount < 50;
  });

  if (shortAnswers.length > answers.length * 0.3) {
    recommendations.push(
      'Expand your answers with more details. Aim for 50-100 words per response to fully address each question.'
    );
  }

  // Check for structure issues
  const hasStructureIssues = answers.some(
    (a) => a.breakdown && a.breakdown.structure < 20
  );

  if (hasStructureIssues) {
    recommendations.push(
      'Use transition words (First, Additionally, Finally) and structure your answers with clear beginning, middle, and end.'
    );
  }

  // Check for missing examples
  const answersWithExamples = answers.filter((a) => {
    if (!a.answer) return false;
    return /for example|such as|like when|instance|specifically|achieved|accomplished/i.test(
      a.answer
    );
  });

  if (answersWithExamples.length < answers.length * 0.5) {
    recommendations.push(
      'Include specific examples and achievements in your answers. Use phrases like "For example..." or "In one instance..."'
    );
  }

  // Check for quantifiable achievements
  const answersWithNumbers = answers.filter((a) => {
    if (!a.answer) return false;
    return /\d+%|\d+ (years?|months?|people|team|users?|customers?|projects?)|increased|decreased|improved by/i.test(
      a.answer
    );
  });

  if (answersWithNumbers.length < answers.length * 0.3) {
    recommendations.push(
      'Quantify your achievements when possible. Use metrics like percentages, team sizes, or timeframes to make your impact measurable.'
    );
  }

  // Check for action verbs
  const answersWithActionVerbs = answers.filter((a) => {
    if (!a.answer) return false;
    return /I (led|managed|created|developed|implemented|designed|built|improved|achieved|delivered|launched|initiated|spearheaded)/i.test(
      a.answer
    );
  });

  if (answersWithActionVerbs.length < answers.length * 0.4) {
    recommendations.push(
      'Use strong action verbs to describe your contributions: "I led...", "I developed...", "I achieved..."'
    );
  }

  // General recommendations based on overall score
  if (overallScore < 60) {
    recommendations.push(
      'Practice mock interviews regularly to improve confidence and response quality.'
    );
  }

  if (overallScore < 50) {
    recommendations.push(
      'Research common interview questions for your target role and prepare answers in advance.'
    );
  }

  // Always add a research recommendation if we have fewer than 4
  if (recommendations.length < 4) {
    recommendations.push(
      'Research the company thoroughly before your interview to tailor your responses to their values and culture.'
    );
  }

  // Return top 5 recommendations
  return recommendations.slice(0, 5);
};

/**
 * Identify strengths and weaknesses
 */
const identifyStrengthsAndWeaknesses = (
  categoryScores: Record<string, CategoryScore>,
  answers: Answer[]
): { strengths: string[]; weaknesses: string[] } => {
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  // Category-based strengths and weaknesses
  Object.entries(categoryScores).forEach(([category, data]) => {
    if (data.average >= 75) {
      strengths.push(`Strong ${category.toLowerCase()} responses`);
    } else if (data.average < 50) {
      weaknesses.push(`${category} questions need improvement`);
    }
  });

  // Answer quality analysis
  const answeredQuestions = answers.filter(
    (a) => a.answer && a.answer.trim().length > 0
  );

  // Check for detailed answers
  const detailedAnswers = answeredQuestions.filter((a) => {
    const wordCount = a.answer!.split(/\s+/).filter(Boolean).length;
    return wordCount >= 75;
  });

  if (detailedAnswers.length > answeredQuestions.length * 0.6) {
    strengths.push('Provides detailed and comprehensive answers');
  }

  // Check for good completion
  if (answeredQuestions.length === answers.length) {
    strengths.push('Completed all questions');
  } else if (answeredQuestions.length < answers.length * 0.7) {
    weaknesses.push('Did not complete all questions');
  }

  // Check for examples usage
  const hasExamples = answeredQuestions.filter((a) =>
    /for example|instance|specifically|achieved/i.test(a.answer!)
  );

  if (hasExamples.length > answeredQuestions.length * 0.5) {
    strengths.push('Good use of specific examples');
  } else {
    weaknesses.push('Could include more specific examples');
  }

  return {
    strengths: strengths.slice(0, 4),
    weaknesses: weaknesses.slice(0, 4),
  };
};

/**
 * Calculate time statistics
 */
export const calculateTimeStats = (
  answers: Answer[]
): {
  totalTime: number;
  averageTime: number;
  fastestAnswer: number;
  slowestAnswer: number;
} => {
  const answeredWithTime = answers.filter(
    (a) => a.answer && a.timeSpent && a.timeSpent > 0
  );

  if (answeredWithTime.length === 0) {
    return {
      totalTime: 0,
      averageTime: 0,
      fastestAnswer: 0,
      slowestAnswer: 0,
    };
  }

  const times = answeredWithTime.map((a) => a.timeSpent!);
  const totalTime = times.reduce((sum, t) => sum + t, 0);
  const averageTime = Math.round(totalTime / times.length);
  const fastestAnswer = Math.min(...times);
  const slowestAnswer = Math.max(...times);

  return {
    totalTime,
    averageTime,
    fastestAnswer,
    slowestAnswer,
  };
};

/**
 * Format time in seconds to readable format
 */
export const formatTime = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
};

/**
 * Get color for score
 */
export const getScoreColor = (score: number): string => {
  if (score >= 80) return '#10b981'; // Green
  if (score >= 60) return '#3b82f6'; // Blue
  if (score >= 40) return '#f59e0b'; // Amber
  return '#ef4444'; // Red
};

/**
 * Get emoji for performance level
 */
export const getPerformanceEmoji = (score: number): string => {
  if (score >= 90) return '🏆';
  if (score >= 80) return '🌟';
  if (score >= 70) return '👍';
  if (score >= 60) return '💪';
  if (score >= 50) return '📈';
  if (score >= 40) return '🎯';
  return '💡';
};

export default {
  calculateOverallScore,
  getGrade,
  getPerformanceLevel,
  calculateTimeStats,
  formatTime,
  getScoreColor,
  getPerformanceEmoji,
};