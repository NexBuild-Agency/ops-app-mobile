import { View, StyleSheet, ScrollView, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Brief, Quiz } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Button } from '@/components/ui/Button';
import { Play, CircleCheck, Circle as XCircle, Award } from 'lucide-react-native';
import { WebView } from 'react-native-webview';

// Mock quiz data with more realistic questions
const mockQuiz: Quiz = {
  id: 1,
  briefId: 1,
  questions: [
    {
      id: 1,
      text: "Quelle est la première étape d'une vente réussie ?",
      options: [
        "Parler immédiatement du prix",
        "Établir un contact et identifier les besoins",
        "Montrer tous les produits disponibles",
        "Proposer une promotion"
      ],
      correctOptionIndex: 1
    },
    {
      id: 2,
      text: "Comment gérer une objection client ?",
      options: [
        "L'ignorer et continuer la présentation",
        "Contredire le client",
        "Écouter, reformuler et répondre avec des arguments",
        "Proposer immédiatement une remise"
      ],
      correctOptionIndex: 2
    },
    {
      id: 3,
      text: "Quel est le meilleur moment pour conclure une vente ?",
      options: [
        "Quand le client montre des signaux d'achat",
        "Dès le début de la conversation",
        "À la fin de la présentation",
        "Quand d'autres clients attendent"
      ],
      correctOptionIndex: 0
    },
    {
      id: 4,
      text: "Comment créer une expérience client mémorable ?",
      options: [
        "Rester strictement professionnel",
        "Personnaliser l'interaction et être authentique",
        "Parler uniquement des produits",
        "Finir la vente rapidement"
      ],
      correctOptionIndex: 1
    }
  ]
};

export default function BriefDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [brief, setBrief] = useState<Brief | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

  useEffect(() => {
    loadBrief();
  }, [id]);

  const loadBrief = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use the actual brief from the parent component's data
      const mockBrief: Brief = {
        id: parseInt(id as string),
        title: "Techniques de vente avancées",
        description: "Découvrez les techniques de vente les plus efficaces utilisées par les professionnels. Cette formation couvre l'approche client, la présentation produit, la gestion des objections et la conclusion de vente.",
        videoUrl: "https://www.youtube.com/embed/lp1QvGQqhNY",
        date: "2025-04-15T10:00:00Z",
        hasQuiz: true,
      };
      
      setBrief(mockBrief);
    } catch (err) {
      console.error('Error loading brief:', err);
      setError('Impossible de charger les détails du brief');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < mockQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      let correctAnswers = 0;
      selectedAnswers.forEach((answer, index) => {
        if (answer === mockQuiz.questions[index].correctOptionIndex) {
          correctAnswers++;
        }
      });
      setScore((correctAnswers / mockQuiz.questions.length) * 100);
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setQuizCompleted(false);
    setScore(0);
    setShowCorrectAnswers(false);
  };

  const getScoreColor = () => {
    if (score >= 80) return Colors.success.main;
    if (score >= 60) return Colors.warning.main;
    return Colors.error.main;
  };

  const getScoreMessage = () => {
    if (score >= 80) return 'Excellent ! Vous maîtrisez le sujet !';
    if (score >= 60) return 'Bien ! Continuez à vous améliorer !';
    return 'Continuez à apprendre et réessayez !';
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary.main} />
      </View>
    );
  }

  if (error || !brief) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Brief non trouvé'}</Text>
      </View>
    );
  }

  if (showQuiz) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.quizContainer}>
        {quizCompleted ? (
          <View style={styles.quizResultContainer}>
            <Award size={64} color={getScoreColor()} style={styles.quizResultIcon} />
            <Text style={styles.quizResultTitle}>Quiz terminé !</Text>
            <Text style={[styles.quizResultScore, { color: getScoreColor() }]}>
              {score.toFixed(0)}%
            </Text>
            <Text style={styles.quizResultMessage}>{getScoreMessage()}</Text>
            
            <View style={styles.quizResultButtons}>
              <Button
                title="Voir les corrections"
                onPress={() => setShowCorrectAnswers(true)}
                variant="outlined"
                style={styles.quizButton}
              />
              <Button
                title="Recommencer le quiz"
                onPress={handleRestartQuiz}
                style={styles.quizButton}
              />
            </View>

            {showCorrectAnswers && (
              <View style={styles.correctionsContainer}>
                <Text style={styles.correctionsTitle}>Corrections</Text>
                {mockQuiz.questions.map((question, index) => (
                  <View key={index} style={styles.correctionItem}>
                    <Text style={styles.correctionQuestion}>{question.text}</Text>
                    <View style={styles.correctionAnswer}>
                      {selectedAnswers[index] === question.correctOptionIndex ? (
                        <CircleCheck size={20} color={Colors.success.main} />
                      ) : (
                        <XCircle size={20} color={Colors.error.main} />
                      )}
                      <Text style={styles.correctionText}>
                        Votre réponse : {question.options[selectedAnswers[index]]}
                      </Text>
                    </View>
                    {selectedAnswers[index] !== question.correctOptionIndex && (
                      <Text style={styles.correctAnswer}>
                        Réponse correcte : {question.options[question.correctOptionIndex]}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        ) : (
          <>
            <View style={styles.questionHeader}>
              <Text style={styles.questionCounter}>
                Question {currentQuestion + 1} sur {mockQuiz.questions.length}
              </Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { width: `${((currentQuestion + 1) / mockQuiz.questions.length) * 100}%` }
                  ]} 
                />
              </View>
            </View>

            <Text style={styles.questionText}>
              {mockQuiz.questions[currentQuestion].text}
            </Text>

            {mockQuiz.questions[currentQuestion].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedAnswers[currentQuestion] === index && styles.optionButtonSelected
                ]}
                onPress={() => handleAnswerSelect(index)}
              >
                <Text style={[
                  styles.optionText,
                  selectedAnswers[currentQuestion] === index && styles.optionTextSelected
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}

            <Button
              title={currentQuestion === mockQuiz.questions.length - 1 ? "Terminer le quiz" : "Question suivante"}
              onPress={handleNextQuestion}
              disabled={selectedAnswers[currentQuestion] === undefined}
              style={styles.nextButton}
            />
          </>
        )}
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{brief.title}</Text>
        <Text style={styles.date}>
          {format(new Date(brief.date), 'dd MMMM yyyy', { locale: fr })}
        </Text>
      </View>

      <View style={styles.videoContainer}>
        <WebView
          style={styles.video}
          source={{ uri: brief.videoUrl }}
          allowsFullscreenVideo
          javaScriptEnabled
          domStorageEnabled
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>{brief.description}</Text>

        {brief.hasQuiz && (
          <Button
            title="Commencer le quiz"
            onPress={() => setShowQuiz(true)}
            icon={<Play size={20} color={Colors.common.white} />}
            style={styles.quizButton}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.l,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  header: {
    padding: Layout.spacing.m,
    backgroundColor: Colors.background.paper,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.s,
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  videoContainer: {
    height: 250,
    backgroundColor: Colors.grey[900],
  },
  video: {
    flex: 1,
  },
  content: {
    padding: Layout.spacing.m,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 24,
    marginBottom: Layout.spacing.l,
  },
  quizButton: {
    marginTop: Layout.spacing.m,
  },
  quizContainer: {
    padding: Layout.spacing.m,
  },
  questionHeader: {
    marginBottom: Layout.spacing.l,
  },
  questionCounter: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.s,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.grey[200],
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary.main,
  },
  questionText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.l,
  },
  optionButton: {
    backgroundColor: Colors.grey[100],
    padding: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    marginBottom: Layout.spacing.m,
  },
  optionButtonSelected: {
    backgroundColor: Colors.primary.main,
  },
  optionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.text.primary,
  },
  optionTextSelected: {
    color: Colors.common.white,
  },
  nextButton: {
    marginTop: Layout.spacing.m,
  },
  quizResultContainer: {
    alignItems: 'center',
    padding: Layout.spacing.xl,
  },
  quizResultIcon: {
    marginBottom: Layout.spacing.m,
  },
  quizResultTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.m,
  },
  quizResultScore: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 48,
    marginBottom: Layout.spacing.m,
  },
  quizResultMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Layout.spacing.xl,
  },
  quizResultButtons: {
    flexDirection: 'row',
    gap: Layout.spacing.m,
    marginBottom: Layout.spacing.xl,
  },
  correctionsContainer: {
    width: '100%',
    backgroundColor: Colors.background.paper,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
  },
  correctionsTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.m,
  },
  correctionItem: {
    marginBottom: Layout.spacing.l,
  },
  correctionQuestion: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.s,
  },
  correctionAnswer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.s,
    marginBottom: Layout.spacing.xs,
  },
  correctionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    flex: 1,
  },
  correctAnswer: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.success.main,
  },
});