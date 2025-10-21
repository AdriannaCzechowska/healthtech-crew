# HealthTech Crew - Smart Preventive Healthcare Platform

A modern, colorful TypeScript web application that combines personal healthcare management with Smart City insights to promote preventive care and citizen wellbeing.

## 🌟 Features

### Core Healthcare Management

- **Dashboard**: Personalized health overview with key metrics and quick access to all features
- **Messages**: Secure communication with healthcare providers
- **AI Recommendations**: Adaptive health insights powered by AI analysis
- **Treatment Plan**: Track daily health goals with progress monitoring
- **Appointments**: Manage upcoming and past healthcare visits
- **Lab Results**: View and track laboratory test results
- **Symptom Check**: AI-powered symptom analysis and triage guidance

### Smart City Integration

- **Air Quality Monitoring**: Real-time AQI data with pollutant breakdown
- **Pollen Tracking**: Allergy-friendly pollen level forecasts
- **Walking Routes**: Health-optimized routes based on air quality and green spaces
- **Health Campaigns**: Community health screenings and educational programs
- **District Analytics**: Preventive care participation and health scores by district

## 🎨 Design Features

- **Modern Aesthetic**: Pastel colors with glassmorphism and soft neo-brutalism
- **Smooth Animations**: Framer Motion for delightful user interactions
- **Responsive Design**: Mobile-first approach with full tablet and desktop support
- **Accessibility**: WCAG AA compliant with keyboard navigation and ARIA support
- **Dark Mode**: Persistent theme switching with localStorage

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router and TypeScript
- **UI Components**: shadcn/ui + Tailwind CSS
- **Icons**: Lucide React
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Form Validation**: Zod + React Hook Form
- **Animations**: Framer Motion
- **Localization**: English (en-GB)

## 📁 Project Structure

```
healthtech-crew/
├── app/
│   ├── (dashboard)/          # Dashboard components
│   ├── ai-recommendations/   # AI recommendations page
│   ├── lab-results/          # Lab results page
│   ├── messages/             # Messaging interface
│   ├── smart-city/           # Smart City insights
│   ├── symptom-check/        # Symptom checker
│   ├── treatment-plan/       # Treatment plan tracker
│   ├── visits/               # Appointments management
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   ├── providers.tsx         # React Query provider
│   └── globals.css           # Global styles
├── components/
│   ├── core/                 # Shared components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── KpiCard.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── EmptyState.tsx
│   │   └── ConfirmDialog.tsx
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── api.ts                # Mock API with simulated delays
│   ├── types.ts              # TypeScript type definitions
│   ├── store.ts              # Zustand state management
│   └── utils.ts              # Utility functions
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd healthtech-crew
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## 🎯 Key Components

### Mock API

The application uses an in-memory mock API with simulated network delays (300-600ms) to demonstrate realistic data fetching patterns. All data is stored in `lib/api.ts` and can be easily replaced with real API endpoints.

### State Management

Zustand provides lightweight global state for:
- User authentication
- Theme preferences (persisted to localStorage)

### Data Fetching

TanStack Query handles:
- Automatic caching and refetching
- Loading and error states
- Optimistic updates
- Query invalidation

## 🌈 Color Palette

- **Primary** (Indigo): `oklch(0.66 0.15 280)` - Main brand color
- **Secondary** (Mint): `oklch(0.85 0.08 160)` - Success and positive actions
- **Accent** (Peach): `oklch(0.88 0.08 40)` - Highlights and CTAs
- **Muted** (Lavender): `oklch(0.90 0.05 300)` - Backgrounds and subtle elements

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Color contrast compliance (WCAG AA)
- Screen reader friendly

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔮 Future Enhancements

- Real-time notifications
- Calendar integration
- Wearable device sync
- Telemedicine video calls
- Prescription management
- Health insurance integration
- Multi-language support
- Progressive Web App (PWA)

## 📄 License

This project is created for demonstration purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For questions or support, please contact the development team.

---

**Built with ❤️ using Next.js and TypeScript**

