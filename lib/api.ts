import type {
  Message,
  Recommendation,
  Task,
  Visit,
  LabResult,
  AIReport,
  TreatmentPlan,
  SmartCityData,
  User,
  SymptomReport,
  Team,
  Territory,
  NeighborhoodEvent,
  Reward,
  PreventiveEvent,
} from "./types";

// Simulate network delay
const delay = () => new Promise((resolve) => setTimeout(resolve, Math.random() * 300 + 300));

// Mock data
const mockUser: User = {
  id: "1",
  name: "Anna Kowalska",
  email: "anna.kowalska@example.com",
  avatar: undefined,
  teamId: "team-1",
  points: 1250,
};

const mockMessages: Message[] = [
  {
    id: "1",
    from: "Dr Anna Kowalska",
    subject: "Test Results Available",
    snippet: "Your recent blood test results are now available for review...",
    time: "2 hours ago",
    unread: true,
    content: "Hello John,\n\nYour recent blood test results are now available for review. Overall, the results look good. Your cholesterol levels have improved since your last visit. Please schedule a follow-up appointment to discuss the details.\n\nBest regards,\nDr Anna Kowalska",
    attachments: ["blood-test-results.pdf"],
  },
  {
    id: "2",
    from: "City Health Clinic",
    subject: "Appointment Reminder",
    snippet: "This is a reminder for your upcoming appointment on...",
    time: "1 day ago",
    unread: true,
    content: "Dear John,\n\nThis is a reminder for your upcoming appointment on October 25th at 10:00 AM with Dr Anna Kowalska. Please arrive 15 minutes early to complete any necessary paperwork.\n\nCity Health Clinic",
  },
  {
    id: "3",
    from: "Dr Michael Chen",
    subject: "Preventive Care Recommendations",
    snippet: "Based on your age and health history, we recommend...",
    time: "3 days ago",
    unread: false,
    content: "Hi John,\n\nBased on your age and health history, we recommend scheduling the following preventive screenings:\n- Annual physical examination\n- Cardiovascular health check\n- Vision test\n\nPlease contact our office to schedule these appointments.\n\nDr Michael Chen",
  },
];

const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    title: "Schedule Follow-up Visit",
    description: "Your recent test results require a follow-up consultation with Dr Kowalska within the next 2 weeks.",
    severity: "Medium",
    category: "Appointments",
    actionUrl: "/visits",
  },
  {
    id: "2",
    title: "Preventive Screening Due",
    description: "Annual cardiovascular screening is recommended based on your age and health profile.",
    severity: "High",
    category: "Preventive Care",
    actionUrl: "/visits",
  },
  {
    id: "3",
    title: "Increase Physical Activity",
    description: "Your activity levels are below recommended targets. Consider adding 30 minutes of walking daily.",
    severity: "Low",
    category: "Lifestyle",
    actionUrl: "/treatment-plan",
  },
  {
    id: "4",
    title: "Hydration Goals",
    description: "You're meeting 85% of your daily hydration goals. Keep up the good work!",
    severity: "Low",
    category: "Wellness",
  },
];

const mockTasks: Task[] = [
  { id: "1", label: "30 minutes walking", done: true, group: "Activity", frequency: "Daily" },
  { id: "2", label: "Drink 2L water", done: true, group: "Hydration", frequency: "Daily" },
  { id: "3", label: "Eat 5 portions of vegetables", done: false, group: "Diet", frequency: "Daily" },
  { id: "4", label: "20 minutes cardio exercise", done: false, group: "Activity", frequency: "3x per week" },
  { id: "5", label: "Take vitamin D supplement", done: true, group: "Medication", frequency: "Daily" },
  { id: "6", label: "Meditation or relaxation", done: false, group: "Activity", frequency: "Daily" },
];

const mockVisits: Visit[] = [
  {
    id: "1",
    date: "2025-10-25",
    doctor: "Dr Anna Kowalska",
    place: "City Health Clinic",
    status: "Confirmed",
    specialty: "General Practice",
    notes: "Follow-up for test results",
  },
  {
    id: "2",
    date: "2025-11-05",
    doctor: "Dr Michael Chen",
    place: "Cardiology Centre",
    status: "Pending",
    specialty: "Cardiology",
    notes: "Annual cardiovascular screening",
  },
  {
    id: "3",
    date: "2025-09-15",
    doctor: "Dr Sarah Williams",
    place: "City Health Clinic",
    status: "Confirmed",
    specialty: "Dermatology",
    notes: "Skin check completed",
  },
  {
    id: "4",
    date: "2025-08-20",
    doctor: "Dr Anna Kowalska",
    place: "City Health Clinic",
    status: "Confirmed",
    specialty: "General Practice",
    notes: "Annual physical examination",
  },
];

const mockLabResults: LabResult[] = [
  {
    id: "1",
    date: "2025-10-15",
    name: "Complete Blood Count",
    status: "Normal",
    value: "Wszystkie wartości w normie",
    fileUrl: "/results/cbc-2025-10-15.pdf",
  },
  {
    id: "2",
    date: "2025-10-15",
    name: "Lipid Panel",
    status: "Normal",
    value: "Total cholesterol: 180 mg/dL",
    fileUrl: "/results/lipid-2025-10-15.pdf",
  },
  {
    id: "3",
    date: "2025-08-20",
    name: "Vitamin D Level",
    status: "Abnormal",
    value: "18 ng/mL (Niski)",
    repeatAt: "2025-11-20",
    fileUrl: "/results/vitamin-d-2025-08-20.pdf",
  },
  {
    id: "4",
    date: "2025-08-20",
    name: "Thyroid Function",
    status: "Normal",
    value: "TSH: 2.5 mIU/L",
  },
];

const mockTreatmentPlan: TreatmentPlan = {
  id: "1",
  name: "Preventive Health & Wellness Plan",
  progress: 65,
  motivation: "High",
  tasks: mockTasks,
  startDate: "2025-09-01",
};

// === MOCK: KALENDARZ PROFILAKTYKI OSOBISTEJ ===
const mockPreventiveCalendar: PreventiveEvent[] = [
  {
    id: "1",
    name: "Morfologia krwi",
    date: "2025-11-20",
    status: "upcoming",
  },
  {
    id: "2",
    name: "Cytologia",
    date: "2025-09-10",
    status: "done",
  },
  {
    id: "3",
    name: "Pomiar ciśnienia tętniczego",
    date: "2025-10-05",
    status: "overdue",
  },
  {
    id: "4",
    name: "Mammografia",
    date: "2025-12-01",
    status: "upcoming",
  },
];

const mockTeams: Team[] = [
  {
    id: "team-1",
    name: "Rowerowa Retkinia",
    color: "#6C5CE7",
    district: "Retkinia",
    members: 45,
    points: 12500,
    territoriesControlled: 8,
    rank: 1,
  },
  {
    id: "team-2",
    name: "Biegacze Bałut",
    color: "#00B894",
    district: "Bałuty",
    members: 38,
    points: 11200,
    territoriesControlled: 7,
    rank: 2,
  },
  {
    id: "team-3",
    name: "Widzewskie Spacery",
    color: "#FDCB6E",
    district: "Widzew",
    members: 32,
    points: 9800,
    territoriesControlled: 5,
    rank: 3,
  },
  {
    id: "team-4",
    name: "Górna Aktywność",
    color: "#E17055",
    district: "Górna",
    members: 28,
    points: 8500,
    territoriesControlled: 4,
    rank: 4,
  },
];

const mockTerritories: Territory[] = [
  { id: "t1", name: "Park Poniatowskiego", district: "Retkinia", controlledBy: "team-1", points: 500, lat: 51.7592, lng: 19.4560 },
  { id: "t2", name: "Las Łagiewnicki", district: "Retkinia", controlledBy: "team-1", points: 800, lat: 51.7200, lng: 19.3800 },
  { id: "t3", name: "Park Źródliska", district: "Bałuty", controlledBy: "team-2", points: 600, lat: 51.8000, lng: 19.4700 },
  { id: "t4", name: "Manufaktura", district: "Śródmieście", controlledBy: "team-2", points: 700, lat: 51.7810, lng: 19.4500 },
  { id: "t5", name: "Park Reymonta", district: "Widzew", controlledBy: "team-3", points: 550, lat: 51.7650, lng: 19.5100 },
  { id: "t6", name: "Piotrkowska", district: "Śródmieście", controlledBy: undefined, points: 900, lat: 51.7687, lng: 19.4569 },
];

const mockNeighborhoodEvents: NeighborhoodEvent[] = [
  {
    id: "e1",
    title: "Poranny spacer po Retkinii",
    description: "Wspólny spacer nordic walking po najpiękniejszych zakątkach dzielnicy",
    organizer: "Maria Nowak",
    teamId: "team-1",
    date: "2025-10-25T07:00:00",
    location: "Park Poniatowskiego",
    participants: 12,
    maxParticipants: 20,
    type: "walk",
    points: 50,
    status: "upcoming",
  },
  {
    id: "e2",
    title: "Bieg po Bałutach",
    description: "5km bieg grupowy z rozgrzewką i rozciąganiem",
    organizer: "Piotr Kowalczyk",
    teamId: "team-2",
    date: "2025-10-26T18:00:00",
    location: "Park Źródliska",
    participants: 8,
    maxParticipants: 15,
    type: "run",
    points: 75,
    status: "upcoming",
  },
  {
    id: "e3",
    title: "Rowerowa wycieczka",
    description: "20km trasa rowerowa przez zielone tereny Widzewa",
    organizer: "Katarzyna Wiśniewska",
    teamId: "team-3",
    date: "2025-10-27T10:00:00",
    location: "Park Reymonta",
    participants: 15,
    maxParticipants: 25,
    type: "bike",
    points: 100,
    status: "upcoming",
  },
];

const mockRewards: Reward[] = [
  {
    id: "r1",
    title: "20% zniżki w Aquapark Fala",
    description: "Voucher na wstęp do aquaparku",
    points: 500,
    category: "Sport i rekreacja",
    partner: "Aquapark Fala",
    available: true,
  },
  {
    id: "r2",
    title: "Darmowe badanie ciśnienia",
    description: "Bezpłatne badanie w punkcie zdrowia",
    points: 200,
    category: "Zdrowie",
    partner: "Miejskie Centrum Zdrowia",
    available: true,
  },
  {
    id: "r3",
    title: "Voucher do Manufaktury",
    description: "50 zł na zakupy w centrum handlowym",
    points: 1000,
    category: "Zakupy",
    partner: "Manufaktura",
    available: true,
  },
  {
    id: "r4",
    title: "Bilet MPK na miesiąc",
    description: "Darmowy miesięczny bilet komunikacji miejskiej",
    points: 800,
    category: "Transport",
    partner: "MPK Łódź",
    available: true,
  },
];

const mockSmartCityData: SmartCityData = {
  airQuality: {
    aqi: 45,
    level: "Good",
    pollutants: [
      { name: "PM2.5", value: 12, unit: "μg/m³" },
      { name: "PM10", value: 25, unit: "μg/m³" },
      { name: "O3", value: 35, unit: "ppb" },
      { name: "NO2", value: 18, unit: "ppb" },
    ],
    timestamp: new Date().toISOString(),
  },
  pollen: {
    level: "Moderate",
    types: [
      { name: "Grass", level: "High" },
      { name: "Tree", level: "Low" },
      { name: "Weed", level: "Moderate" },
    ],
    forecast: "Pollen levels expected to decrease over the next 48 hours",
  },
  walkingRoutes: [
    {
      id: "1",
      name: "Trasa Park Poniatowskiego",
      distance: 3.2,
      duration: 45,
      greenScore: 95,
      airQualityScore: 88,
    },
    {
      id: "2",
      name: "Pętla Śródmieścia",
      distance: 2.5,
      duration: 35,
      greenScore: 65,
      airQualityScore: 72,
    },
    {
      id: "3",
      name: "Trasa Leśna",
      distance: 5.0,
      duration: 75,
      greenScore: 98,
      airQualityScore: 95,
    },
  ],
  healthCampaigns: [
    {
      id: "1",
      title: "Bezpłatne badanie sercowo-naczyniowe",
      description: "Bezpłatne badania zdrowia serca dla mieszkańców powyżej 40 lat",
      location: "Centralne Centrum Społeczności",
      date: "2025-11-10",
      type: "Screening",
    },
    {
      id: "2",
      title: "Tydzień Świadomości Cukrzycy",
      description: "Sesje edukacyjne i bezpłatne badania poziomu cukru we krwi",
      location: "Miejskie Centrum Zdrowia",
      date: "2025-11-14",
      type: "Education",
    },
    {
      id: "3",
      title: "Grupa Wsparcia Zdrowia Psychicznego",
      description: "Cotygodniowe sesje wsparcia dla dobrostanu psychicznego",
      location: "Centrum Wellness",
      date: "2025-10-28",
      type: "Support",
    },
  ],
  districtHealth: [
    { district: "Śródmieście", participationRate: 78, screeningsConducted: 1250, healthScore: 85 },
    { district: "Retkinia", participationRate: 65, screeningsConducted: 890, healthScore: 78 },
    { district: "Widzew", participationRate: 72, screeningsConducted: 1100, healthScore: 82 },
    { district: "Górna", participationRate: 68, screeningsConducted: 950, healthScore: 80 },
    { district: "Bałuty", participationRate: 82, screeningsConducted: 1400, healthScore: 88 },
  ],
};

// API functions
export const api = {
  async getUser(): Promise<User> {
    await delay();
    return mockUser;
  },

  async getMessages(): Promise<Message[]> {
    await delay();
    return mockMessages;
  },

  async getMessage(id: string): Promise<Message | undefined> {
    await delay();
    return mockMessages.find((m) => m.id === id);
  },

  async markMessageAsRead(id: string): Promise<void> {
    await delay();
    const message = mockMessages.find((m) => m.id === id);
    if (message) {
      message.unread = false;
    }
  },

  async getRecommendations(): Promise<Recommendation[]> {
    await delay();
    return mockRecommendations;
  },

  async refreshRecommendations(): Promise<Recommendation[]> {
    await delay();
    // Simulate AI re-analysis with slightly different results
    return mockRecommendations.map((rec) => ({
      ...rec,
      description: rec.description + " (Updated)",
    }));
  },

  async getTreatmentPlan(): Promise<TreatmentPlan> {
    await delay();
    return mockTreatmentPlan;
  },

  async updateTaskStatus(taskId: string, done: boolean): Promise<void> {
    await delay();
    const task = mockTasks.find((t) => t.id === taskId);
    if (task) {
      task.done = done;
      // Recalculate progress
      const completedTasks = mockTasks.filter((t) => t.done).length;
      mockTreatmentPlan.progress = Math.round((completedTasks / mockTasks.length) * 100);
    }
  },

  async getVisits(): Promise<Visit[]> {
    await delay();
    return mockVisits;
  },

  async getLabResults(): Promise<LabResult[]> {
    await delay();
    return mockLabResults;
  },

  async submitSymptomReport(report: SymptomReport): Promise<AIReport> {
    await delay();
    
    // Mock AI analysis based on severity
    let urgency: AIReport["urgency"] = "Low";
    let analysis = "Based on the symptoms you've reported, this appears to be a minor health concern.";
    let recommendations = [
      "Monitor symptoms for the next 24-48 hours",
      "Stay hydrated and get adequate rest",
      "Consider over-the-counter remedies if appropriate",
    ];

    if (report.severity >= 7) {
      urgency = "High";
      analysis = "The symptoms you've reported suggest a condition that requires medical attention.";
      recommendations = [
        "Schedule an appointment with your GP within 24 hours",
        "Monitor symptoms closely",
        "Seek immediate care if symptoms worsen",
      ];
    } else if (report.severity >= 4) {
      urgency = "Medium";
      analysis = "Your symptoms indicate a moderate health concern that should be evaluated.";
      recommendations = [
        "Schedule an appointment with your GP within the next few days",
        "Keep a symptom diary",
        "Avoid strenuous activities until evaluated",
      ];
    }

    return {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      symptoms: report.symptoms,
      analysis,
      recommendations,
      urgency,
    };
  },

  async getSmartCityData(): Promise<SmartCityData> {
    await delay();
    return mockSmartCityData;
  },

  async getTeams(): Promise<Team[]> {
    await delay();
    return mockTeams;
  },

  async getTeam(id: string): Promise<Team | undefined> {
    await delay();
    return mockTeams.find((t) => t.id === id);
  },

  async getTerritories(): Promise<Territory[]> {
    await delay();
    return mockTerritories;
  },

  async getNeighborhoodEvents(): Promise<NeighborhoodEvent[]> {
    await delay();
    return mockNeighborhoodEvents;
  },

  async joinEvent(eventId: string): Promise<void> {
    await delay();
    const event = mockNeighborhoodEvents.find((e) => e.id === eventId);
    if (event && event.participants < event.maxParticipants) {
      event.participants += 1;
    }
  },

  async getRewards(): Promise<Reward[]> {
    await delay();
    return mockRewards;
  },

  async redeemReward(rewardId: string): Promise<boolean> {
    await delay();
    const reward = mockRewards.find((r) => r.id === rewardId);
    if (reward && reward.available && mockUser.points >= reward.points) {
      mockUser.points -= reward.points;
      return true;
    }
    return false;
  },

  // === KALENDARZ PROFILAKTYKI OSOBISTEJ ===
  async getPreventiveCalendar(): Promise<PreventiveEvent[]> {
    await delay();
    return mockPreventiveCalendar;
  },

  async addPreventiveEvent(event: {
    name: string;
    date: string;
    status?: "done" | "upcoming" | "overdue";
  }): Promise<void> {
    await delay();
    mockPreventiveCalendar.push({
      id: Date.now().toString(),
      name: event.name,
      date: event.date,
      status: event.status || "upcoming",
    });
  },

  async updatePreventiveEventStatus(eventId: string, status: "done" | "upcoming" | "overdue"): Promise<void> {
    await delay();
    const event = mockPreventiveCalendar.find((e) => e.id === eventId);
    if (event) {
      event.status = status;
    }
  },
};

