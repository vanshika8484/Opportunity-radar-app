import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Question } from '../../types/interview';

export default function Results() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const companyName = params.companyName as string;
  const companyLogo = params.companyLogo as string;
  const companyColor = params.companyColor as string;
  const roleName = params.roleName as string;
  const roleIcon = params.roleIcon as string;
  
  const questions: Question[] = params.questionsData 
    ? JSON.parse(params.questionsData as string) 
    : [];
    
  const answers: Record<number, string> = params.answersData 
    ? JSON.parse(params.answersData as string) 
    : {};

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;
  const completionRate = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const handleRetry = () => {
    router.replace({
      pathname: '/mock-interview/session',
      params: {
        companyId: params.companyId,
        companyName,
        companyLogo,
        companyColor,
        roleId: params.roleId,
        roleName,
        roleIcon,
      }
    });
  };

  const handleNewInterview = () => {
    router.replace('/mock-interview');
  };

  const handleHome = () => {
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Success Header */}
        <View style={[styles.successCard, { borderTopColor: companyColor }]}>
          <Text style={styles.successIcon}>🎉</Text>
          <Text style={styles.successTitle}>Interview Complete!</Text>
          
          {/* Interview Badge */}
          <View style={styles.interviewBadge}>
            <View style={[styles.companyBadge, { backgroundColor: companyColor + '20' }]}>
              <Text style={styles.badgeLogo}>{companyLogo}</Text>
              <Text style={[styles.badgeCompany, { color: companyColor }]}>{companyName}</Text>
            </View>
            <View style={styles.roleBadge}>
              <Text style={styles.badgeIcon}>{roleIcon}</Text>
              <Text style={styles.badgeRole}>{roleName}</Text>
            </View>
          </View>
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: companyColor }]}>{answeredCount}/{totalQuestions}</Text>
            <Text style={styles.statLabel}>Questions Answered</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: companyColor }]}>{completionRate}%</Text>
            <Text style={styles.statLabel}>Completion Rate</Text>
          </View>
        </View>

        {/* Performance Message */}
        <View style={[styles.performanceCard, 
          completionRate >= 80 ? styles.performanceExcellent :
          completionRate >= 60 ? styles.performanceGood :
          styles.performanceNeedsWork
        ]}>
          <Text style={styles.performanceIcon}>
            {completionRate >= 80 ? '🌟' : completionRate >= 60 ? '👍' : '💪'}
          </Text>
          <Text style={styles.performanceText}>
            {completionRate >= 80 
              ? 'Excellent! You answered most questions. Keep practicing!'
              : completionRate >= 60 
                ? 'Good job! Consider retrying to improve your score.'
                : 'Keep practicing! Try answering more questions next time.'}
          </Text>
        </View>

        {/* Answers Section */}
        <Text style={styles.sectionTitle}>Your Responses</Text>
        
        {questions.map((question, index) => {
          const answer = answers[index];
          const isAnswered = !!answer;

          return (
            <View key={question.id} style={styles.answerCard}>
              <View style={styles.answerHeader}>
                <View style={styles.questionMeta}>
                  <Text style={[styles.questionNumber, { color: companyColor }]}>Q{index + 1}</Text>
                  <View style={[
                    styles.categoryTag,
                    { backgroundColor: companyColor + '15' }
                  ]}>
                    <Text style={[styles.categoryTagText, { color: companyColor }]}>
                      {question.category}
                    </Text>
                  </View>
                </View>
                <View style={[
                  styles.statusBadge, 
                  isAnswered ? styles.statusAnswered : styles.statusSkipped
                ]}>
                  <Text style={[
                    styles.statusText,
                    isAnswered ? styles.statusTextAnswered : styles.statusTextSkipped
                  ]}>
                    {isAnswered ? '✓ Answered' : 'Skipped'}
                  </Text>
                </View>
              </View>

              <Text style={styles.questionText}>{question.text}</Text>

              {isAnswered ? (
                <View style={styles.answerContent}>
                  <Text style={styles.answerLabel}>Your Answer:</Text>
                  <Text style={styles.answerText}>{answer}</Text>
                </View>
              ) : (
                <View style={styles.skippedContent}>
                  <Text style={styles.skippedText}>
                    This question was skipped
                  </Text>
                </View>
              )}
            </View>
          );
        })}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.retryButton, { backgroundColor: companyColor }]} 
            onPress={handleRetry}
          >
            <Text style={styles.retryButtonIcon}>↻</Text>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.newInterviewButton} onPress={handleNewInterview}>
            <Text style={styles.newInterviewIcon}>🎯</Text>
            <Text style={styles.newInterviewText}>New Interview</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeButton} onPress={handleHome}>
            <Text style={styles.homeButtonIcon}>🏠</Text>
            <Text style={styles.homeButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  successCard: {
    backgroundColor: '#fff',
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderTopWidth: 4,
  },
  successIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  interviewBadge: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  companyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  badgeLogo: {
    fontSize: 18,
    marginRight: 6,
  },
  badgeCompany: {
    fontSize: 14,
    fontWeight: '600',
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  badgeIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  badgeRole: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  statsCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    flexDirection: 'row',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 16,
  },
  performanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  performanceExcellent: {
    backgroundColor: '#d1fae5',
  },
  performanceGood: {
    backgroundColor: '#fef3c7',
  },
  performanceNeedsWork: {
    backgroundColor: '#fee2e2',
  },
  performanceIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  performanceText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  answerCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  answerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  questionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: '700',
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryTagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusAnswered: {
    backgroundColor: '#d1fae5',
  },
  statusSkipped: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusTextAnswered: {
    color: '#065f46',
  },
  statusTextSkipped: {
    color: '#991b1b',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 12,
    lineHeight: 24,
  },
  answerContent: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#6366f1',
  },
  answerLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  answerText: {
    fontSize: 14,
    color: '#111827',
    lineHeight: 22,
  },
  skippedContent: {
    backgroundColor: '#fef2f2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  skippedText: {
    fontSize: 14,
    color: '#991b1b',
    fontStyle: 'italic',
  },
  actionButtons: {
    marginTop: 24,
    gap: 12,
  },
  retryButton: {
    padding: 18,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  retryButtonIcon: {
    fontSize: 20,
    color: '#fff',
    marginRight: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  newInterviewButton: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  newInterviewIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  newInterviewText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '600',
  },
  homeButton: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
  },
  homeButtonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  homeButtonText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '600',
  },
});