// User types
export interface User {
  id: string;
  email: string;
  fullName: string;
  photo: string | null;
  cin: string;
  region: string;
  weight: number | null;
  height: number | null;
  hasDrivingLicense: boolean;
  hasVehicle: boolean;
}

export interface UserProfile {
  photo: string | null;
  fullName: string;
  cin: string;
  region: string;
  weight: number | null;
  height: number | null;
  hasDrivingLicense: boolean;
  hasVehicle: boolean;
}

// Pointage types
export interface Pointage {
  id: number;
  photo: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  status: 'en attente' | 'validé' | 'rejeté';
  feedback: string | null;
}

export interface PointageSubmission {
  photo: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

// Evenement types
export interface Evenement {
  id: number;
  name: string;
  partner: string;
  startDate: string;
  endDate: string;
  zone: string;
  image: string;
  description: string;
  requirements: string;
  products: string[];
  isActive: boolean;
}

export interface Candidature {
  id: number;
  evenementId: number;
  status: 'pending' | 'accepted' | 'rejected';
  date: string;
  evenement: Evenement;
}

// Lieu types
export interface Lieu {
  id: number;
  name: string;
  address: string;
  region: string;
  latitude: number;
  longitude: number;
}

// Stock types
export interface Stock {
  id: number;
  eventId: number;
  lieuId: number;
  product: string;
  productCode: string;
  initialQuantity: number;
  quantity: number;
  event: {
    id: number;
    name: string;
  };
  lieu: {
    id: number;
    name: string;
  };
}

export interface StockUpdate {
  usedQuantity: number;
}

// Réclamation types
export interface Reclamation {
  id: number;
  category: string;
  description: string;
  photo: string | null;
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected';
  date: string;
  responses: ReclamationResponse[];
}

export interface ReclamationResponse {
  id: number;
  content: string;
  date: string;
  isFromAdmin: boolean;
}

// Brief types
export interface Brief {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  date: string;
  hasQuiz: boolean;
}

export interface Quiz {
  id: number;
  briefId: number;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
  correctOptionIndex: number;
}

// Evaluation types
export interface Evaluation {
  id: number;
  animatorId: string;
  supervisorId: string;
  evenementId: number;
  rating: number;
  comment: string;
  date: string;
  evenement: {
    id: number;
    name: string;
  };
}