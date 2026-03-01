// Keywords and phrases for scoring
const scoringCriteria = {
  technical: {
    keywords: [
      "algorithm",
      "complexity",
      "optimize",
      "scalable",
      "architecture",
      "design pattern",
      "data structure",
      "performance",
      "security",
      "testing",
      "debugging",
      "api",
      "database",
      "framework",
      "library",
    ],
    weight: 1.5,
  },
  behavioral: {
    keywords: [
      "situation",
      "task",
      "action",
      "result",
      "team",
      "collaborate",
      "challenge",
      "solution",
      "learned",
      "improved",
      "achieved",
      "led",
      "managed",
      "communicated",
    ],
    weight: 1.3,
  },
  communication: {
    phrases: [
      "for example",
      "in my experience",
      "specifically",
      "as a result",
      "i believe",
      "my approach",
      "the outcome",
      "i learned",
    ],
    weight: 1.2,
  },
};

// Calculate score for a single answer
export const calculateAnswerScore = (answer, questionCategory) => {
  if (!answer || answer.trim().length === 0) {
    return {
      score: 0,
      feedback: "No answer provided",
      breakdown: { content: 0, structure: 0, relevance: 0 },
    };
  }

  const normalizedAnswer = answer.toLowerCase();
  const words = normalizedAnswer.split(/\s+/);
  const wordCount = words.length;

  let scores = {
    content: 0,
    structure: 0,
    relevance: 0,
    depth: 0,
  };

  // 1. Content Score (based on length and substance)
  if (wordCount >= 50) scores.content += 25;
  else if (wordCount >= 30) scores.content += 15;
  else if (wordCount >= 15) scores.content += 8;
  else scores.content += 3;

  // 2. Technical keyword matching
  let technicalMatches = 0;
  scoringCriteria.technical.keywords.forEach((keyword) => {
    if (normalizedAnswer.includes(keyword)) {
      technicalMatches++;
    }
  });
  scores.content += Math.min(technicalMatches * 3, 15);

  // 3. Behavioral/STAR method detection
  let behavioralMatches = 0;
  scoringCriteria.behavioral.keywords.forEach((keyword) => {
    if (normalizedAnswer.includes(keyword)) {
      behavioralMatches++;
    }
  });
  scores.structure += Math.min(behavioralMatches * 2, 20);

  // 4. Communication quality
  let communicationMatches = 0;
  scoringCriteria.communication.phrases.forEach((phrase) => {
    if (normalizedAnswer.includes(phrase)) {
      communicationMatches++;
    }
  });
  scores.structure += Math.min(communicationMatches * 3, 15);

  // 5. Depth and specificity
  const hasNumbers = /\d+/.test(answer);
  const hasSpecificExamples =
    normalizedAnswer.includes("example") ||
    normalizedAnswer.includes("project") ||
    normalizedAnswer.includes("instance");
  const hasMetrics =
    normalizedAnswer.includes("percent") ||
    normalizedAnswer.includes("%") ||
    normalizedAnswer.includes("increased") ||
    normalizedAnswer.includes("reduced");

  if (hasNumbers) scores.depth += 5;
  if (hasSpecificExamples) scores.depth += 10;
  if (hasMetrics) scores.depth += 10;

  // 6. Relevance (basic check)
  scores.relevance = Math.min(wordCount * 0.5, 25);

  // Calculate total score (out of 100)
  const totalScore = Math.min(
    Math.round(
      scores.content + scores.structure + scores.depth + scores.relevance
    ),
    100
  );

  // Generate feedback
  const feedback = generateFeedback(scores, wordCount, totalScore);

  return {
    score: totalScore,
    feedback,
    breakdown: {
      content: Math.min(scores.content, 40),
      structure: Math.min(scores.structure, 35),
      relevance: Math.min(scores.relevance + scores.depth, 25),
    },
  };
};

// Generate constructive feedback
const generateFeedback = (scores, wordCount, totalScore) => {
  const feedbackPoints = [];

  if (wordCount < 30) {
    feedbackPoints.push(
      "Try to elaborate more on your answer with specific examples and details."
    );
  }

  if (scores.content < 20) {
    feedbackPoints.push(
      "Include more technical details and demonstrate your knowledge depth."
    );
  }

  if (scores.structure < 15) {
    feedbackPoints.push(
      "Structure your answer using the STAR method (Situation, Task, Action, Result)."
    );
  }

  if (scores.depth < 15) {
    feedbackPoints.push(
      "Add quantifiable achievements and specific metrics to strengthen your response."
    );
  }

  if (totalScore >= 80) {
    feedbackPoints.unshift("Excellent response! Well-structured and detailed.");
  } else if (totalScore >= 60) {
    feedbackPoints.unshift("Good response with room for improvement.");
  } else if (totalScore >= 40) {
    feedbackPoints.unshift(
      "Decent attempt, but needs more substance and structure."
    );
  } else {
    feedbackPoints.unshift(
      "This response needs significant improvement in detail and clarity."
    );
  }

  return feedbackPoints;
};

// Calculate overall interview score
export const calculateOverallScore = (answers) => {
  if (!answers || answers.length === 0) {
    return {
      totalScore: 0,
      grade: "F",
      summary: "No answers submitted",
      categoryScores: {},
      recommendations: [],
    };
  }

  const categoryScores = {};
  let totalScore = 0;
  let answeredCount = 0;

  answers.forEach((ans) => {
    if (ans.answer && ans.answer.trim().length > 0) {
      answeredCount++;
      totalScore += ans.score || 0;

      const category = ans.category || "General";
      if (!categoryScores[category]) {
        categoryScores[category] = { total: 0, count: 0 };
      }
      categoryScores[category].total += ans.score || 0;
      categoryScores[category].count += 1;
    }
  });

  const averageScore =
    answeredCount > 0 ? Math.round(totalScore / answeredCount) : 0;

  // Calculate category averages
  Object.keys(categoryScores).forEach((cat) => {
    categoryScores[cat].average = Math.round(
      categoryScores[cat].total / categoryScores[cat].count
    );
  });

  // Determine grade
  let grade, summary;
  if (averageScore >= 90) {
    grade = "A+";
    summary =
      "Outstanding performance! You demonstrated excellent knowledge and communication skills.";
  } else if (averageScore >= 80) {
    grade = "A";
    summary =
      "Excellent performance! You're well-prepared for this interview.";
  } else if (averageScore >= 70) {
    grade = "B";
    summary = "Good performance with some areas for improvement.";
  } else if (averageScore >= 60) {
    grade = "C";
    summary = "Average performance. Consider more preparation in key areas.";
  } else if (averageScore >= 50) {
    grade = "D";
    summary = "Below average. Significant improvement needed.";
  } else {
    grade = "F";
    summary = "Needs substantial improvement. Review fundamental concepts.";
  }

  // Generate recommendations
  const recommendations = generateRecommendations(categoryScores, averageScore);

  return {
    totalScore: averageScore,
    grade,
    summary,
    categoryScores,
    recommendations,
    questionsAnswered: answeredCount,
    totalQuestions: answers.length,
    completionRate: Math.round((answeredCount / answers.length) * 100),
  };
};

const generateRecommendations = (categoryScores, averageScore) => {
  const recommendations = [];

  // Find weakest category
  let weakestCategory = null;
  let lowestScore = 100;

  Object.entries(categoryScores).forEach(([cat, data]) => {
    if (data.average < lowestScore) {
      lowestScore = data.average;
      weakestCategory = cat;
    }
  });

  if (weakestCategory && lowestScore < 70) {
    recommendations.push(
      `Focus on improving your ${weakestCategory.toLowerCase()} skills`
    );
  }

  if (averageScore < 60) {
    recommendations.push("Practice the STAR method for behavioral questions");
    recommendations.push("Prepare specific examples from your experience");
  }

  if (averageScore < 70) {
    recommendations.push("Add more quantifiable achievements to your answers");
    recommendations.push("Study common interview patterns for your target role");
  }

  recommendations.push("Practice with a timer to improve response time");
  recommendations.push("Record yourself and review for clarity and confidence");

  return recommendations.slice(0, 5);
};

// Get performance level
export const getPerformanceLevel = (score) => {
  if (score >= 90) return { level: "Expert", color: "#10b981" };
  if (score >= 75) return { level: "Proficient", color: "#3b82f6" };
  if (score >= 60) return { level: "Intermediate", color: "#f59e0b" };
  if (score >= 40) return { level: "Beginner", color: "#f97316" };
  return { level: "Needs Improvement", color: "#ef4444" };
};