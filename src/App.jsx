import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Mic, Home, Play, BookOpen, Volume2, Menu, X, Zap, TrendingUp } from 'lucide-react';

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
    play: "Play",
    start: "Start",
    
    // Face Recognition Game
    correct: "That's right. You remembered {name}.",
    correctSub: "She is your {relation}.",
    thatOkay: "That's okay.",
    letRememberTogether: "Let's remember together.",
    continue: "Continue",
    
    // Memory Rescue Stages
    aLittleClue: "A little clue",
    context: "You often spent Sunday evenings together.",
    iRemember: "I remember",
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
    wonderful: "Wonderful.",
    rememberedMorning: "You remembered your morning routine.",
    
    independentRecall: "Independent Recall",
    lightCue: "Light Cue",
    multipleCues: "Multiple Cues",
    
    tea: "Tea",
    medicine: "Medicine",
    breakfast: "Breakfast",
    
    // Memory Connection Map
    memoryJourney: "Your Memory Journey",
    familyRecognition: "Family Recognition",
    places: "Places",
    morningRoutine: "Morning Routine",
    strong: "Strong",
    needsMoreCues: "Needs More Cues",
    patternsHelp: "These patterns help families understand which memories may benefit from more gentle support.",
    
    // Living Memory Map
    yourMemoryConnections: "Your Memory Connections",
    peopleAndPlaces: "The people, places and moments that make up your story.",
    daughter: "Daughter",
    son: "Son",
    home: "Home",
    familyTrip: "Family Trip",
    routine: "Routine",
    viewMemories: "View Memories",
    
    // Memories Screen
    memoryCapsules: "Your Memories",
    familyTripsGuwahati: "Family Trip to Guwahati",
    ananyaAndFamily: "Ananya and her family visiting Guwahati together.",
    sundayEveningTogether: "Sunday Evening Together",
    familiarEvening: "A familiar family evening spent with Meera.",
    meerasVoiceMessage: "Meera's Voice Message",
    helloAmma: "Hello Amma, it's me, Meera.",
    morningRoutineDesc: "Tea, medicine and breakfast.",
    verified: "Verified",
    
    // Voice Screen
    letsTalk: "Let's talk",
    listening: "Listening...",
    
    // Language
    english: "English",
    assamese: "অসমীয়া",
    
    // Caregiver
    goodMorningCaregiver: "Good Morning, {name}",
    thisWeeksMemory: "This Week's Memory Journey",
    familyRecognitionStrong: "STRONG",
    weekTrend: "This Week's Trend",
    yaadriInsight: "YAADRI Insight",
    familyRecognitionRemained: "Family recognition remained strong this week. Morning routines required more assistance.",
    basedOnActivity: "Based on recent activity patterns.",
    
    howWasMom: "How was Mom this week?",
    systemResponse: "Family recognition remained strong. Morning routines required more assistance with activity patterns.",
    
    teachAboutMe: "Teach YAADRI About Me",
    helpYaadri: "Help YAADRI understand the people and moments that matter.",
    buildMemoryConnections: "Build Memory Connections",
    understanding: "Understanding your memory...",
    personDetected: "Person detected",
    relationshipIdentified: "Relationship identified",
    placeIdentified: "Place identified",
    routineIdentified: "Routine identified",
    memoryUpdated: "Memory connections updated.",
  },
  as: {
    // Navigation & Mode
    modeSelection: "আপুনি কিভাবে এগিয়ে যাব বিচাৰিছেন?",
    patientMode: "আজ আমি কিছু সুন্দৰ কথা মনে পেলেই ভাল।",
    caregiverMode: "আপোনাৰ প্ৰিয়জনৰ স্মৃতি যাত্ৰা সমৰ্থন আৰু বুজুন।",
    continueAsPatient: "ৰোগী হিছাপে চলিয়ে যান",
    continuAsCaregiver: "যত্নশীল হিছাপে চলিয়ে যান",
    
    // Patient Home
    goodMorning: "শুভ প্ৰভাত, {name}",
    revisitBeautiful: "আজ আমি কিছু সুন্দৰ কথা মনে পেলেই ভাল।",
    dailyEncouragement: "প্ৰতিটি স্মৃতি এক যাত্ৰা। আমি এক ধাপ এক ধাপ লৈ এগিয়ে যাম।",
    
    // Activities
    whoIsThis: "এই জন কোন?",
    recognizeFace: "এটি এক পৰিচিত মুখ।",
    myMorningRoutine: "মোৰ প্ৰাতঃকালীন ৰুটিন",
    letsPutMorning: "আপোনাৰ প্ৰাতঃকালীন ৰুটিন সংগঠিত কৰি পেলোঁ।",
    
    tea: "চাহ",
    medicine: "ঔষধ",
    breakfast: "সকাল-পূর্বীয়া ভোজন",
    continue: "পৰবৰ্তী",
    play: "খেলা",
  }
};

// ============================================================================
// DATA MODELS & DEMO DATA
// ============================================================================

const DEMO_DATA = {
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
      voiceMessage: 'Hello Amma, it\'s me, Meera.',
      image: '👩‍🦱',
      color: '#F4A582',
    },
    {
      id: 'rahul',
      name: 'Rahul',
      relation: 'son',
      description: 'Your son',
      image: '👨‍🦲',
      color: '#A8D5BA',
    },
  ],
  
  memories: [
    {
      id: 'mem_001',
      title: 'Family Trip to Guwahati',
      category: 'Event',
      description: 'Ananya and her family visiting Guwahati together.',
      relatedPeople: ['meera', 'rahul'],
      relatedPlace: 'Guwahati',
      verified: true,
      image: '🏞️',
      color: '#FFE8D6',
    },
    {
      id: 'mem_002',
      title: 'Sunday Evening Together',
      category: 'Family',
      description: 'A familiar family evening spent with Meera.',
      relatedPeople: ['meera'],
      relatedPlace: 'Guwahati',
      verified: true,
      image: '🌅',
      color: '#FFF0E6',
    },
    {
      id: 'mem_003',
      title: 'Meera\'s Voice Message',
      category: 'Voice Memory',
      description: 'Hello Amma, it\'s me, Meera.',
      relatedPeople: ['meera'],
      verified: true,
      image: '🎵',
      color: '#E8F5FF',
    },
    {
      id: 'mem_004',
      title: 'Morning Routine',
      category: 'Routine',
      description: 'Tea, medicine and breakfast.',
      routine: ['tea', 'medicine', 'breakfast'],
      verified: true,
      image: '☕',
      color: '#FFF9E6',
    },
  ],
  
  graph: {
    nodes: [
      { id: 'ananya', label: 'Ananya', type: 'patient' },
      { id: 'meera', label: 'Meera', type: 'person', relation: 'Daughter' },
      { id: 'rahul', label: 'Rahul', type: 'person', relation: 'Son' },
      { id: 'guwahati', label: 'Guwahati', type: 'place' },
      { id: 'routine', label: 'Morning\nRoutine', type: 'routine' },
      { id: 'familytrip', label: 'Family\nTrip', type: 'event' },
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
    relation: 'Daughter',
  },
  
  activityLog: [
    { date: 'Monday', activity: 'independentRecall', category: 'family' },
    { date: 'Tuesday', activity: 'lightCue', category: 'routine' },
    { date: 'Wednesday', activity: 'independentRecall', category: 'family' },
    { date: 'Thursday', activity: 'multipleCues', category: 'routine' },
    { date: 'Friday', activity: 'independentRecall', category: 'places' },
    { date: 'Saturday', activity: 'lightCue', category: 'family' },
    { date: 'Sunday', activity: 'independentRecall', category: 'family' },
  ],
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const t = (key, lang = 'en', replacements = {}) => {
  let text = translations[lang]?.[key] || translations.en[key] || key;
  Object.entries(replacements).forEach(([k, v]) => {
    text = text.replace(`{${k}}`, v);
  });
  return text;
};

const getGraphPosition = (index, total) => {
  const radius = 150;
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
};

// ============================================================================
// COMPONENT: Splash Screen
// ============================================================================

const SplashScreen = ({ onContinue }) => {
  const [show, setShow] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2500);
    return () => clearTimeout(timer);
  }, []);
  
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-rose-50 to-amber-50 flex flex-col items-center justify-center z-50">
      <div className="text-center space-y-6 animate-fade-in">
        <div className="text-6xl mb-4">🌿</div>
        <h1 className="text-5xl font-serif text-amber-900">YAADRI</h1>
        <p className="text-xl text-amber-700">Your Personal AI Memory Companion</p>
        <p className="text-base text-amber-600 max-w-xs">Helping you stay connected to the people and moments that matter.</p>
        
        <div className="flex gap-2 justify-center pt-8 h-12">
          <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse animation-delay-1"></div>
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse animation-delay-2"></div>
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-in; }
        .animation-delay-1 { animation-delay: 0.2s; }
        .animation-delay-2 { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
};

// ============================================================================
// COMPONENT: Mode Selection
// ============================================================================

const ModeSelection = ({ onSelectMode, lang }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-rose-50 p-6 flex flex-col justify-center">
      <div className="max-w-2xl mx-auto w-full space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-amber-900 mb-2">{t('modeSelection', lang)}</h1>
          <p className="text-amber-700">Choose how you'd like to experience YAADRI</p>
        </div>
        
        {/* Patient Mode Card */}
        <button
          onClick={() => onSelectMode('patient')}
          className="w-full bg-white border-2 border-transparent rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-rose-200 transition-all"
        >
          <div className="text-center space-y-4">
            <div className="text-5xl">👵</div>
            <h2 className="text-2xl font-serif text-amber-900">Patient Mode</h2>
            <p className="text-amber-700 text-lg">{t('patientMode', lang)}</p>
            <div className="pt-4 flex items-center justify-center gap-2 text-rose-600 font-medium">
              {t('continueAsPatient', lang)} <ChevronRight size={20} />
            </div>
          </div>
        </button>
        
        {/* Caregiver Mode Card */}
        <button
          onClick={() => onSelectMode('caregiver')}
          className="w-full bg-white border-2 border-transparent rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-emerald-200 transition-all"
        >
          <div className="text-center space-y-4">
            <div className="text-5xl">👨‍👩‍👧</div>
            <h2 className="text-2xl font-serif text-amber-900">Caregiver Mode</h2>
            <p className="text-amber-700 text-lg">{t('caregiverMode', lang)}</p>
            <div className="pt-4 flex items-center justify-center gap-2 text-emerald-600 font-medium">
              {t('continuAsCaregiver', lang)} <ChevronRight size={20} />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT: Memory Rescue Flow
// ============================================================================

const MemoryRescueFlow = ({ memory, onComplete, lang }) => {
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
      options: [t('iRemember', lang), t('revealGently', lang)],
    },
    {
      title: t('gentleReveal', lang),
      isReveal: true,
      content: t('gentleReveal', lang, { name: 'Meera' }),
      subContent: t('yourDaughter', lang),
      footer: t('memoryNeedsPath', lang),
      button: t('continueJourney', lang),
    },
  ];
  
  const currentStage = stages[stage];
  const isLastStage = stage === stages.length - 1;
  
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50 p-6 flex flex-col">
      {/* Progress Indicator */}
      <div className="w-full max-w-2xl mx-auto mb-8">
        <div className="flex gap-2">
          {stages.map((_, i) => (
            <div key={i} className={`flex-1 h-1 rounded-full transition-all ${
              i <= stage ? 'bg-emerald-400' : 'bg-gray-300'
            }`} />
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 max-w-2xl mx-auto w-full flex flex-col justify-center">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-serif text-blue-900">{currentStage.title}</h2>
          
          {currentStage.isAudio ? (
            <div className="bg-white rounded-2xl p-8 shadow-lg space-y-4">
              <button
                onClick={() => setPlaying(!playing)}
                className="mx-auto flex items-center gap-3 bg-emerald-400 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-medium transition-all"
              >
                <Volume2 size={24} />
                {t('playVoiceMessage', lang)}
              </button>
              {playing && (
                <div className="flex gap-1 justify-center items-end h-12">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-1 bg-emerald-400 rounded-full animate-pulse" style={{
                      height: `${20 + Math.random() * 40}px`,
                      animationDelay: `${i * 0.1}s`
                    }} />
                  ))}
                </div>
              )}
            </div>
          ) : currentStage.isReveal ? (
            <div className="bg-white rounded-2xl p-8 shadow-lg space-y-6">
              <div className="text-6xl">👩‍🦱</div>
              <div className="space-y-2">
                <p className="text-2xl font-serif text-blue-900">{currentStage.content}</p>
                <p className="text-xl text-emerald-600 font-medium">{currentStage.subContent}</p>
              </div>
              <p className="text-base text-blue-700 italic">{currentStage.footer}</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 shadow-lg space-y-4">
              <p className="text-2xl text-blue-900 font-medium">{currentStage.content}</p>
              {currentStage.subContent && (
                <p className="text-lg text-blue-700">{currentStage.subContent}</p>
              )}
            </div>
          )}
          
          {/* Options */}
          {!isLastStage && (
            <div className="flex flex-col gap-3 pt-6">
              <button
                onClick={() => handleNext(true)}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-4 rounded-xl text-lg transition-all"
              >
                {currentStage.options[0]}
              </button>
              <button
                onClick={() => handleNext(false)}
                className="w-full bg-blue-100 hover:bg-blue-200 text-blue-900 font-medium py-4 rounded-xl text-lg transition-all"
              >
                {currentStage.options[1]}
              </button>
            </div>
          )}
          
          {isLastStage && (
            <button
              onClick={() => onComplete()}
              className="w-full bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 text-white font-medium py-4 rounded-xl text-lg transition-all"
            >
              {currentStage.button}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT: Face Recognition Game
// ============================================================================

const FaceRecognitionGame = ({ onComplete, lang }) => {
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
  };
  
  if (startRescue) {
    return <MemoryRescueFlow 
      memory={{}} 
      onComplete={onComplete} 
      lang={lang}
    />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-rose-50 p-6 flex flex-col">
      <div className="max-w-2xl mx-auto w-full flex flex-col justify-center flex-1">
        <h1 className="text-3xl font-serif text-amber-900 text-center mb-2">
          {t('whoIsThis', lang)}
        </h1>
        <p className="text-center text-amber-700 mb-8">{t('recognizeFace', lang)}</p>
        
        {!showResult ? (
          <>
            {/* Photo Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 aspect-square flex items-center justify-center">
              <div className="text-8xl">👩‍🦱</div>
            </div>
            
            {/* Options */}
            <div className="space-y-4">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="w-full bg-white hover:bg-rose-50 border-2 border-rose-200 rounded-xl p-6 text-2xl font-medium text-amber-900 transition-all"
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : isCorrect ? (
          <div className="text-center space-y-6">
            <div className="text-6xl animate-bounce">✨</div>
            <div className="bg-white rounded-2xl p-8 shadow-lg space-y-4">
              <p className="text-2xl font-serif text-emerald-600">
                {t('correct', lang, { name: 'Meera' })}
              </p>
              <p className="text-lg text-emerald-700">
                {t('correctSub', lang, { relation: 'daughter' })}
              </p>
            </div>
            <button
              onClick={onComplete}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-4 rounded-xl text-lg"
            >
              {t('continue', lang)}
            </button>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg space-y-4">
              <p className="text-2xl text-blue-900 font-serif">{t('thatOkay', lang)}</p>
              <p className="text-lg text-blue-700">{t('letRememberTogether', lang)}</p>
            </div>
            <button
              onClick={() => setStartRescue(true)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 rounded-xl text-lg"
            >
              {t('continue', lang)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT: Morning Routine Game
// ============================================================================

const MorningRoutineGame = ({ onComplete, lang }) => {
  const [items, setItems] = useState([
    { id: 1, name: t('tea', lang), emoji: '☕' },
    { id: 3, name: t('breakfast', lang), emoji: '🥞' },
    { id: 2, name: t('medicine', lang), emoji: '💊' },
  ]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [completed, setCompleted] = useState(false);
  
  const correctOrder = [t('tea', lang), t('medicine', lang), t('breakfast', lang)];
  const currentOrder = items.map(i => i.name);
  const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(correctOrder);
  
  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  
  const handleDrop = (e, index) => {
    e.preventDefault();
    if (!draggedItem) return;
    
    const draggedIndex = items.findIndex(i => i.id === draggedItem.id);
    if (draggedIndex === index) return;
    
    const newItems = [...items];
    newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);
    setItems(newItems);
    setDraggedItem(null);
  };
  
  const handleCheck = () => {
    if (isCorrect) {
      setCompleted(true);
    }
  };
  
  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50 p-6 flex flex-col justify-center">
        <div className="max-w-2xl mx-auto w-full text-center space-y-6">
          <div className="text-6xl animate-bounce">🎉</div>
          <div className="bg-white rounded-2xl p-8 shadow-lg space-y-4">
            <p className="text-3xl font-serif text-emerald-900">{t('wonderful', lang)}</p>
            <p className="text-xl text-emerald-700">{t('rememberedMorning', lang)}</p>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl p-6">
            <p className="text-amber-900 font-medium mb-3">Your Support Level:</p>
            <div className="bg-white rounded-xl px-6 py-3 text-lg font-serif text-emerald-600">
              {t('independentRecall', lang)}
            </div>
          </div>
          
          <button
            onClick={onComplete}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-4 rounded-xl text-lg"
          >
            {t('continue', lang)}
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-rose-50 p-6 flex flex-col">
      <div className="max-w-2xl mx-auto w-full flex flex-col justify-center flex-1">
        <h1 className="text-3xl font-serif text-amber-900 text-center mb-2">
          {t('letRememberMorning', lang)}
        </h1>
        <p className="text-center text-amber-700 mb-8">{t('putMomentsOrder', lang)}</p>
        
        {/* Drag and Drop Area */}
        <div className="space-y-4 mb-8">
          {items.map((item, index) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className="bg-white border-4 border-dashed border-amber-200 hover:border-amber-400 rounded-2xl p-6 cursor-move transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{item.emoji}</span>
                <span className="text-2xl font-medium text-amber-900 flex-1">{item.name}</span>
                <span className="text-sm bg-amber-100 px-3 py-1 rounded-full text-amber-700">
                  {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={handleCheck}
          disabled={!isCorrect}
          className={`w-full font-medium py-4 rounded-xl text-lg transition-all ${
            isCorrect
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {t('start', lang)}
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT: Living Memory Graph
// ============================================================================

const LivingMemoryGraph = ({ lang, onNodeClick }) => {
  const canvasRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodePositions, setNodePositions] = useState({});
  
  useEffect(() => {
    // Calculate positions for nodes
    const positions = {};
    DEMO_DATA.graph.nodes.forEach((node, index) => {
      const angle = (index / DEMO_DATA.graph.nodes.length) * Math.PI * 2 - Math.PI / 2;
      const radius = index === 0 ? 0 : 140; // Center node in the middle
      positions[node.id] = {
        x: Math.cos(angle) * radius + 200,
        y: Math.sin(angle) * radius + 200,
      };
    });
    setNodePositions(positions);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif text-blue-900 mb-2">{t('yourMemoryConnections', lang)}</h1>
        <p className="text-blue-700 mb-8">{t('peopleAndPlaces', lang)}</p>
        
        {/* SVG Graph */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <svg width="100%" height="400" viewBox="0 0 400 400" className="border border-blue-100 rounded-2xl">
            {/* Links */}
            {DEMO_DATA.graph.links.map((link, i) => {
              const source = nodePositions[link.source];
              const target = nodePositions[link.target];
              if (!source || !target) return null;
              return (
                <line
                  key={i}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="#D1D5DB"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              );
            })}
            
            {/* Nodes */}
            {DEMO_DATA.graph.nodes.map((node) => {
              const pos = nodePositions[node.id];
              if (!pos) return null;
              
              const colorMap = {
                patient: '#FCD34D',
                person: '#F87171',
                place: '#60A5FA',
                routine: '#34D399',
                event: '#C084FC',
              };
              
              return (
                <g key={node.id}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="35"
                    fill={colorMap[node.type]}
                    opacity="0.9"
                    className="cursor-pointer hover:opacity-100 transition-opacity"
                    onClick={() => setSelectedNode(node.id)}
                  />
                  <text
                    x={pos.x}
                    y={pos.y}
                    textAnchor="middle"
                    dy="0.3em"
                    className="text-xs font-bold text-gray-700 pointer-events-none"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        
        {/* Node Details */}
        {selectedNode && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            {selectedNode === 'meera' && (
              <div className="space-y-3">
                <h3 className="text-2xl font-serif text-gray-900">Meera</h3>
                <p className="text-gray-600">{t('daughter', lang)}</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Connected Memories:</strong> Family Trip, Sunday Evenings, Voice Message</p>
                  <p><strong>Verified Memories:</strong> 3</p>
                </div>
              </div>
            )}
            {selectedNode === 'guwahati' && (
              <div className="space-y-3">
                <h3 className="text-2xl font-serif text-gray-900">Guwahati</h3>
                <p className="text-gray-600">{t('home', lang)}</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Connected Memories:</strong> Family Trip, Morning Walks, Family Visits</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT: Patient Home
// ============================================================================

const PatientHome = ({ onActivityStart, lang }) => {
  const [currentReminder, setCurrentReminder] = useState('medicine');
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-rose-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-rose-100 p-6 text-center">
        <h1 className="text-4xl font-serif text-amber-900 mb-2">
          {t('goodMorning', lang, { name: DEMO_DATA.patient.name })}
        </h1>
        <p className="text-amber-700">{t('revisitBeautiful', lang)}</p>
      </div>
      
      {/* Encouragement */}
      <div className="p-6">
        <div className="bg-white border-l-4 border-emerald-400 rounded-lg p-4 mb-6 shadow-sm">
          <p className="text-amber-900 italic">{t('dailyEncouragement', lang)}</p>
        </div>
        
        {/* Activities Grid */}
        <div className="space-y-4">
          {/* Activity 1: Face Recognition */}
          <button
            onClick={() => onActivityStart('face-recognition')}
            className="w-full bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div className="p-6 space-y-2">
              <h3 className="text-2xl font-serif text-amber-900 text-left">{t('whoIsThis', lang)}</h3>
              <p className="text-amber-700 text-left">{t('recognizeFace', lang)}</p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-3xl">👩‍🦱</span>
                <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg font-medium transition-all">
                  {t('play', lang)}
                </button>
              </div>
            </div>
          </button>
          
          {/* Activity 2: Morning Routine */}
          <button
            onClick={() => onActivityStart('morning-routine')}
            className="w-full bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div className="p-6 space-y-2">
              <h3 className="text-2xl font-serif text-amber-900 text-left">{t('myMorningRoutine', lang)}</h3>
              <p className="text-amber-700 text-left">{t('letsPutMorning', lang)}</p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-3xl">☕</span>
                <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-medium transition-all">
                  {t('start', lang)}
                </button>
              </div>
            </div>
          </button>
          
          {/* Activity 3: Reminder */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-2">
            <h3 className="text-2xl font-serif text-amber-900">{t('gentleReminder', lang)}</h3>
            <div className="space-y-2">
              <p className="text-lg text-amber-700 font-medium">{t('medicineTime', lang)}</p>
              <p className="text-2xl text-amber-900 font-serif">9:00 AM</p>
            </div>
            <button className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-medium transition-all">
              {t('markAsDone', lang)}
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-amber-100 flex justify-around py-3">
        <button className="flex flex-col items-center gap-1 text-amber-900">
          <Home size={24} />
          <span className="text-xs">Home</span>
        </button>
        <button onClick={() => onActivityStart('face-recognition')} className="flex flex-col items-center gap-1 text-amber-600">
          <Play size={24} />
          <span className="text-xs">Play</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-amber-600">
          <BookOpen size={24} />
          <span className="text-xs">Memories</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-amber-600">
          <Volume2 size={24} />
          <span className="text-xs">Voice</span>
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT: Caregiver Home
// ============================================================================

const CaregiverHome = ({ onActivityStart, lang }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50 pb-6">
      {/* Header */}
      <div className="bg-white border-b border-emerald-100 p-6">
        <h1 className="text-3xl font-serif text-emerald-900 mb-1">
          {t('goodMorningCaregiver', lang, { name: DEMO_DATA.caregiver.name })}
        </h1>
        <p className="text-emerald-700">{t('thisWeeksMemory', lang)}</p>
      </div>
      
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Insight Cards */}
        <div className="grid grid-cols-1 gap-4">
          {/* Family Recognition */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-serif text-emerald-900">{t('familyRecognition', lang)}</h3>
                <p className="text-sm text-emerald-600">Family relationships</p>
              </div>
              <div className="text-2xl font-bold text-emerald-600">85%</div>
            </div>
            <div className="bg-emerald-50 rounded-lg px-3 py-2">
              <p className="text-sm text-emerald-700 font-medium">{t('familyRecognitionStrong', lang)}</p>
            </div>
          </div>
          
          {/* Places */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-serif text-emerald-900">{t('places', lang)}</h3>
                <p className="text-sm text-emerald-600">Location memories</p>
              </div>
              <div className="text-2xl font-bold text-emerald-600">78%</div>
            </div>
            <div className="bg-emerald-50 rounded-lg px-3 py-2">
              <p className="text-sm text-emerald-700">{t('strong', lang)}</p>
            </div>
          </div>
          
          {/* Morning Routine */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-serif text-emerald-900">{t('morningRoutine', lang)}</h3>
                <p className="text-sm text-emerald-600">Daily routines</p>
              </div>
              <div className="text-2xl font-bold text-orange-600">45%</div>
            </div>
            <div className="bg-orange-50 rounded-lg px-3 py-2">
              <p className="text-sm text-orange-700">{t('needsMoreCues', lang)}</p>
            </div>
          </div>
        </div>
        
        {/* YAADRI Insight */}
        <div className="bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-start gap-3">
            <Zap size={24} className="flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-serif mb-2">YAADRI Insight</h3>
              <p className="text-sm leading-relaxed">{t('familyRecognitionRemained', lang)}</p>
              <p className="text-xs mt-2 opacity-90">{t('basedOnActivity', lang)}</p>
            </div>
          </div>
        </div>
        
        {/* Trend Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-serif text-emerald-900 mb-4">This Week's Trend</h3>
          <div className="space-y-3">
            {DEMO_DATA.activityLog.map((day, i) => {
              const colors = {
                independentRecall: 'bg-emerald-500',
                lightCue: 'bg-amber-500',
                multipleCues: 'bg-orange-500',
              };
              return (
                <div key={i} className="space-y-1">
                  <p className="text-sm font-medium text-emerald-900">{day.date}</p>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className={`h-3 rounded-full ${colors[day.activity]}`} style={{width: '75%'}}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT: Main App
// ============================================================================

export default function YaadriApp() {
  const [screen, setScreen] = useState('splash');
  const [mode, setMode] = useState(null);
  const [lang, setLang] = useState('en');
  const [showMenu, setShowMenu] = useState(false);
  
  const handleSelectMode = (selectedMode) => {
    setMode(selectedMode);
    if (selectedMode === 'patient') {
      setScreen('patient-home');
    } else {
      setScreen('caregiver-home');
    }
  };
  
  const handleActivityStart = (activity) => {
    if (activity === 'face-recognition') {
      setScreen('face-recognition');
    } else if (activity === 'morning-routine') {
      setScreen('morning-routine');
    } else if (activity === 'memory-graph') {
      setScreen('memory-graph');
    }
  };
  
  const handleActivityComplete = () => {
    if (mode === 'patient') {
      setScreen('patient-home');
    } else {
      setScreen('caregiver-home');
    }
  };
  
  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'as' : 'en');
  };
  
  return (
    <div className="bg-white">
      {/* Language Toggle */}
      <div className="fixed top-0 right-0 z-40 p-4">
        <button
          onClick={toggleLanguage}
          className="bg-white shadow-md rounded-lg px-4 py-2 font-medium text-sm border border-gray-200 hover:bg-gray-50 transition-all"
        >
          {lang === 'en' ? '🇮🇳' : '🇬🇧'}
        </button>
      </div>
      
      {/* Main Content */}
      {screen === 'splash' && (
        <>
          <SplashScreen onContinue={() => setScreen('mode-selection')} />
        </>
      )}
      
      {screen === 'mode-selection' && (
        <ModeSelection onSelectMode={handleSelectMode} lang={lang} />
      )}
      
      {screen === 'patient-home' && (
        <PatientHome onActivityStart={handleActivityStart} lang={lang} />
      )}
      
      {screen === 'caregiver-home' && (
        <CaregiverHome onActivityStart={handleActivityStart} lang={lang} />
      )}
      
      {screen === 'face-recognition' && (
        <FaceRecognitionGame onComplete={handleActivityComplete} lang={lang} />
      )}
      
      {screen === 'morning-routine' && (
        <MorningRoutineGame onComplete={handleActivityComplete} lang={lang} />
      )}
      
      {screen === 'memory-graph' && (
        <LivingMemoryGraph lang={lang} onNodeClick={() => {}} />
      )}
      
      {/* Global Styles */}
      <style>{`
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
        }
        
        .font-serif {
          font-family: 'Georgia', serif;
        }
      `}</style>
    </div>
  );
}
