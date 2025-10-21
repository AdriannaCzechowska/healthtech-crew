export type Message = {
  id: string;
  from: string;
  subject: string;
  snippet: string;
  time: string;
  unread: boolean;
  content?: string;
  attachments?: string[];
};

export type Recommendation = {
  id: string;
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High";
  category: string;
  actionUrl?: string;
};

export type Task = {
  id: string;
  label: string;
  done: boolean;
  group: "Activity" | "Hydration" | "Diet" | "Medication";
  frequency: string;
};

export type Visit = {
  id: string;
  date: string;
  doctor: string;
  place: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  specialty?: string;
  notes?: string;
};

export type LabResult = {
  id: string;
  date: string;
  name: string;
  fileUrl?: string;
  repeatAt?: string;
  status: "Normal" | "Abnormal" | "Pending";
  value?: string;
};

export type SymptomReport = {
  symptoms: string[];
  severity: number;
  duration: string;
  additionalNotes?: string;
};

export type AIReport = {
  id: string;
  date: string;
  symptoms: string[];
  analysis: string;
  recommendations: string[];
  urgency: "Low" | "Medium" | "High" | "Emergency";
};

export type TreatmentPlan = {
  id: string;
  name: string;
  progress: number;
  motivation: "Low" | "Medium" | "High";
  tasks: Task[];
  startDate: string;
  endDate?: string;
};

export type SmartCityData = {
  airQuality: {
    aqi: number;
    level: string;
    pollutants: { name: string; value: number; unit: string }[];
    timestamp: string;
  };
  pollen: {
    level: string;
    types: { name: string; level: string }[];
    forecast: string;
  };
  walkingRoutes: {
    id: string;
    name: string;
    distance: number;
    duration: number;
    greenScore: number;
    airQualityScore: number;
  }[];
  healthCampaigns: {
    id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    type: string;
  }[];
  districtHealth: {
    district: string;
    participationRate: number;
    screeningsConducted: number;
    healthScore: number;
  }[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  teamId?: string;
  points: number;
};

export type Team = {
  id: string;
  name: string;
  color: string;
  district: string;
  members: number;
  points: number;
  territoriesControlled: number;
  rank: number;
};

export type Territory = {
  id: string;
  name: string;
  district: string;
  controlledBy?: string; // team ID
  points: number;
  lat: number;
  lng: number;
};

export type NeighborhoodEvent = {
  id: string;
  title: string;
  description: string;
  organizer: string;
  teamId: string;
  date: string;
  location: string;
  participants: number;
  maxParticipants: number;
  type: "walk" | "run" | "bike" | "workout";
  points: number;
  status: "upcoming" | "ongoing" | "completed";
};

export type Reward = {
  id: string;
  title: string;
  description: string;
  points: number;
  category: string;
  partner: string;
  imageUrl?: string;
  available: boolean;
};

