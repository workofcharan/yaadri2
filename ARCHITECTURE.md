# YAADRI - Complete Architecture & Build Guide

## Overview

YAADRI is a full-stack, mobile-first React application designed for elderly users with memory and recognition difficulties. The architecture follows a progressive disclosure model with two distinct user modes: Patient Mode and Caregiver Mode.

**Key Design Principle**: Personal, verified memories become the content of cognitive engagement.

---

## Technology Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks + Context API
- **Visualization**: SVG graphs (native, no D3 dependency)
- **Icons**: Lucide React
- **Language**: JavaScript/JSX

### Backend (Demo Phase)
- **Data**: Structured JSON (client-side)
- **Audio**: Web Audio API (simulated in demo)
- **Storage**: LocalStorage (for demo)
- **Future**: Supabase PostgreSQL + Neo4j for graph

---

## Architecture Layers

### 1. Application Shell
```
App Container
├── Splash Screen (2.5s animated intro)
├── Mode Selection (Patient vs Caregiver)
├── Patient Mode Experience
├── Caregiver Mode Experience
└── Global Language Toggle
```

### 2. Data Model Architecture

#### A. Patient Record
```javascript
{
  id: 'patient_001',
  name: 'Ananya',
  age: 72,
  location: 'Guwahati',
  preferredLanguage: 'en',
  supportedLanguages: ['en', 'as'],
  cognitiveProfile: {
    strongAreas: ['family', 'places'],
    developingAreas: ['routines'],
  }
}
```

#### B. Family Members (Graph Nodes)
```javascript
{
  id: 'meera',
  name: 'Meera',
  relation: 'daughter',
  description: 'Your daughter',
  voiceMessage: 'Hello Amma, it\'s me, Meera.',
  image: 'emoji or image_url',
  color: 'hex_color',
  connectedMemories: ['mem_001', 'mem_002', 'mem_003']
}
```

#### C. Memory Capsules
```javascript
{
  id: 'mem_001',
  title: 'Family Trip to Guwahati',
  category: 'Event' | 'Family' | 'Place' | 'Voice Memory' | 'Routine',
  description: 'Ananya and her family visiting Guwahati together.',
  relatedPeople: ['meera', 'rahul'],
  relatedPlace: 'Guwahati',
  image: 'emoji | image_url | video_url',
  verified: true,
  timestamp: '2024-09-13',
  tags: ['important', 'family'],
  metadata: {
    recallDifficulty: 'low' | 'medium' | 'high',
    interactionCount: 12,
    successRate: 0.85
  }
}
```

#### D. Living Memory Graph
```javascript
{
  nodes: [
    { id: 'ananya', label: 'Ananya', type: 'patient' },
    { id: 'meera', label: 'Meera', type: 'person', relation: 'Daughter' },
    { id: 'guwahati', label: 'Guwahati', type: 'place' },
    { id: 'routine', label: 'Morning Routine', type: 'routine' }
  ],
  links: [
    { source: 'ananya', target: 'meera', relation: 'DAUGHTER' },
    { source: 'ananya', target: 'guwahati', relation: 'LIVES_IN' },
    { source: 'ananya', target: 'routine', relation: 'FOLLOWS' }
  ]
}
```

#### E. Activity Log
```javascript
{
  sessionId: 'session_001',
  timestamp: '2024-09-13T09:30:00Z',
  userId: 'patient_001',
  activity: 'face_recognition_game',
  result: {
    memoryId: 'mem_001',
    personId: 'meera',
    attemptCount: 1,
    rescueStagesUsed: 0,
    successLevel: 'independent_recall',
    timestamp: '2024-09-13T09:30:45Z',
    duration: 45 // seconds
  }
}
```

---

## Component Hierarchy

### Patient Mode Flow
```
PatientHome
├── Welcome Greeting (large, warm)
├── Daily Encouragement Message
├── Activity Cards
│   ├── FaceRecognitionGame
│   ├── MorningRoutineGame
│   └── MedicineReminder
├── Bottom Navigation (5 sections)
│   ├── Home
│   ├── Play
│   ├── Memories
│   ├── Voice
│   └── Settings
└── Interactions
    ├── Face Recognition → Memory Rescue Flow
    ├── Morning Routine → Drag-and-drop ordering
    └── Reminders → Gentle completion feedback
```

### Caregiver Mode Flow
```
CaregiverHome
├── Greeting + Weekly Summary
├── Insight Cards
│   ├── Family Recognition Card (85%)
│   ├── Places Card (78%)
│   └── Morning Routine Card (45%)
├── Trend Chart (activity log visualization)
├── YAADRI Insight (AI-style brief)
├── Caregiver Copilot (Q&A interface)
└── Memory Contribution Tools
    └── Teach YAADRI About Me
```

---

## Key Features & Implementation

### 1. Face Recognition Game

**Flow**:
1. Display family photograph
2. Present multiple choice options
3. On correct selection: Show warm confirmation
4. On incorrect selection: Initiate Memory Rescue

**Implementation**:
```javascript
<FaceRecognitionGame>
  - Display image
  - Map family members to options
  - Track selection
  - Trigger appropriate flow
  - Log interaction data
</FaceRecognitionGame>
```

### 2. Memory Rescue System (5-Stage Progressive Support)

**Stage 1: Context Clue**
- Light hint about shared memories
- E.g., "You often spent Sunday evenings together"

**Stage 2: Relationship Clue**
- Reveal relationship strength
- E.g., "She is someone very close to you"

**Stage 3: Related Memory**
- Show related verified memory photograph
- E.g., Family trip image

**Stage 4: Familiar Voice**
- Play voice message from family member
- Show animated waveform
- E.g., "Hello Amma, it's me, Meera"

**Stage 5: Gentle Reveal**
- Show photograph with name
- Warm affirming message
- Path back to activity

**Key Rule**: NO HARD FAIL — Always a gentle path to success.

### 3. Morning Routine Game

**Interaction**: Drag-and-drop reordering (with tap fallback for mobile)

**Correct Order**:
1. Tea
2. Medicine
3. Breakfast

**Completion Feedback**:
- Warm congratulation
- Support level classification
- No scoring or competitive elements

**Support Levels**:
- Independent Recall (no help)
- Light Cue (1 hint used)
- Multiple Cues (several interactions)

### 4. Living Memory Graph

**Visual Structure**:
- Central node: Patient (Ananya)
- Outer nodes: Family, Places, Events, Routines
- Connections: Relationship lines (smooth SVG)
- Interaction: Click node for details panel

**Data Model** (Future Neo4j migration):
```cypher
(Ananya)-[:DAUGHTER]->(Meera)
(Ananya)-[:SON]->(Rahul)
(Ananya)-[:LIVES_IN]->(Guwahati)
(Ananya)-[:FOLLOWS]->(Morning_Routine)
(Ananya)-[:REMEMBERS]->(Family_Trip)
(Meera)-[:PARTICIPATED_IN]->(Family_Trip)
```

### 5. Memory Connection Map

**Purpose**: Visualize recall patterns without diagnosis language

**Display**:
```
Family Recognition:     ████████░  Strong
Places:                 ███████░░  Strong
Morning Routine:        ████░░░░░  Needs More Cues
```

**Language**: Pattern-based, not clinical
- ✅ "Family recognition remained strong"
- ❌ "Patient's dementia is worsening"

---

## Internationalization (i18n)

### Translation Structure
```javascript
translations = {
  en: { key: 'English text' },
  as: { key: 'অসমীয়া টেক্সট' }
}
```

### Usage
```javascript
t('goodMorning', lang, { name: 'Ananya' })
// Returns: "Good Morning, Ananya" or appropriate Assamese
```

### Supported Languages
- **English** (en) - Full implementation
- **Assamese** (as) - Core patient experience

### Future Expansion
- Hindi
- Bengali
- Tamil
- Telugu

---

## Visual Design System

### Color Palette (Warm, Accessible)

**Primary**
- Off-white/Cream: #FAF8F3
- Soft Sage Green: #A8D5BA
- Warm Peach: #F4A582
- Muted Coral: #E8756E

**Secondary**
- Subtle Lavender: #E8D5F2
- Sky Accent: #D6E8F7

**Semantic**
- Success: #34D399 (emerald)
- Caution: #F59E0B (amber)
- Information: #3B82F6 (blue)
- Gentle Reminder: #F87171 (soft red)

### Typography

**Font Family**: System fonts + Georgia (serif for headings)

**Scale**:
- H1 (Greeting): 32-40px, serif, bold
- H2 (Section): 24-28px, serif, medium
- H3 (Card Title): 18-20px, sans, medium
- Body: 16px, sans, regular
- Small: 12-14px, sans, regular

**Spacing**: 1.5-2.0 line height for readability

### Component Sizing

**Patient Mode Buttons**: 52-60px minimum height
**Card Border Radius**: 20-28px (warm, not sharp)
**Padding**: Generous (24-32px inner)
**Shadows**: Soft, subtle (rgba(0,0,0,0.08))

---

## State Management Pattern

### App-Level State
```javascript
const [screen, setScreen] = useState('splash')        // Current screen
const [mode, setMode] = useState(null)                // 'patient' | 'caregiver'
const [lang, setLang] = useState('en')                // Language setting
const [currentActivity, setCurrentActivity] = useState(null) // Active game
```

### Component-Level State
```javascript
// Game state (local to component)
const [selected, setSelected] = useState(null)        // User selection
const [showResult, setShowResult] = useState(false)   // Result display
const [rescueStage, setRescueStage] = useState(0)     // Memory Rescue progress
```

### Activity Tracking (Future: Supabase)
```javascript
const logActivity = async (activity) => {
  // Send to backend:
  // - Timestamp
  // - User ID
  // - Activity type
  // - Success/failure
  // - Duration
  // - Support level used
}
```

---

## Screen Flows

### Complete User Journey (Patient)

1. **Splash Screen** (2.5s)
   - YAADRI logo
   - Tagline animation
   - Floating memory cards concept

2. **Mode Selection**
   - Patient vs Caregiver choice
   - Large, tappable cards
   - Warm illustrations

3. **Patient Home**
   - Greeting: "Good Morning, Ananya"
   - Daily encouragement
   - 3 activity cards
   - Bottom navigation

4. **Activity Selection**
   - Face Recognition Game
   - Morning Routine Game
   - Gentle Reminders

5. **Activity Completion**
   - Success feedback (not scoring)
   - Support level display
   - Return to home

6. **Secondary Screens** (via bottom nav)
   - Memory Capsules Library
   - Voice Interaction
   - Living Memory Graph (optional)

---

## Accessibility Features

### For Elderly Users

✅ **Large text** (16-40px minimum)
✅ **High contrast** (WCAG AA minimum)
✅ **Large touch targets** (52-60px minimum)
✅ **Simple navigation** (5 main sections)
✅ **Warm, familiar language**
✅ **No aggressive red/negative feedback**
✅ **Slow animations** (respect prefers-reduced-motion)
✅ **No timers** (no cognitive pressure)
✅ **Clear visual hierarchy**
✅ **Emoji for quick recognition**

### For Caregivers

✅ **Dashboard overview**
✅ **Trend visualization**
✅ **Plain-language insights**
✅ **Activity export (future)**

---

## Demo Data Features

### Patient: Ananya Sharma
- Age: 72
- Location: Guwahati
- Preferred Language: English
- Languages: English, Assamese

### Family Members
- **Meera**: Daughter, 48, spends Sunday evenings, voice message
- **Rahul**: Son, 45, visits frequently, birthday memories

### Memory Capsules
1. **Family Trip to Guwahati** (Event)
   - Verified
   - Related people: Meera, Rahul
   - Category: Event

2. **Sunday Evening Together** (Family)
   - Verified
   - Related person: Meera
   - Category: Family

3. **Meera's Voice Message** (Voice)
   - Verified
   - Audio: "Hello Amma, it's me, Meera"
   - Category: Voice Memory

4. **Morning Routine** (Routine)
   - Verified
   - Sequence: Tea → Medicine → Breakfast
   - Category: Routine

### Activity Patterns (Weekly)
- Monday: Independent Recall (Family)
- Tuesday: Light Cue (Routine)
- Wednesday: Independent Recall (Family)
- Thursday: Multiple Cues (Routine)
- Friday: Independent Recall (Places)
- Saturday: Light Cue (Family)
- Sunday: Independent Recall (Family)

---

## Deployment & Scaling

### Phase 1: Prototype (Current)
- Client-side React app
- Hardcoded demo data
- Simulated voice/audio
- LocalStorage persistence

### Phase 2: MVP (4-6 weeks)
- Supabase backend (PostgreSQL)
- User authentication
- Real data persistence
- Caregiver invitation system

### Phase 3: Production (3-4 months)
- Neo4j for graph queries
- Real audio processing
- Speech recognition integration
- Analytics pipeline
- Multi-language support
- Mobile app (React Native)

### Infrastructure
```
Frontend (React)
    ↓
API Gateway (Supabase)
    ↓
PostgreSQL (User data, memories)
Neo4j (Memory graph)
Redis (Sessions, cache)
    ↓
S3 (Images, audio files)
```

---

## Testing Strategy

### Unit Tests
- Translation functions
- Data model validation
- State calculations

### Integration Tests
- Navigation flows
- Activity completion
- Memory Rescue progression

### E2E Tests
- Complete patient journey
- Caregiver workflows
- Language switching

### Accessibility Testing
- Screen reader compatibility
- Keyboard navigation
- Color contrast
- Touch target sizing

---

## Performance Optimization

### Current (Prototype)
- Component lazy loading ready
- SVG graph optimization
- Smooth CSS animations
- No large images (emoji-based)

### Future
- Code splitting by screen
- Image optimization
- Service Worker caching
- Analytics optimization

---

## Security & Privacy

### Data Handling
✅ All personal memories encrypted
✅ No external API calls (demo)
✅ Family member verification required
✅ Audit logging for access
✅ GDPR-compliant data deletion

### Authentication (Future)
- OAuth 2.0 for family
- Caregiver relationship verification
- Role-based access control

---

## File Structure (Future Production)

```
src/
├── components/
│   ├── PatientMode/
│   │   ├── PatientHome.jsx
│   │   ├── FaceRecognitionGame.jsx
│   │   ├── MorningRoutineGame.jsx
│   │   └── MemoryRescueFlow.jsx
│   ├── CaregiverMode/
│   │   ├── CaregiverHome.jsx
│   │   ├── InsightCards.jsx
│   │   └── CaregiverCopilot.jsx
│   ├── Common/
│   │   ├── LivingMemoryGraph.jsx
│   │   ├── MemoryConnectionMap.jsx
│   │   └── Navigation.jsx
│   └── Shell/
│       ├── SplashScreen.jsx
│       └── ModeSelection.jsx
├── hooks/
│   ├── useMemories.js
│   ├── useActivityLog.js
│   └── useTranslation.js
├── data/
│   ├── translations.js
│   ├── demoData.js
│   └── schema.js
├── utils/
│   ├── graphUtils.js
│   ├── dateUtils.js
│   └── formatters.js
├── styles/
│   ├── tailwind.config.js
│   └── globals.css
└── App.jsx
```

---

## Key Metrics & Analytics (Future)

### Patient Metrics
- Daily active usage
- Activity completion rate
- Memory recall success rate
- Support level progression
- Family recognition strength

### Caregiver Metrics
- Family invitation acceptance
- Insight card engagement
- Copilot query frequency
- Memory contribution rate

### System Metrics
- Error rates
- Performance (load time, FCP)
- Accessibility audit scores
- User satisfaction (NPS)

---

## Implementation Checklist

### MVP (Functional Complete)
- ✅ Mode selection (patient/caregiver)
- ✅ Patient home with activities
- ✅ Face recognition game
- ✅ Memory Rescue (5-stage flow)
- ✅ Morning routine game
- ✅ Caregiver insights
- ✅ i18n (English/Assamese)
- ✅ Responsive mobile design
- ⏳ Audio playback for voice messages
- ⏳ Living Memory Graph interactive

### Polish (High Fidelity)
- ⏳ Smooth animations
- ⏳ Haptic feedback (mobile)
- ⏳ Offline capability
- ⏳ Error handling UI
- ⏳ Loading states
- ⏳ Empty states

### Production Ready
- ⏳ Backend integration
- ⏳ Authentication
- ⏳ Data persistence
- ⏳ HIPAA compliance
- ⏳ Analytics pipeline
- ⏳ Admin dashboard

---

## Notes on Design Decisions

### Why No Red Failure States?
Red traditionally signals error/danger. Elderly users may find it stressful or confusing. YAADRI uses soft blues and greens for all feedback, with gentle language.

### Why No Timers?
Cognitive stress under time pressure can worsen recall. YAADRI is paced by the user, not the system.

### Why Emoji-Based Visuals?
- Quick visual recognition
- Accessible across cultures
- Lightweight loading
- Playful, non-clinical feel
- Works on all devices

### Why Living Memory Graph?
Shows relationships, not deficits. Family can see "who matters most" rather than "what was forgotten."

### Why Caregiver Mode is Separate?
Two different cognitive loads and interaction patterns. Caregivers need dashboards and trends; patients need simplicity and safety.

---

## Next Steps to Production

1. **Integrate Supabase** for data persistence
2. **Add real voice processing** (speech recognition)
3. **Build family invitation system**
4. **Implement Neo4j** for graph queries
5. **Add image upload** for personal photographs
6. **Mobile app** with React Native
7. **HIPAA audit** and compliance
8. **Launch beta** with 10-20 families
9. **Iterate based on feedback**
10. **Scale to production**

---

## Support & Maintenance

### Regular Updates
- Security patches
- Language expansion
- Feature enhancements
- Performance optimization

### User Support
- Caregiver help documentation
- Video tutorials
- Email support
- Community forum (future)

### Monitoring
- Error tracking
- Performance metrics
- User feedback
- Accessibility audits

---

This architecture provides a solid foundation for building YAADRI from the Replit prototype into a production-grade platform that genuinely supports elderly users and their families.
