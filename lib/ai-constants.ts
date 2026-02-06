export interface AiSuggestion {
  id: string;
  original: string;
  suggestion: string;
  explanation: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface AiPrompt {
  prompt: string;
  starter: string;
}

export interface AiPanelState {
  type: 'grammar' | 'prompts' | 'summary' | null;
  loading: boolean;
  suggestions: AiSuggestion[];
  prompts: AiPrompt[];
  summary: string;
  error: string | null;
}

export const INITIAL_AI_STATE: AiPanelState = {
  type: null,
  loading: false,
  suggestions: [],
  prompts: [],
  summary: '',
  error: null,
};

export const FALLBACK_PROMPTS: Record<string, AiPrompt[]> = {
  childhood: [
    { prompt: 'Describe your earliest memory', starter: 'My earliest memory is of...' },
    { prompt: 'What was your childhood home like?', starter: 'The home I grew up in...' },
    { prompt: 'Who was your best friend growing up?', starter: 'My closest friend as a child...' },
    { prompt: 'What games did you play as a child?', starter: 'As a child, I loved playing...' },
    { prompt: 'What was your favorite family tradition?', starter: 'Every year, our family would...' },
  ],
  family: [
    { prompt: 'Tell me about your parents', starter: 'My parents were...' },
    { prompt: 'What family traditions were most important?', starter: 'The tradition that meant the most...' },
    { prompt: 'Describe a typical family gathering', starter: 'When our family gathered together...' },
    { prompt: 'What values did your family instill in you?', starter: 'My family taught me to value...' },
    { prompt: 'Who was the most influential family member?', starter: 'The person who influenced me most...' },
  ],
  education: [
    { prompt: 'What was your favorite subject in school?', starter: 'I was always drawn to...' },
    { prompt: 'Describe a teacher who changed your life', starter: 'There was one teacher who...' },
    { prompt: 'What was your school like?', starter: 'My school was...' },
    { prompt: 'What did you dream of becoming?', starter: 'When I was young, I dreamed of...' },
    { prompt: 'What was your most memorable school experience?', starter: 'I will never forget the time...' },
  ],
  career: [
    { prompt: 'How did you choose your career path?', starter: 'My career began when...' },
    { prompt: 'What was your first job?', starter: 'My very first job was...' },
    { prompt: 'What accomplishment are you most proud of?', starter: 'The achievement I am most proud of...' },
    { prompt: 'Who was your most influential mentor?', starter: 'I was fortunate to learn from...' },
    { prompt: 'What challenges did you face at work?', starter: 'One of the biggest challenges I faced...' },
  ],
  'life-events': [
    { prompt: 'What moment changed the course of your life?', starter: 'Everything changed when...' },
    { prompt: 'Describe a moment of unexpected joy', starter: 'One of my happiest surprises was...' },
    { prompt: 'What historical event affected you personally?', starter: 'I remember when the world...' },
    { prompt: 'Describe a turning point in your life', starter: 'The moment I realized...' },
    { prompt: 'What adventure do you remember most vividly?', starter: 'The adventure that stands out most...' },
  ],
  relationships: [
    { prompt: 'How did you meet your partner?', starter: 'We first met when...' },
    { prompt: 'What does love mean to you?', starter: 'To me, love has always meant...' },
    { prompt: 'Describe your closest friendship', starter: 'My dearest friend and I...' },
    { prompt: 'What have relationships taught you?', starter: 'Through my relationships, I learned...' },
    { prompt: 'Describe a moment of deep connection', starter: 'I felt truly connected when...' },
  ],
  challenges: [
    { prompt: 'What was the hardest thing you ever faced?', starter: 'The most difficult time in my life...' },
    { prompt: 'How did you overcome a major obstacle?', starter: 'I found the strength to overcome...' },
    { prompt: 'What failure taught you the most?', starter: 'The failure that taught me the most...' },
    { prompt: 'What advice would you give your younger self?', starter: 'If I could tell my younger self...' },
    { prompt: 'How did hardship shape who you are?', starter: 'Going through that experience made me...' },
  ],
  passions: [
    { prompt: 'What hobby brings you the most joy?', starter: 'Nothing makes me happier than...' },
    { prompt: 'How did you discover your passion?', starter: 'I first discovered my love for...' },
    { prompt: 'What could you spend hours doing?', starter: 'I could spend all day...' },
    { prompt: 'What skill did you work hardest to develop?', starter: 'The skill I worked hardest on...' },
    { prompt: 'What do you wish more people appreciated?', starter: 'I wish more people understood...' },
  ],
  legacy: [
    { prompt: 'What do you want to be remembered for?', starter: 'I hope to be remembered as...' },
    { prompt: 'What wisdom would you pass on?', starter: 'If I could share one piece of wisdom...' },
    { prompt: 'What are you most grateful for?', starter: 'Above all, I am grateful for...' },
    { prompt: 'How do you hope the world will change?', starter: 'My hope for the future is...' },
    { prompt: 'What message do you have for future generations?', starter: 'To those who come after me...' },
  ],
};
