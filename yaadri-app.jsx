import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, Mic, Home, Play, BookOpen, Volume2, 
  Menu, X, Zap, TrendingUp, Sparkles, Plus, Check, 
  ArrowUp, ArrowDown, RefreshCw, Send, HelpCircle,
  Clock, ShieldCheck, Heart, User, MapPin, Calendar, Award
} from 'lucide-react';

// ============================================================================
// TRANSLATIONS & INTERNATIONALIZATION
// ============================================================================

const translations = {
  en: {
    // Navigation & Mode
    modeSelection: "How would you like to continue?",
    patientMode: "Let's revisit something beautiful today.",
    caregiverMode: "Support and understand your loved one's memory journey.",
    continueAsPatient: "Continue as Patient",
    continuAsCaregiver: "Continue as Caregiver",
    switchMode: "Switch Mode",
    backToHome: "Back to Home",
    
    // Patient Home
    goodMorning: "Good Morning, {name}",
    revisitBeautiful: "Let's revisit something beautiful today.",
    dailyEncouragement: "Every memory is a journey. Let's take it one step at a time.",
    
    // Activities
    whoIsThis: "Who is this?",
    recognizeFace: "Recognize a familiar face.",
    myMorningRoutine: "My Morning Routine",
    letsPutMorning: "Let's put your morning in order.",
    gentleReminder: "Gentle Reminder",
    medicineTime: "Medicine Time",
    markAsDone: "Mark as Done",
    completed: "Completed",
    play: "Play",
    start: "Start",
    checkOrder: "Check My Order",
    
    // Face Recognition Game
    correct: "That's right! You remembered {name}.",
    correctSub: "She is your {relation}.",
    thatOkay: "That's okay.",
    letRememberTogether: "Let's remember together.",
    continue: "Continue",
    
    // Memory Rescue Stages
    aLittleClue: "A little clue",
    context: "You often spent Sunday evenings together.",
    iRemember: "I remember!",
    giveAnotherClue: "Give me another clue",
    
    aFamiliarConnection: "A familiar connection",
    closeToYou: "She is someone very close to you.",
    familyMember: "She is part of your immediate family.",
    anotherClue: "Another clue",
    
    aSharedMemory: "A shared memory",
    sharedSpecialTime: "You both shared this special time together in Guwahati.",
    
    listenFamiliarVoice: "Listen to a familiar voice",
    playVoiceMessage: "Play Voice Message",
    revealGently: "Reveal gently",
    
    gentleReveal: "This is {name}.",
    yourDaughter: "Your daughter",
    memoryNeedsPath: "Sometimes a memory just needs a gentle path back.",
    continueJourney: "Continue our Journey",
    
    // Morning Routine
    letRememberMorning: "Let's remember your morning",
    putMomentsOrder: "Put these moments in the order you usually enjoy them.",
    wonderful: "Wonderful!",
    rememberedMorning: "You remembered your morning routine perfectly.",
    moveUp: "Move Up",
    moveDown: "Move Down",
    
    independentRecall: "Independent Recall",
    lightCue: "Light Cue",
    multipleCues: "Multiple Cues",
    
    tea: "Tea",
    medicine: "Medicine",
    breakfast: "Breakfast",
    
    // Memory Connection Map
    yourMemoryConnections: "Your Memory Connections",
    peopleAndPlaces: "The people, places, and moments that make up your story.",
    daughter: "Daughter",
    son: "Son",
    home: "Home",
    familyTrip: "Family Trip",
    routine: "Routine",
    viewMemories: "View Memories",
    memoryCapsules: "Memory Capsules",
    allMemories: "All Memories",
    verified: "Verified",
    
    // Caregiver
    goodMorningCaregiver: "Good Morning, {name}",
    thisWeeksMemory: "Memory Journey & Analytics Dashboard",
    familyRecognition: "Family Recognition",
    familyRecognitionStrong: "STRONG",
    places: "Places & Environments",
    morningRoutine: "Morning Routine",
    strong: "STRONG",
    needsMoreCues: "Needs Gentle Cues",
    weekTrend: "Recall Trends",
    yaadriInsight: "YAADRI AI Insight",
    familyRecognitionRemained: "Family recognition remained strong this week. Morning routines benefit from occasional visual prompts.",
    basedOnActivity: "Based on real-time activity patterns across 7 days.",
    
    // Caregiver Tabs
    tabDashboard: "Dashboard",
    tabCapsules: "Memory Capsules",
    tabTeach: "Teach YAADRI",
    tabCopilot: "Caregiver Copilot",
    
    // Teach YAADRI
    teachTitle: "Teach YAADRI a New Memory",
    teachSubtitle: "Type a short family story. YAADRI will extract key entities and enrich the memory graph.",
    memoryInputPlaceholder: "e.g. Meera visited Amma in Guwahati last Sunday and they had morning tea together in the garden...",
    analyzeMemory: "Analyze Story with AI",
    extractedEntities: "Extracted Memory Entities",
    addToGraph: "Add to Memory Graph & Capsules",
    memoryAddedSuccess: "Memory successfully integrated into YAADRI!",
    
    // Copilot
    copilotTitle: "Caregiver AI Assistant",
    copilotSubtitle: "Ask questions about recent recall performance and personalized recommendations.",
    askPlaceholder: "Ask YAADRI a question...",
    send: "Send"
  },
  as: {
    // Navigation & Mode
    modeSelection: "আপুনি কেনেকৈ আগবাঢ়িব বিচাৰে?",
    patientMode: "আহক, আজি এটা সুন্দৰ স্মৃতি মনত পেলাওঁ।",
    caregiverMode: "আপোনাৰ প্ৰিয়জনৰ স্মৃতি যাত্ৰা বুজি লওক আৰু সহায় কৰক।",
    continueAsPatient: "ৰোগী হিচাপে আগবাঢ়ক",
    continuAsCaregiver: "যত্নশীল হিচাপে আগবাঢ়ক",
    switchMode: "মোড সলনি কৰক",
    backToHome: "মুখ্য পৃষ্ঠালৈ উভতি যাওক",
    
    // Patient Home
    goodMorning: "শুভ প্ৰভাত, {name}",
    revisitBeautiful: "আহক, আজি এটা সুন্দৰ স্মৃতি মনত পেলাওঁ।",
    dailyEncouragement: "প্ৰতিটো স্মৃতি একোটা যাত্ৰা। আমি খোজত খোজ মিলাই আগবাঢ়িম।",
    
    // Activities
    whoIsThis: "এই ব্যক্তিজন কোন?",
    recognizeFace: "চিনাকি মুখখন মনত পেলাওক।",
    myMorningRoutine: "মোৰ পুৱাৰ নিয়ম",
    letsPutMorning: "আপোনাৰ পুৱাৰ কামবোৰ শৃংখলাবদ্ধ কৰোঁ আহক।",
    gentleReminder: "সোঁৱৰণী",
    medicineTime: "ঔষধ খোৱাৰ সময়",
    markAsDone: "সম্পন্ন বুলি চিহ্নিত কৰক",
    completed: "সম্পন্ন হ'ল",
    play: "খেলক",
    start: "আৰম্ভ কৰক",
    checkOrder: "ক্ৰম পৰীক্ষা কৰক",
    
    // Face Recognition Game
    correct: "বাঃ! আপুনি {name}ক সঠিককৈ মনত পেলালে।",
    correctSub: "তেওঁ আপোনাৰ {relation}।",
    thatOkay: "একো কথা নাই।",
    letRememberTogether: "আমি একেলগে মনত পেলাওঁ আহক।",
    continue: "আগবাঢ়ক",
    
    // Memory Rescue Stages
    aLittleClue: "এটা সৰু সংকেত",
    context: "আপোনালোকে প্ৰায়ে দেওবাৰে সন্ধিয়া সময় কটাইছিল।",
    iRemember: "মই মনত পেলালোঁ!",
    giveAnotherClue: "আৰু এটা সংকেত দিয়ক",
    
    aFamiliarConnection: "এক আপোন সম্পৰ্ক",
    closeToYou: "তেওঁ আপোনাৰ অতি মৰমৰ আৰু আপোন।",
    familyMember: "তেওঁ আপোনাৰ নিকটতম পৰিয়ালৰ সদস্য।",
    anotherClue: "পৰৱৰ্তী সংকেত",
    
    aSharedMemory: "এক মধুৰ স্মৃতি",
    sharedSpecialTime: "আপোনালোকে গুৱাহাটীত একেলগে এই বিশেষ সময় কটাইছিল।",
    
    listenFamiliarVoice: "এটা চিনাকি মাত শুনক",
    playVoiceMessage: "কণ্ঠবাৰ্তা শুনক",
    revealGently: "পৰিচয় চাওক",
    
    gentleReveal: "এয়া হৈছে {name}।",
    yourDaughter: "আপোনাৰ জীয়ৰী",
    memoryNeedsPath: "কেতিয়াবা স্মৃতিক কেৱল এটি মৰমৰ বাটৰ প্ৰয়োজন হয়।",
    continueJourney: "যাত্ৰা অব্যাহত ৰাখক",
    
    // Morning Routine
    letRememberMorning: "পুৱাৰ নিয়মবোৰ মনত পেলাওঁ",
    putMomentsOrder: "পুৱাৰ কামবোৰ সঠিক ক্ৰমত সজাওক।",
    wonderful: "অপূৰ্ব!",
    rememberedMorning: "আপুনি পুৱাৰ নিয়মবোৰ সঠিকভাৱে সজালে।",
    moveUp: "ওপৰলৈ",
    moveDown: "তললৈ",
    
    tea: "চাহ",
    medicine: "ঔষধ",
    breakfast: "পুৱাৰ জলপান",
    
    // Memory Connection Map
    yourMemoryConnections: "আপোনাৰ স্মৃতিৰ সংযোগ",
    peopleAndPlaces: "আপোনাৰ জীৱনৰ আপোন মানুহ, ঠাই আৰু বিশেষ মুহূৰ্তসমূহ।",
    daughter: "জীয়ৰী",
    son: "পুত্ৰ",
    home: "ঘৰ",
    familyTrip: "পৰিয়ালৰ ভ্ৰমণ",
    routine: "নিয়মীয়া কাম",
    viewMemories: "স্মৃতিসমূহ চাওক",
    memoryCapsules: "স্মৃতিৰ টোপোলা",
    allMemories: "সকলো স্মৃতি",
    verified: "প্ৰমাণীকৃত",
    
    // Caregiver
    goodMorningCaregiver: "শুভ প্ৰভাত, {name}",
    thisWeeksMemory: "স্মৃতি বিশ্লেষণ আৰু ডেশ্ববৰ্ড",
    familyRecognition: "পৰিয়াল পৰিচয়",
    familyRecognitionStrong: "শক্তিশালী",
    places: "স্থান আৰু পৰিবেশ",
    morningRoutine: "দৈনন্দিন নিয়ম",
    strong: "শক্তিশালী",
    needsMoreCues: "সংকেতৰ প্ৰয়োজন",
    weekTrend: "স্মৃতিৰ ধাৰা",
    yaadriInsight: "YAADRI অন্তৰ্দৃষ্টি",
    familyRecognitionRemained: "এই সপ্তাহত পৰিয়াল চিনি পোৱাৰ ক্ষমতা সুদৃঢ় আছিল।",
    basedOnActivity: "বিগত ৭ দিনৰ তথ্যৰ ওপৰত ভিত্তি কৰি।",
    
    // Caregiver Tabs
    tabDashboard: "ডেশ্ববৰ্ড",
    tabCapsules: "স্মৃতি টোপোলা",
    tabTeach: "YAADRIক শিকাওক",
    tabCopilot: "সহায়ক AI",
    
    // Teach YAADRI
    teachTitle: "YAADRIক নতুন স্মৃতি শিকাওক",
    teachSubtitle: "এটা সৰু পাৰিবাৰিক কাহিনী লিখক। AI য়ে মূল তথ্যসমূহ সংযোগ কৰিব।",
    memoryInputPlaceholder: "যেনে: মীৰাই যোৱা দেওবাৰে গুৱাহাটীত আম্মাক লগ কৰিবলৈ আহিছিল...",
    analyzeMemory: "AI দ্বাৰা বিশ্লেষণ কৰক",
    extractedEntities: "চিহ্নিত স্মৃতি উপাদানসমূহ",
    addToGraph: "গ্ৰাফত অন্তৰ্ভুক্ত কৰক",
    memoryAddedSuccess: "স্মৃতি সফলতাৰে অন্তৰ্ভুক্ত হ'ল!",
    
    // Copilot
    copilotTitle: "যত্নশীল সহায়ক AI",
    copilotSubtitle: "ৰোগীৰ স্মৃতি যাত্ৰাৰ বিষয়ে প্ৰশ্ন সোধক।",
    askPlaceholder: "YAADRIক প্ৰশ্ন সোধক...",
    send: "প্ৰেৰণ কৰক"
  }
};

// ============================================================================
// INITIAL DATA MODELS
// ============================================================================

const INITIAL_DATA = {
  patient: {
    id: 'patient_001',
    name: 'Ananya',
    age: 72,
    location: 'Guwahati',
    language: 'en',
  },
  
  family: [
    {
      id: 'meera',
      name: 'Meera',
      relation: 'daughter',
      description: 'Your daughter',
      voiceMessage: "Hello Amma, it's me, Meera. I'm thinking of you and sending you so much love today.",
      image: '👩‍🦱',
      color: '#F4A582',
    },
    {
      id: 'rahul',
      name: 'Rahul',
      relation: 'son',
      description: 'Your son',
      voiceMessage: "Hello Ma, it's Rahul. Hope you had your tea this morning!",
      image: '👨‍🦲',
      color: '#A8D5BA',
    },
  ],
  
  memories: [
    {
      id: 'mem_001',
      title: 'Family Trip to Guwahati',
      category: 'Event',
      description: 'Ananya and her family visiting the Brahmaputra riverfront in Guwahati together.',
      relatedPeople: ['Meera', 'Rahul'],
      relatedPlace: 'Guwahati',
      verified: true,
      image: '🏞️',
      color: '#FFE8D6',
      date: 'Autumn 2023'
    },
    {
      id: 'mem_002',
      title: 'Sunday Evening Tea Together',
      category: 'Family',
      description: 'A quiet, peaceful evening having Assam tea on the veranda with Meera.',
      relatedPeople: ['Meera'],
      relatedPlace: 'Guwahati Home',
      verified: true,
      image: '🌅',
      color: '#FFF0E6',
      date: 'Weekly Routine'
    },
    {
      id: 'mem_003',
      title: "Meera's Heartfelt Voice Note",
      category: 'Voice Memory',
      description: "A warm audio message reminding Amma of their shared love for traditional music.",
      relatedPeople: ['Meera'],
      verified: true,
      image: '🎵',
      color: '#E8F5FF',
      date: 'Recent'
    },
    {
      id: 'mem_004',
      title: 'Morning Garden & Tea Routine',
      category: 'Routine',
      description: 'Waking up to fresh Assam tea, taking morning medicine, and enjoying breakfast.',
      routine: ['Tea', 'Medicine', 'Breakfast'],
      verified: true,
      image: '☕',
      color: '#FFF9E6',
      date: 'Daily'
    },
  ],
  
  graph: {
    nodes: [
      { id: 'ananya', label: 'Ananya\n(You)', type: 'patient', emoji: '👵' },
      { id: 'meera', label: 'Meera\n(Daughter)', type: 'person', relation: 'Daughter', emoji: '👩‍🦱' },
      { id: 'rahul', label: 'Rahul\n(Son)', type: 'person', relation: 'Son', emoji: '👨‍🦲' },
      { id: 'guwahati', label: 'Guwahati\n(Home)', type: 'place', emoji: '🏡' },
      { id: 'routine', label: 'Morning\nRoutine', type: 'routine', emoji: '☕' },
      { id: 'familytrip', label: 'Family\nTrip', type: 'event', emoji: '🏞️' },
    ],
    links: [
      { source: 'ananya', target: 'meera', relation: 'DAUGHTER' },
      { source: 'ananya', target: 'rahul', relation: 'SON' },
      { source: 'ananya', target: 'guwahati', relation: 'LIVES_IN' },
      { source: 'ananya', target: 'routine', relation: 'FOLLOWS' },
      { source: 'ananya', target: 'familytrip', relation: 'REMEMBERS' },
      { source: 'meera', target: 'familytrip', relation: 'PARTICIPATED' },
    ],
  },
  
  caregiver: {
    id: 'caregiver_001',
    name: 'Priya',
    relation: 'Daughter & Care Coordinator',
  },
  
  activityLog: [
    { date: 'Mon', activity: 'independentRecall', score: 90, category: 'family' },
    { date: 'Tue', activity: 'lightCue', score: 75, category: 'routine' },
    { date: 'Wed', activity: 'independentRecall', score: 95, category: 'family' },
    { date: 'Thu', activity: 'multipleCues', score: 60, category: 'routine' },
    { date: 'Fri', activity: 'independentRecall', score: 85, category: 'places' },
    { date: 'Sat', activity: 'lightCue', score: 70, category: 'family' },
    { date: 'Sun', activity: 'independentRecall', score: 90, category: 'family' },
  ],
};

// ============================================================================
// AUDIO HELPER (Web Audio API + Speech Synthesis)
// ============================================================================

const playAudioTone = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.3); // E5
    osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.6); // G5
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.2);
  } catch (e) {
    console.log("Audio not supported", e);
  }
};

const speakMessage = (text) => {
  try {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    }
  } catch (e) {
    console.log("Speech synthesis not available", e);
  }
};

// ============================================================================
// HELPER: Translation Function
// ============================================================================

const t = (key, lang = 'en', replacements = {}) => {
  let text = translations[lang]?.[key] || translations.en[key] || key;
  Object.entries(replacements).forEach(([k, v]) => {
    text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
  });
  return text;
};

// ============================================================================
// COMPONENT: Splash Screen
// ============================================================================

const SplashScreen = ({ onContinue }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onContinue) onContinue();
    }, 2400);
    return () => clearTimeout(timer);
  }, [onContinue]);
  
  return (
    <div 
      onClick={() => onContinue && onContinue()}
      className="fixed inset-0 bg-gradient-to-br from-amber-50 via-rose-50 to-amber-50 flex flex-col items-center justify-center z-50 cursor-pointer select-none p-6"
    >
      <div className="text-center space-y-6 max-w-sm mx-auto">
        <div className="text-7xl mb-2 animate-bounce">🌿</div>
        <h1 className="text-5xl font-serif font-bold text-amber-950 tracking-tight">YAADRI</h1>
        <p className="text-xl text-amber-800 font-medium">Your Personal AI Memory Companion</p>
        <p className="text-sm text-amber-700/80 leading-relaxed">
          Gently connecting you to the cherished people, places, and moments of your life.
        </p>
        
        <div className="flex gap-2 justify-center pt-6">
          <div className="w-3 h-3 bg-rose-400 rounded-full animate-ping"></div>
          <div className="w-3 h-3 bg-amber-400 rounded-full animate-ping" style={{ animationDelay: '200ms' }}></div>
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping" style={{ animationDelay: '400ms' }}></div>
        </div>
        <p className="text-xs text-amber-600/70 pt-6">Tap anywhere to begin</p>
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT: Mode Selection
// ============================================================================

const ModeSelection = ({ onSelectMode, lang }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/70 via-rose-50/40 to-amber-50/70 p-6 flex flex-col justify-center items-center">
      <div className="max-w-xl w-full space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 bg-white rounded-2xl shadow-sm border border-rose-100 mb-1">
            <span className="text-4xl">🌿</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-amber-950">{t('modeSelection', lang)}</h1>
          <p className="text-amber-800 text-lg">Choose your personalized experience</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Patient Mode Card */}
          <button
            onClick={() => onSelectMode('patient')}
            className="group w-full bg-white border-2 border-amber-100 hover:border-rose-300 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 text-left flex items-start gap-6 relative overflow-hidden"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center text-4xl flex-shrink-0 group-hover:scale-110 transition-transform">
              👵
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-serif font-bold text-amber-950">Patient Mode</h2>
                <span className="bg-rose-50 text-rose-700 text-xs font-semibold px-3 py-1 rounded-full border border-rose-200">
                  Calm & Gentle
                </span>
              </div>
              <p className="text-amber-800/90 text-base leading-relaxed">{t('patientMode', lang)}</p>
              <div className="pt-2 flex items-center gap-2 text-rose-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                {t('continueAsPatient', lang)} <ChevronRight size={18} />
              </div>
            </div>
          </button>
          
          {/* Caregiver Mode Card */}
          <button
            onClick={() => onSelectMode('caregiver')}
            className="group w-full bg-white border-2 border-emerald-100 hover:border-emerald-300 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 text-left flex items-start gap-6 relative overflow-hidden"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-4xl flex-shrink-0 group-hover:scale-110 transition-transform">
              👨‍👩‍👧
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-serif font-bold text-emerald-950">Caregiver Mode</h2>
                <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200">
                  Insights & Tools
                </span>
              </div>
              <p className="text-emerald-900/90 text-base leading-relaxed">{t('caregiverMode', lang)}</p>
              <div className="pt-2 flex items-center gap-2 text-emerald-700 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                {t('continuAsCaregiver', lang)} <ChevronRight size={18} />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT: Memory Rescue Flow (5-Step Progressive Ladder)
// ============================================================================

const MemoryRescueFlow = ({ memory, onComplete, onBack, lang }) => {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  
  const stages = [
    {
      title: t('aLittleClue', lang),
      content: t('context', lang),
      options: [t('iRemember', lang), t('giveAnotherClue', lang)],
    },
    {
      title: t('aFamiliarConnection', lang),
      content: t('closeToYou', lang),
      subContent: t('familyMember', lang),
      options: [t('iRemember', lang), t('anotherClue', lang)],
    },
    {
      title: t('aSharedMemory', lang),
      content: t('sharedSpecialTime', lang),
      options: [t('iRemember', lang), t('anotherClue', lang)],
    },
    {
      title: t('listenFamiliarVoice', lang),
      isAudio: true,
      voiceText: "Hello Amma, it's me, Meera. I'm thinking of you and sending you so much love today!",
      options: [t('iRemember', lang), t('revealGently', lang)],
    },
    {
      title: t('gentleReveal', lang, { name: 'Meera' }),
      isReveal: true,
      content: t('gentleReveal', lang, { name: 'Meera' }),
      subContent: t('yourDaughter', lang),
      footer: t('memoryNeedsPath', lang),
      button: t('continueJourney', lang),
    },
  ];
  
  const currentStage = stages[stage];
  const isLastStage = stage === stages.length - 1;
  
  const handlePlayVoice = () => {
    setPlaying(true);
    playAudioTone();
    if (currentStage.voiceText) {
      speakMessage(currentStage.voiceText);
    }
    setTimeout(() => setPlaying(false), 5000);
  };
  
  const handleNext = (rememberNow = true) => {
    if (rememberNow || stage === stages.length - 1) {
      if (!isLastStage) {
        setStage(stages.length - 1);
      } else {
        onComplete();
      }
    } else {
      setStage(stage + 1);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-blue-50/70 p-6 flex flex-col justify-between max-w-2xl mx-auto w-full">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="text-sm font-medium text-blue-800 bg-white/80 hover:bg-white px-4 py-2 rounded-xl shadow-sm border border-blue-100 transition-all flex items-center gap-1.5"
          >
            ← {t('backToHome', lang)}
          </button>
          <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
            Stage {stage + 1} of {stages.length}
          </span>
        </div>

        {/* Progress Dots */}
        <div className="flex gap-2 mb-8">
          {stages.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full transition-all duration-500 ${
                i <= stage ? 'bg-emerald-500 shadow-sm' : 'bg-blue-200/60'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Main Content Card */}
      <div className="my-auto space-y-6 text-center">
        <h2 className="text-3xl font-serif font-bold text-blue-950">{currentStage.title}</h2>
        
        {currentStage.isAudio ? (
          <div className="bg-white rounded-3xl p-8 shadow-md border border-blue-100 space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-blue-50 flex items-center justify-center text-4xl">
              🎙️
            </div>
            <p className="text-blue-900 font-medium text-lg">
              A voice note from Meera is ready to play.
            </p>
            <button
              onClick={handlePlayVoice}
              className={`mx-auto flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all shadow-md ${
                playing 
                  ? 'bg-emerald-600 text-white animate-pulse' 
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white hover:shadow-lg'
              }`}
            >
              <Volume2 size={24} className={playing ? 'animate-bounce' : ''} />
              {playing ? "Playing Voice Message..." : t('playVoiceMessage', lang)}
            </button>
            {playing && (
              <div className="flex gap-1.5 justify-center items-end h-10 pt-2">
                {[40, 65, 30, 80, 50, 95, 45, 70, 35, 60].map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-emerald-500 rounded-full animate-pulse"
                    style={{ height: `${h}%`, animationDuration: `${0.6 + (i % 3) * 0.2}s` }}
                  />
                ))}
              </div>
            )}
          </div>
        ) : currentStage.isReveal ? (
          <div className="bg-white rounded-3xl p-8 shadow-md border border-rose-100 space-y-6 animate-fade-in">
            <div className="text-7xl animate-bounce">👩‍🦱</div>
            <div className="space-y-2">
              <p className="text-3xl font-serif font-bold text-amber-950">{currentStage.content}</p>
              <p className="text-xl text-emerald-700 font-semibold">{currentStage.subContent}</p>
            </div>
            <p className="text-base text-amber-900/80 italic max-w-md mx-auto">{currentStage.footer}</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 shadow-md border border-blue-100 space-y-4">
            <div className="text-5xl mb-2">💡</div>
            <p className="text-2xl text-blue-950 font-serif font-medium leading-relaxed">{currentStage.content}</p>
            {currentStage.subContent && (
              <p className="text-lg text-blue-800 font-medium">{currentStage.subContent}</p>
            )}
          </div>
        )}
      </div>
      
      {/* Bottom Action Options */}
      <div className="pt-6">
        {!isLastStage ? (
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => handleNext(true)}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 rounded-2xl text-lg shadow-md hover:shadow-lg transition-all"
            >
              {currentStage.options[0]}
            </button>
            <button
              onClick={() => handleNext(false)}
              className="flex-1 bg-white hover:bg-blue-50 text-blue-900 border border-blue-200 font-semibold py-4 rounded-2xl text-lg shadow-sm transition-all"
            >
              {currentStage.options[1]}
            </button>
          </div>
        ) : (
          <button
            onClick={() => onComplete()}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all"
          >
            {currentStage.button}
          </button>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT: Face Recognition Game
// ============================================================================

const FaceRecognitionGame = ({ onComplete, onBack, lang }) => {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [startRescue, setStartRescue] = useState(false);
  
  const options = ['Meera', 'Priya', 'Anjali'];
  const correctAnswer = 'Meera';
  
  const handleSelect = (option) => {
    setSelected(option);
    const correct = option === correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) {
      playAudioTone();
    }
  };
  
  if (startRescue) {
    return (
      <MemoryRescueFlow 
        memory={{ name: 'Meera', relation: 'daughter' }} 
        onComplete={onComplete} 
        onBack={onBack}
        lang={lang}
      />
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/70 via-rose-50/40 to-amber-50/70 p-6 flex flex-col justify-between max-w-2xl mx-auto w-full">
      <div>
        <button
          onClick={onBack}
          className="text-sm font-medium text-amber-900 bg-white hover:bg-amber-50 px-4 py-2 rounded-xl shadow-sm border border-amber-200 transition-all mb-4 flex items-center gap-1.5"
        >
          ← {t('backToHome', lang)}
        </button>
        <h1 className="text-3xl font-serif font-bold text-amber-950 text-center mb-1">
          {t('whoIsThis', lang)}
        </h1>
        <p className="text-center text-amber-800 text-base">{t('recognizeFace', lang)}</p>
      </div>
      
      {!showResult ? (
        <div className="space-y-6 my-auto">
          {/* Photo Card */}
          <div className="bg-white rounded-3xl shadow-lg border-2 border-rose-100 p-8 max-w-xs mx-auto aspect-square flex flex-col items-center justify-center space-y-4">
            <div className="text-8xl select-none animate-pulse">👩‍🦱</div>
            <span className="text-xs font-semibold px-3 py-1 bg-rose-50 text-rose-700 rounded-full border border-rose-200">
              Family Member
            </span>
          </div>
          
          {/* Multiple Choice Options */}
          <div className="space-y-3 max-w-md mx-auto">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className="w-full bg-white hover:bg-rose-50 border-2 border-rose-100 hover:border-rose-300 rounded-2xl p-5 text-2xl font-serif font-medium text-amber-950 shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : isCorrect ? (
        <div className="text-center space-y-6 my-auto">
          <div className="text-7xl animate-bounce">✨</div>
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-emerald-100 space-y-3 max-w-md mx-auto">
            <p className="text-3xl font-serif font-bold text-emerald-700">
              {t('correct', lang, { name: 'Meera' })}
            </p>
            <p className="text-lg text-emerald-800 font-medium">
              {t('correctSub', lang, { relation: 'daughter' })}
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-semibold border border-emerald-200 mt-2">
              <Award size={14} /> Independent Recall Logged
            </div>
          </div>
          <button
            onClick={onComplete}
            className="w-full max-w-md mx-auto bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all"
          >
            {t('continue', lang)}
          </button>
        </div>
      ) : (
        <div className="text-center space-y-6 my-auto">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100 space-y-3 max-w-md mx-auto">
            <div className="text-5xl mb-2">🤝</div>
            <p className="text-2xl text-blue-950 font-serif font-bold">{t('thatOkay', lang)}</p>
            <p className="text-base text-blue-800">{t('letRememberTogether', lang)}</p>
          </div>
          <button
            onClick={() => setStartRescue(true)}
            className="w-full max-w-md mx-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all"
          >
            {t('continue', lang)}
          </button>
        </div>
      )}
      
      <div className="text-center text-xs text-amber-700/60 pt-4">
        Every step is an accomplishment. No pressure.
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT: Morning Routine Game (Touch + Drag & Drop Reordering)
// ============================================================================

const MorningRoutineGame = ({ onComplete, onBack, lang }) => {
  const [items, setItems] = useState([
    { id: 'item_1', name: t('tea', lang), emoji: '☕', correctPos: 0 },
    { id: 'item_3', name: t('breakfast', lang), emoji: '🥞', correctPos: 2 },
    { id: 'item_2', name: t('medicine', lang), emoji: '💊', correctPos: 1 },
  ]);
  const [completed, setCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Verify correct order: Tea -> Medicine -> Breakfast
  const isOrderCorrect = items[0].name === t('tea', lang) && 
                         items[1].name === t('medicine', lang) && 
                         items[2].name === t('breakfast', lang);
  
  const moveItem = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[newIndex];
    newItems[newIndex] = temp;
    setItems(newItems);
    setShowFeedback(false);
  };
  
  const handleCheck = () => {
    if (isOrderCorrect) {
      playAudioTone();
      setCompleted(true);
    } else {
      setShowFeedback(true);
    }
  };
  
  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50/80 to-teal-50/80 p-6 flex flex-col justify-center items-center">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="text-7xl animate-bounce">🎉</div>
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-emerald-100 space-y-3">
            <p className="text-3xl font-serif font-bold text-emerald-950">{t('wonderful', lang)}</p>
            <p className="text-emerald-800 text-lg leading-relaxed">{t('rememberedMorning', lang)}</p>
            
            <div className="pt-4">
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
                <p className="text-xs text-emerald-800 font-semibold uppercase tracking-wider mb-1">Support Level Logged:</p>
                <p className="text-xl font-serif font-bold text-emerald-700">{t('independentRecall', lang)}</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={onComplete}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all"
          >
            {t('continue', lang)}
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/70 via-rose-50/40 to-amber-50/70 p-6 flex flex-col justify-between max-w-2xl mx-auto w-full">
      <div>
        <button
          onClick={onBack}
          className="text-sm font-medium text-amber-900 bg-white hover:bg-amber-50 px-4 py-2 rounded-xl shadow-sm border border-amber-200 transition-all mb-4 flex items-center gap-1.5"
        >
          ← {t('backToHome', lang)}
        </button>
        <h1 className="text-3xl font-serif font-bold text-amber-950 text-center mb-1">
          {t('letRememberMorning', lang)}
        </h1>
        <p className="text-center text-amber-800 text-base">{t('putMomentsOrder', lang)}</p>
      </div>
      
      {/* Interactive Items List */}
      <div className="space-y-4 my-auto max-w-lg mx-auto w-full">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="bg-white border-2 border-amber-200 hover:border-amber-400 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-3xl flex-shrink-0">
              {item.emoji}
            </div>
            
            <div className="flex-1">
              <span className="text-2xl font-serif font-medium text-amber-950 block">{item.name}</span>
              <span className="text-xs text-amber-700 font-semibold">Step {index + 1}</span>
            </div>
            
            {/* Reorder Arrows for Mobile Touch Access */}
            <div className="flex flex-col gap-1">
              <button
                onClick={() => moveItem(index, -1)}
                disabled={index === 0}
                className={`p-2 rounded-xl border transition-all ${
                  index === 0 
                    ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed' 
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border-amber-200 active:scale-95'
                }`}
                title={t('moveUp', lang)}
              >
                <ArrowUp size={16} />
              </button>
              <button
                onClick={() => moveItem(index, 1)}
                disabled={index === items.length - 1}
                className={`p-2 rounded-xl border transition-all ${
                  index === items.length - 1 
                    ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed' 
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border-amber-200 active:scale-95'
                }`}
                title={t('moveDown', lang)}
              >
                <ArrowDown size={16} />
              </button>
            </div>
          </div>
        ))}

        {showFeedback && !isOrderCorrect && (
          <div className="p-4 bg-amber-100/70 border border-amber-300 rounded-2xl text-amber-900 text-sm text-center">
            💡 Hint: Try starting with a warm cup of Tea first, followed by Medicine!
          </div>
        )}
      </div>
      
      {/* Check Order Button */}
      <div className="pt-6">
        <button
          onClick={handleCheck}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 rounded-2xl text-lg shadow-md hover:shadow-lg transition-all"
        >
          {t('checkOrder', lang)}
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT: Living Memory Graph (Interactive SVG Network)
// ============================================================================

const LivingMemoryGraph = ({ graphData, lang, onBack }) => {
  const [selectedNode, setSelectedNode] = useState(graphData.nodes[1]); // Meera default
  const [nodePositions, setNodePositions] = useState({});
  
  useEffect(() => {
    const positions = {};
    const count = graphData.nodes.length;
    graphData.nodes.forEach((node, index) => {
      if (index === 0) {
        // Patient node in center
        positions[node.id] = { x: 200, y: 200 };
      } else {
        const angle = ((index - 1) / (count - 1)) * Math.PI * 2 - Math.PI / 2;
        const radius = 130;
        positions[node.id] = {
          x: Math.cos(angle) * radius + 200,
          y: Math.sin(angle) * radius + 200,
        };
      }
    });
    setNodePositions(positions);
  }, [graphData]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/80 via-slate-50 to-blue-50/80 p-6 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-sm font-medium text-blue-900 bg-white hover:bg-blue-50 px-4 py-2 rounded-xl shadow-sm border border-blue-200 transition-all flex items-center gap-1.5"
          >
            ← {t('backToHome', lang)}
          </button>
          <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
            Interactive Network
          </span>
        </div>
        
        <div>
          <h1 className="text-3xl font-serif font-bold text-blue-950 mb-1">
            {t('yourMemoryConnections', lang)}
          </h1>
          <p className="text-blue-800 text-base">{t('peopleAndPlaces', lang)}</p>
        </div>
        
        {/* SVG Graph View */}
        <div className="bg-white rounded-3xl shadow-lg border border-blue-100 p-6 relative overflow-hidden">
          <div className="text-xs text-blue-700/80 font-medium mb-3 flex items-center justify-between">
            <span>Tap any node to view connected memories</span>
            <span className="hidden sm:inline">● Center: You</span>
          </div>
          
          <svg width="100%" height="380" viewBox="0 0 400 400" className="w-full max-w-lg mx-auto select-none">
            {/* Connection Links */}
            {graphData.links.map((link, i) => {
              const source = nodePositions[link.source];
              const target = nodePositions[link.target];
              if (!source || !target) return null;
              return (
                <g key={i}>
                  <line
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    stroke="#94A3B8"
                    strokeWidth="2.5"
                    strokeDasharray="4,4"
                  />
                </g>
              );
            })}
            
            {/* Graph Nodes */}
            {graphData.nodes.map((node) => {
              const pos = nodePositions[node.id];
              if (!pos) return null;
              
              const isSelected = selectedNode?.id === node.id;
              const colorMap = {
                patient: '#FBBF24',
                person: '#FB7185',
                place: '#60A5FA',
                routine: '#34D399',
                event: '#A78BFA',
              };
              
              return (
                <g 
                  key={node.id} 
                  className="cursor-pointer transition-transform hover:scale-105"
                  onClick={() => setSelectedNode(node)}
                >
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={node.type === 'patient' ? "38" : "32"}
                    fill={colorMap[node.type] || '#60A5FA'}
                    stroke={isSelected ? "#1E293B" : "#FFFFFF"}
                    strokeWidth={isSelected ? "4" : "2.5"}
                    className="transition-all shadow-md"
                  />
                  <text
                    x={pos.x}
                    y={pos.y - 4}
                    textAnchor="middle"
                    className="text-xl pointer-events-none select-none"
                  >
                    {node.emoji || '📌'}
                  </text>
                  <text
                    x={pos.x}
                    y={pos.y + 14}
                    textAnchor="middle"
                    className="text-[10px] font-bold fill-slate-900 pointer-events-none select-none"
                  >
                    {node.label.split('\n')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        
        {/* Selected Node Details Card */}
        {selectedNode && (
          <div className="bg-white rounded-3xl p-6 shadow-md border border-blue-100 space-y-4 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-3xl">
                {selectedNode.emoji || '📌'}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-serif font-bold text-slate-900">
                    {selectedNode.label.replace('\n', ' ')}
                  </h3>
                  <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
                    ✓ {t('verified', lang)}
                  </span>
                </div>
                <p className="text-sm text-slate-600 font-medium capitalize">
                  Category: {selectedNode.type} {selectedNode.relation ? `(${selectedNode.relation})` : ''}
                </p>
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Associated Memory Highlights:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Connected with family milestones and warm interactions in Guwahati.</li>
                <li>Frequently reinforced during morning and weekly recall journeys.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT: Memory Capsules Gallery (Patient & Caregiver View)
// ============================================================================

const MemoryCapsulesGallery = ({ memories, onBack, lang }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Family', 'Event', 'Routine', 'Voice Memory'];
  
  const filteredMemories = filter === 'All' 
    ? memories 
    : memories.filter(m => m.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/70 via-rose-50/40 to-amber-50/70 p-6 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-sm font-medium text-amber-900 bg-white hover:bg-amber-50 px-4 py-2 rounded-xl shadow-sm border border-amber-200 transition-all flex items-center gap-1.5"
          >
            ← {t('backToHome', lang)}
          </button>
          <span className="text-xs font-semibold px-3 py-1 bg-amber-100 text-amber-800 rounded-full">
            {memories.length} Memories Saved
          </span>
        </div>
        
        <div>
          <h1 className="text-3xl font-serif font-bold text-amber-950 mb-1">{t('memoryCapsules', lang)}</h1>
          <p className="text-amber-800 text-base">Cherished milestones, voice notes, and familiar routines.</p>
        </div>
        
        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                filter === cat
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-white text-amber-900 border border-amber-200 hover:bg-rose-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/* Capsules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMemories.map((mem) => (
            <div
              key={mem.id}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md border border-amber-100 space-y-4 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-3xl">
                  {mem.image}
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full flex items-center gap-1">
                  ✓ {t('verified', lang)}
                </span>
              </div>
              
              <div>
                <h3 className="text-xl font-serif font-bold text-amber-950">{mem.title}</h3>
                <span className="text-xs font-medium text-rose-600 uppercase tracking-wider">{mem.category}</span>
                <p className="text-sm text-amber-900/80 mt-2 leading-relaxed">{mem.description}</p>
              </div>
              
              {mem.relatedPeople && (
                <div className="pt-2 border-t border-amber-50 flex items-center justify-between text-xs text-amber-700 font-medium">
                  <span>People: {mem.relatedPeople.join(', ')}</span>
                  <span>{mem.date || 'Saved'}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT: Patient Home Screen
// ============================================================================

const PatientHome = ({ onActivityStart, onSwitchMode, lang }) => {
  const [reminderDone, setReminderDone] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/80 via-rose-50/40 to-amber-50/80 pb-28">
      {/* Header */}
      <div className="bg-white border-b border-rose-100 p-6 relative shadow-sm">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <button
            onClick={onSwitchMode}
            className="text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1"
          >
            🔄 {t('switchMode', lang)}
          </button>
          <div className="text-right">
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              ● Active Companion
            </span>
          </div>
        </div>
        
        <div className="max-w-xl mx-auto text-center mt-4 space-y-1">
          <h1 className="text-4xl font-serif font-bold text-amber-950">
            {t('goodMorning', lang, { name: INITIAL_DATA.patient.name })}
          </h1>
          <p className="text-amber-800 text-base">{t('revisitBeautiful', lang)}</p>
        </div>
      </div>
      
      {/* Main Body */}
      <div className="max-w-xl mx-auto p-6 space-y-5">
        {/* Daily Encouragement Banner */}
        <div className="bg-gradient-to-r from-rose-50 to-amber-50 border-l-4 border-rose-400 rounded-2xl p-5 shadow-sm">
          <p className="text-amber-950 italic font-serif text-base leading-relaxed">
            "{t('dailyEncouragement', lang)}"
          </p>
        </div>
        
        {/* Activities List */}
        <div className="space-y-4">
          {/* Activity 1: Face-Name Recognition */}
          <button
            onClick={() => onActivityStart('face-recognition')}
            className="group w-full bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-rose-100 transition-all text-left flex items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Memory Game</span>
              <h3 className="text-2xl font-serif font-bold text-amber-950">{t('whoIsThis', lang)}</h3>
              <p className="text-amber-800 text-sm">{t('recognizeFace', lang)}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-4xl group-hover:scale-110 transition-transform">👩‍🦱</span>
              <span className="bg-rose-500 group-hover:bg-rose-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-sm transition-colors">
                {t('play', lang)}
              </span>
            </div>
          </button>
          
          {/* Activity 2: Morning Routine Sequencer */}
          <button
            onClick={() => onActivityStart('morning-routine')}
            className="group w-full bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-amber-100 transition-all text-left flex items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Daily Routine</span>
              <h3 className="text-2xl font-serif font-bold text-amber-950">{t('myMorningRoutine', lang)}</h3>
              <p className="text-amber-800 text-sm">{t('letsPutMorning', lang)}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-4xl group-hover:scale-110 transition-transform">☕</span>
              <span className="bg-amber-500 group-hover:bg-amber-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-sm transition-colors">
                {t('start', lang)}
              </span>
            </div>
          </button>

          {/* Activity 3: Living Memory Graph */}
          <button
            onClick={() => onActivityStart('memory-graph')}
            className="group w-full bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-blue-100 transition-all text-left flex items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Memory Connections</span>
              <h3 className="text-2xl font-serif font-bold text-slate-900">{t('yourMemoryConnections', lang)}</h3>
              <p className="text-blue-800 text-sm">{t('peopleAndPlaces', lang)}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-4xl group-hover:scale-110 transition-transform">🕸️</span>
              <span className="bg-blue-600 group-hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-sm transition-colors">
                {t('viewMemories', lang)}
              </span>
            </div>
          </button>
          
          {/* Activity 4: Medication Reminder Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{t('gentleReminder', lang)}</span>
                <h3 className="text-2xl font-serif font-bold text-amber-950">{t('medicineTime', lang)}</h3>
              </div>
              <div className="text-3xl font-serif font-bold text-amber-950">9:00 AM</div>
            </div>
            
            <button 
              onClick={() => {
                setReminderDone(!reminderDone);
                if (!reminderDone) playAudioTone();
              }}
              className={`w-full py-4 rounded-2xl font-semibold text-base transition-all flex items-center justify-center gap-2 shadow-sm ${
                reminderDone 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white hover:shadow-md'
              }`}
            >
              {reminderDone ? <><Check size={20} /> {t('completed', lang)}</> : t('markAsDone', lang)}
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom Sticky Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-amber-100 flex justify-around py-3.5 z-40 max-w-xl mx-auto shadow-lg">
        <button onClick={() => onActivityStart('home')} className="flex flex-col items-center gap-1 text-rose-600 font-semibold">
          <Home size={22} />
          <span className="text-[11px]">Home</span>
        </button>
        <button onClick={() => onActivityStart('face-recognition')} className="flex flex-col items-center gap-1 text-amber-700 hover:text-rose-600 transition-colors">
          <Play size={22} />
          <span className="text-[11px]">{t('play', lang)}</span>
        </button>
        <button onClick={() => onActivityStart('memory-capsules')} className="flex flex-col items-center gap-1 text-amber-700 hover:text-rose-600 transition-colors">
          <BookOpen size={22} />
          <span className="text-[11px]">Capsules</span>
        </button>
        <button onClick={() => onActivityStart('memory-graph')} className="flex flex-col items-center gap-1 text-amber-700 hover:text-rose-600 transition-colors">
          <Sparkles size={22} />
          <span className="text-[11px]">Graph</span>
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT: Caregiver Dashboard & Suite
// ============================================================================

const CaregiverHome = ({ 
  memories, 
  onAddMemory, 
  graphData, 
  onAddNode,
  onActivityStart, 
  onSwitchMode, 
  lang 
}) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeframe, setTimeframe] = useState('7d');
  
  // Teach YAADRI state
  const [memoryInput, setMemoryInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [extractedResult, setExtractedResult] = useState(null);
  const [teachSuccess, setTeachSuccess] = useState(false);
  
  // Caregiver Copilot Chat state
  const [copilotMessages, setCopilotMessages] = useState([
    { role: 'assistant', text: "Hello Priya! I'm your YAADRI Caregiver Copilot. I'm actively analyzing Ananya's daily recall sessions. How can I help you today?" }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Handle AI memory analysis simulation
  const handleAnalyzeMemory = () => {
    if (!memoryInput.trim()) return;
    setIsAnalyzing(true);
    setTeachSuccess(false);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setExtractedResult({
        person: 'Meera (Daughter)',
        place: 'Guwahati Garden',
        routine: 'Morning Assam Tea',
        event: 'Weekend Garden Visit',
        confidence: 0.94
      });
    }, 1200);
  };

  const handleSaveToGraph = () => {
    if (!extractedResult) return;
    
    // Add memory capsule
    const newMemory = {
      id: `mem_${Date.now()}`,
      title: 'Garden Tea with Meera',
      category: 'Family',
      description: memoryInput,
      relatedPeople: ['Meera'],
      relatedPlace: 'Guwahati Garden',
      verified: true,
      image: '🌸',
      date: 'Just added'
    };
    onAddMemory(newMemory);
    
    // Add graph node
    onAddNode({
      id: `node_${Date.now()}`,
      label: 'Garden Tea\n(Visit)',
      type: 'event',
      emoji: '🌸'
    });
    
    setTeachSuccess(true);
    setMemoryInput('');
    setExtractedResult(null);
  };

  const handleSendChat = (presetText) => {
    const textToSend = presetText || chatInput;
    if (!textToSend.trim()) return;
    
    const newMsgs = [...copilotMessages, { role: 'user', text: textToSend }];
    setCopilotMessages(newMsgs);
    if (!presetText) setChatInput('');
    
    setTimeout(() => {
      let reply = "Family recognition remained strong at 85% this week. Ananya easily recognized Meera independently. Morning routine recall benefited from occasional visual cues.";
      if (textToSend.toLowerCase().includes('routine')) {
        reply = "Ananya's routine recall is at 45% independent completion. She does best when starting with Tea, followed by gentle prompts for medication.";
      } else if (textToSend.toLowerCase().includes('meera') || textToSend.toLowerCase().includes('family')) {
        reply = "Family connections with Meera and Rahul are currently her strongest cognitive anchor, with a 90%+ success rate in face and voice recognition!";
      }
      setCopilotMessages(prev => [...prev, { role: 'assistant', text: reply }]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/80 via-teal-50/40 to-emerald-50/80 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-emerald-100 p-6 shadow-sm">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-serif font-bold text-emerald-950">
                {t('goodMorningCaregiver', lang, { name: INITIAL_DATA.caregiver.name })}
              </h1>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full">
                Care Coordinator
              </span>
            </div>
            <p className="text-emerald-800 text-sm">{t('thisWeeksMemory', lang)}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onActivityStart('memory-graph')}
              className="text-xs sm:text-sm font-semibold text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
            >
              🕸️ Graph
            </button>
            <button
              onClick={onSwitchMode}
              className="text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
            >
              🔄 {t('switchMode', lang)}
            </button>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="max-w-4xl mx-auto flex gap-2 mt-6 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'dashboard', label: t('tabDashboard', lang), icon: TrendingUp },
            { id: 'capsules', label: t('tabCapsules', lang), icon: BookOpen },
            { id: 'teach', label: t('tabTeach', lang), icon: Sparkles },
            { id: 'copilot', label: t('tabCopilot', lang), icon: Zap },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fade-in">
            {/* Timeframe Selector */}
            <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-emerald-100 shadow-sm">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider pl-2">Time Window:</span>
              <div className="flex gap-1">
                {['7d', '14d', '30d'].map(tf => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold uppercase transition-all ${
                      timeframe === tf
                        ? 'bg-emerald-600 text-white'
                        : 'text-emerald-800 hover:bg-emerald-50'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Metric Insight Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 p-6 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-emerald-950">{t('familyRecognition', lang)}</h3>
                    <p className="text-xs text-emerald-700">Immediate family recall</p>
                  </div>
                  <div className="text-3xl font-serif font-bold text-emerald-600">85%</div>
                </div>
                <div className="bg-emerald-50 rounded-xl px-3 py-1.5 border border-emerald-200">
                  <p className="text-xs text-emerald-800 font-semibold">● {t('familyRecognitionStrong', lang)}</p>
                </div>
              </div>
              
              <div className="bg-white rounded-3xl shadow-sm border border-blue-100 p-6 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-blue-950">{t('places', lang)}</h3>
                    <p className="text-xs text-blue-700">Familiar surroundings</p>
                  </div>
                  <div className="text-3xl font-serif font-bold text-blue-600">78%</div>
                </div>
                <div className="bg-blue-50 rounded-xl px-3 py-1.5 border border-blue-200">
                  <p className="text-xs text-blue-800 font-semibold">● {t('strong', lang)}</p>
                </div>
              </div>
              
              <div className="bg-white rounded-3xl shadow-sm border border-orange-100 p-6 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-amber-950">{t('morningRoutine', lang)}</h3>
                    <p className="text-xs text-orange-700">Sequencing & habits</p>
                  </div>
                  <div className="text-3xl font-serif font-bold text-orange-600">45%</div>
                </div>
                <div className="bg-orange-50 rounded-xl px-3 py-1.5 border border-orange-200">
                  <p className="text-xs text-orange-800 font-semibold">● {t('needsMoreCues', lang)}</p>
                </div>
              </div>
            </div>
            
            {/* YAADRI Grounded Insight */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl shadow-md p-6 text-white space-y-2">
              <div className="flex items-center gap-2 font-serif font-bold text-lg">
                <Zap size={22} className="text-amber-300" />
                <span>{t('yaadriInsight', lang)}</span>
              </div>
              <p className="text-sm leading-relaxed text-emerald-50">
                {t('familyRecognitionRemained', lang)}
              </p>
              <p className="text-xs text-emerald-200/90 pt-1">{t('basedOnActivity', lang)}</p>
            </div>
            
            {/* Activity Trend Breakdown */}
            <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 p-6 space-y-4">
              <h3 className="text-lg font-serif font-bold text-emerald-950">{t('weekTrend', lang)}</h3>
              <div className="space-y-3">
                {INITIAL_DATA.activityLog.map((log, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-emerald-900">
                      <span>{log.date} — {log.category.toUpperCase()}</span>
                      <span>{log.score}% Recall</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          log.activity === 'independentRecall' ? 'bg-emerald-500' :
                          log.activity === 'lightCue' ? 'bg-amber-500' : 'bg-orange-500'
                        }`}
                        style={{ width: `${log.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MEMORY CAPSULES MANAGEMENT */}
        {activeTab === 'capsules' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-serif font-bold text-emerald-950">Memory Capsules Catalog</h2>
                <p className="text-sm text-emerald-800">Verified memories integrated into Ananya's daily quizzes.</p>
              </div>
              <button
                onClick={() => setActiveTab('teach')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Plus size={16} /> Add Memory
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {memories.map((mem) => (
                <div key={mem.id} className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{mem.image}</span>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                      ✓ Verified
                    </span>
                  </div>
                  <h4 className="text-xl font-serif font-bold text-emerald-950">{mem.title}</h4>
                  <p className="text-sm text-slate-700">{mem.description}</p>
                  <div className="text-xs text-emerald-800 font-medium pt-2 border-t border-emerald-50 flex justify-between">
                    <span>Category: {mem.category}</span>
                    <span>{mem.date || 'Saved'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: TEACH YAADRI (AI STORY INGESTION) */}
        {activeTab === 'teach' && (
          <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 p-8 space-y-6 animate-fade-in">
            <div>
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1">
                <Sparkles size={16} /> AI Entity Extraction
              </div>
              <h2 className="text-2xl font-serif font-bold text-emerald-950">{t('teachTitle', lang)}</h2>
              <p className="text-emerald-800 text-sm mt-1">{t('teachSubtitle', lang)}</p>
            </div>

            {/* Quick Sample Preset */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-emerald-900">Try a sample prompt:</span>
              <button
                onClick={() => setMemoryInput("Meera visited Amma in Guwahati last Sunday and they enjoyed drinking Assam morning tea together in the garden.")}
                className="text-xs text-left bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 p-3 rounded-xl block w-full transition-all"
              >
                "Meera visited Amma in Guwahati last Sunday and they enjoyed drinking Assam morning tea together in the garden."
              </button>
            </div>

            {/* Text Input */}
            <div className="space-y-3">
              <textarea
                value={memoryInput}
                onChange={(e) => setMemoryInput(e.target.value)}
                placeholder={t('memoryInputPlaceholder', lang)}
                rows={4}
                className="w-full p-4 rounded-2xl border-2 border-emerald-100 focus:border-emerald-400 focus:outline-none text-slate-900 text-base resize-none"
              />
              
              <button
                onClick={handleAnalyzeMemory}
                disabled={isAnalyzing || !memoryInput.trim()}
                className={`w-full py-4 rounded-2xl font-semibold text-base transition-all flex items-center justify-center gap-2 ${
                  isAnalyzing || !memoryInput.trim()
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                }`}
              >
                {isAnalyzing ? (
                  <><RefreshCw size={20} className="animate-spin" /> Analyzing Story...</>
                ) : (
                  <><Sparkles size={20} /> {t('analyzeMemory', lang)}</>
                )}
              </button>
            </div>

            {/* Extracted Entities Result */}
            {extractedResult && (
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 space-y-4 animate-fade-in">
                <h4 className="text-lg font-serif font-bold text-emerald-950 flex items-center gap-2">
                  <Check size={20} className="text-emerald-600" /> {t('extractedEntities', lang)}
                </h4>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-white p-3 rounded-xl border border-emerald-100">
                    <span className="text-xs text-emerald-700 font-semibold block">👤 Person</span>
                    <span className="font-bold text-emerald-950">{extractedResult.person}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-emerald-100">
                    <span className="text-xs text-emerald-700 font-semibold block">📍 Place</span>
                    <span className="font-bold text-emerald-950">{extractedResult.place}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-emerald-100">
                    <span className="text-xs text-emerald-700 font-semibold block">☕ Routine</span>
                    <span className="font-bold text-emerald-950">{extractedResult.routine}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-emerald-100">
                    <span className="text-xs text-emerald-700 font-semibold block">📅 Event</span>
                    <span className="font-bold text-emerald-950">{extractedResult.event}</span>
                  </div>
                </div>

                <button
                  onClick={handleSaveToGraph}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={18} /> {t('addToGraph', lang)}
                </button>
              </div>
            )}

            {teachSuccess && (
              <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl text-center font-semibold text-sm animate-fade-in">
                🎉 {t('memoryAddedSuccess', lang)}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CAREGIVER COPILOT CHAT */}
        {activeTab === 'copilot' && (
          <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 p-6 space-y-6 animate-fade-in flex flex-col h-[520px]">
            <div>
              <h2 className="text-2xl font-serif font-bold text-emerald-950">{t('copilotTitle', lang)}</h2>
              <p className="text-emerald-800 text-sm">{t('copilotSubtitle', lang)}</p>
            </div>

            {/* Quick Prompts */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                "How was Mom this week?",
                "Which routines need the most support?",
                "How is her recognition of Meera?"
              ].map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendChat(prompt)}
                  className="text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all"
                >
                  💬 {prompt}
                </button>
              ))}
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
              {copilotMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-none'
                        : 'bg-emerald-50 text-emerald-950 border border-emerald-100 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="flex gap-2 pt-2 border-t border-emerald-50">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                placeholder={t('askPlaceholder', lang)}
                className="flex-1 p-3.5 rounded-2xl border border-emerald-200 focus:border-emerald-400 focus:outline-none text-sm text-slate-900"
              />
              <button
                onClick={() => handleSendChat()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 rounded-2xl transition-colors flex items-center justify-center shadow-sm"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// MAIN APP ROOT CONTAINER
// ============================================================================

export default function YaadriApp() {
  const [screen, setScreen] = useState('splash');
  const [mode, setMode] = useState(null);
  const [lang, setLang] = useState('en');
  
  // Shared Live State
  const [memories, setMemories] = useState(INITIAL_DATA.memories);
  const [graphData, setGraphData] = useState(INITIAL_DATA.graph);
  
  const handleAddMemory = (newMem) => {
    setMemories(prev => [newMem, ...prev]);
  };
  
  const handleAddNode = (newNode) => {
    setGraphData(prev => ({
      ...prev,
      nodes: [...prev.nodes, newNode],
      links: [...prev.links, { source: 'ananya', target: newNode.id, relation: 'MEMORY' }]
    }));
  };
  
  const handleSelectMode = (selectedMode) => {
    setMode(selectedMode);
    if (selectedMode === 'patient') {
      setScreen('patient-home');
    } else {
      setScreen('caregiver-home');
    }
  };
  
  const handleActivityStart = (activity) => {
    if (activity === 'home') {
      setScreen(mode === 'patient' ? 'patient-home' : 'caregiver-home');
    } else if (activity === 'face-recognition') {
      setScreen('face-recognition');
    } else if (activity === 'morning-routine') {
      setScreen('morning-routine');
    } else if (activity === 'memory-graph') {
      setScreen('memory-graph');
    } else if (activity === 'memory-capsules') {
      setScreen('memory-capsules');
    }
  };
  
  const handleBackToHome = () => {
    setScreen(mode === 'caregiver' ? 'caregiver-home' : 'patient-home');
  };

  const handleSwitchMode = () => {
    setScreen('mode-selection');
  };
  
  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'as' : 'en');
  };
  
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-rose-200">
      {/* Global Fixed Language Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleLanguage}
          className="bg-white/95 backdrop-blur-sm shadow-md rounded-2xl px-3.5 py-2 font-semibold text-xs border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-1.5 active:scale-95"
          title={lang === 'en' ? 'Switch to Assamese' : 'Switch to English'}
        >
          <span>{lang === 'en' ? '🇮🇳' : '🇬🇧'}</span>
          <span>{lang === 'en' ? 'অসমীয়া' : 'English'}</span>
        </button>
      </div>
      
      {/* Dynamic Screen Renderer */}
      {screen === 'splash' && (
        <SplashScreen onContinue={() => setScreen('mode-selection')} />
      )}
      
      {screen === 'mode-selection' && (
        <ModeSelection onSelectMode={handleSelectMode} lang={lang} />
      )}
      
      {screen === 'patient-home' && (
        <PatientHome 
          onActivityStart={handleActivityStart} 
          onSwitchMode={handleSwitchMode}
          lang={lang} 
        />
      )}
      
      {screen === 'caregiver-home' && (
        <CaregiverHome 
          memories={memories}
          onAddMemory={handleAddMemory}
          graphData={graphData}
          onAddNode={handleAddNode}
          onActivityStart={handleActivityStart} 
          onSwitchMode={handleSwitchMode}
          lang={lang} 
        />
      )}
      
      {screen === 'face-recognition' && (
        <FaceRecognitionGame 
          onComplete={handleBackToHome} 
          onBack={handleBackToHome}
          lang={lang} 
        />
      )}
      
      {screen === 'morning-routine' && (
        <MorningRoutineGame 
          onComplete={handleBackToHome} 
          onBack={handleBackToHome}
          lang={lang} 
        />
      )}
      
      {screen === 'memory-graph' && (
        <LivingMemoryGraph 
          graphData={graphData}
          lang={lang} 
          onBack={handleBackToHome}
        />
      )}

      {screen === 'memory-capsules' && (
        <MemoryCapsulesGallery 
          memories={memories}
          lang={lang} 
          onBack={handleBackToHome}
        />
      )}
    </div>
  );
}
