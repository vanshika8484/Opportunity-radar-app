import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import { getQuestions } from '../../data/interviewQuestions';
import { Question } from '../../types/interview';

export default function InterviewSession() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const companyId = params.companyId as string;
  const companyName = params.companyName as string;
  const companyLogo = params.companyLogo as string;
  const companyColor = params.companyColor as string;
  const roleId = params.roleId as string;
  const roleName = params.roleName as string;
  const roleIcon = params.roleIcon as string;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  useEffect(() => {
    const loadedQuestions = getQuestions(companyId, roleId);
    setQuestions(loadedQuestions);
  }, [companyId, roleId]);

  useEffect(() => {
    requestPermission();
  }, []);

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  const startRecording = async () => {
    try {
      if (permissionResponse?.status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant microphone permission to record.');
        await requestPermission();
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      Alert.alert('Error', 'Failed to start recording');
      console.error('Recording error:', err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      
      // Simulate transcription (in real app, send to speech-to-text API)
      const simulatedAnswer = `[Recorded answer for question ${currentIndex + 1}]`;
      setAnswers(prev => ({ ...prev, [currentIndex]: simulatedAnswer }));
      setRecording(null);
    } catch (err) {
      Alert.alert('Error', 'Failed to stop recording');
      console.error('Stop recording error:', err);
    }
  };

  const handleNext = () => {
    if (!answers[currentIndex]) {
      Alert.alert(
        'No Answer', 
        'Please record an answer or skip this question.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Skip', onPress: handleSkip }
        ]
      );
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handleSkip = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    router.push({
      pathname: '/mock-interview/results',
      params: {
        companyId,
        companyName,
        companyLogo,
        companyColor,
        roleId,
        roleName,
        roleIcon,
        questionsData: JSON.stringify(questions),
        answersData: JSON.stringify(answers),
      }
    });
  };

  const handleReRecord = () => {
    const newAnswers = { ...answers };
    delete newAnswers[currentIndex];
    setAnswers(newAnswers);
  };

  if (!currentQuestion) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading questions...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Company & Role Badge */}
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

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressText}>
              Question {currentIndex + 1} of {questions.length}
            </Text>
            <Text style={styles.progressPercentage}>{Math.round(progress)}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: companyColor }]} />
          </View>
        </View>

        {/* Difficulty & Category Badge */}
        <View style={styles.tagContainer}>
          <View style={[styles.categoryBadge, { backgroundColor: companyColor + '15' }]}>
            <Text style={[styles.categoryText, { color: companyColor }]}>
              {currentQuestion.category}
            </Text>
          </View>
          <View style={[
            styles.difficultyBadge,
            currentQuestion.difficulty === 'Easy' && styles.difficultyEasy,
            currentQuestion.difficulty === 'Medium' && styles.difficultyMedium,
            currentQuestion.difficulty === 'Hard' && styles.difficultyHard,
          ]}>
            <Text style={[
              styles.difficultyText,
              currentQuestion.difficulty === 'Easy' && styles.difficultyTextEasy,
              currentQuestion.difficulty === 'Medium' && styles.difficultyTextMedium,
              currentQuestion.difficulty === 'Hard' && styles.difficultyTextHard,
            ]}>
              {currentQuestion.difficulty}
            </Text>
          </View>
        </View>

        {/* Question Card */}
        <View style={styles.questionCard}>
          <Text style={styles.questionNumber}>Question {currentIndex + 1}</Text>
          <Text style={styles.questionText}>{currentQuestion.text}</Text>
        </View>

        {/* Recording Section */}
        <View style={styles.recordingSection}>
          <TouchableOpacity
            style={[
              styles.recordButton, 
              isRecording && styles.recordButtonActive,
              { borderColor: isRecording ? '#ef4444' : companyColor }
            ]}
            onPress={isRecording ? stopRecording : startRecording}
            activeOpacity={0.7}
          >
            <View style={[
              styles.recordIcon, 
              isRecording && styles.recordIconActive,
              { backgroundColor: isRecording ? '#fee2e2' : companyColor + '20' }
            ]}>
              <Text style={styles.recordIconText}>
                {isRecording ? '⏹' : '🎤'}
              </Text>
            </View>
            <Text style={[styles.recordButtonText, { color: isRecording ? '#ef4444' : companyColor }]}>
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Text>
          </TouchableOpacity>

          {isRecording && (
            <View style={styles.recordingIndicator}>
              <View style={styles.recordingDot} />
              <Text style={styles.recordingText}>Recording in progress...</Text>
            </View>
          )}
        </View>

        {/* Answer Preview */}
        {answers[currentIndex] && (
          <View style={styles.answerPreview}>
            <View style={styles.answerHeader}>
              <Text style={styles.answerLabel}>✓ Answer Recorded</Text>
              <TouchableOpacity onPress={handleReRecord}>
                <Text style={[styles.reRecordText, { color: companyColor }]}>Re-record</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.answerText} numberOfLines={3}>
              {answers[currentIndex]}
            </Text>
          </View>
        )}

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.nextButton,
              { backgroundColor: answers[currentIndex] ? companyColor : '#cbd5e1' }
            ]} 
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {currentIndex < questions.length - 1 ? 'Next →' : 'Finish ✓'}
            </Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
  },
  interviewBadge: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
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
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  progressPercentage: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  difficultyEasy: {
    backgroundColor: '#d1fae5',
  },
  difficultyMedium: {
    backgroundColor: '#fef3c7',
  },
  difficultyHard: {
    backgroundColor: '#fee2e2',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  difficultyTextEasy: {
    color: '#065f46',
  },
  difficultyTextMedium: {
    color: '#92400e',
  },
  difficultyTextHard: {
    color: '#991b1b',
  },
  questionCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  questionNumber: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 12,
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  questionText: {
    fontSize: 20,
    color: '#111827',
    lineHeight: 30,
    fontWeight: '500',
  },
  recordingSection: {
    marginBottom: 24,
  },
  recordButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  recordButtonActive: {
    backgroundColor: '#fef2f2',
  },
  recordIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  recordIconActive: {
    backgroundColor: '#fee2e2',
  },
  recordIconText: {
    fontSize: 28,
  },
  recordButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    padding: 12,
    backgroundColor: '#fef2f2',
    borderRadius: 8,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    marginRight: 8,
  },
  recordingText: {
    color: '#ef4444',
    fontSize: 14,
    fontWeight: '600',
  },
  answerPreview: {
    backgroundColor: '#f0fdf4',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#86efac',
  },
  answerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  answerLabel: {
    fontSize: 14,
    color: '#15803d',
    fontWeight: '600',
  },
  reRecordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  answerText: {
    fontSize: 14,
    color: '#166534',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  skipButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
  },
  skipButtonText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    flex: 2,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});