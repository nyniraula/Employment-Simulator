import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, AlertTriangle } from 'lucide-react';
import { translateToLinkedIn } from '../lib/gemini';

const SPRING_CONFIG = {
  type: 'spring' as const,
  bounce: 0.4,
  duration: 0.8
};

const FAST_SPRING = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 25
};

type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
  status: 'done' | 'loading' | 'error';
};

const LOADING_MESSAGES = [
  "Looking for a lesson nobody asked for...",
  "Finding a fake mentor quote...",
  'Adding "proud to announce..."',
  "Searching for adversity...",
  "Inventing a turning point...",
  "Summoning recruiters...",
  "Tagging imaginary mentors...",
  "Mentioning the amazing team...",
  "Adding a rocket emoji internally...",
  'Preparing for "Congrats!" comments...',
  "Calculating engagement bait...",
  "Optimizing for humblebrag...",
  "Detecting insufficient self-importance...",
  "Making failure inspirational...",
  "Searching for toxic positivity..."
];

export default function SocialDept() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [loadingText, setLoadingText] = useState(LOADING_MESSAGES[0]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loadingText]);

  useEffect(() => {
    if (!isTranslating) return;
    const interval = setInterval(() => {
      setLoadingText(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
    }, 2000);
    return () => clearInterval(interval);
  }, [isTranslating]);

  const handleTranslate = async () => {
    if (!input.trim() || isTranslating) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      status: 'done'
    };

    const aiMsgId = (Date.now() + 1).toString();
    const loadingAiMsg: Message = {
      id: aiMsgId,
      role: 'ai',
      content: 'GENERATING SYNERGY...',
      status: 'loading'
    };

    setMessages(prev => [...prev, userMsg, loadingAiMsg]);
    setInput('');
    setIsTranslating(true);
    
    try {
      const result = await translateToLinkedIn(userMsg.content);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === aiMsgId 
            ? { ...msg, content: result, status: 'done' } 
            : msg
        )
      );
    } catch (err: any) {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === aiMsgId 
            ? { ...msg, content: err.message || 'Failed to synergize content.', status: 'error' } 
            : msg
        )
      );
    } finally {
      setIsTranslating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTranslate();
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-[#F7F6F3] text-slate-800 font-sans overflow-hidden">
      
      {/* Header - Minimalist / Industrial */}
      <header className="shrink-0 h-16 border-b border-black/10 bg-[#FBFBFA]/80 backdrop-blur-md px-6 flex items-center justify-between z-20">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-mono text-xs uppercase tracking-widest font-bold hidden sm:inline">Abort to Hub</span>
        </button>
        
        <div className="flex items-center gap-4">
          <h1 className="font-black tracking-tight text-xl">Linkedin Boaster</h1>
        </div>
        
        <div className="w-8" /> {/* Spacer for centering */}
      </header>

      {/* Main Chat Feed */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 md:px-12 py-8 scroll-smooth"
      >
        <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-32">
          
          {messages.length === 0 && (
            <div className="text-center mt-20 sm:mt-32 opacity-40 flex flex-col items-center gap-3 sm:gap-4 px-4">
              <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-slate-400" />
              <p className="font-mono text-xs sm:text-sm uppercase tracking-widest font-bold">Waiting for raw inputs to synergize...</p>
            </div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={SPRING_CONFIG}
                className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'user' ? (
                  /* USER MESSAGE: Fisher-Price / Bubbly Aesthetic */
                  <div className="max-w-[85%] sm:max-w-[80%] md:max-w-[70%]">
                    <span className="block text-right mb-1 font-bold text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400 mr-2">Raw Input</span>
                    <div className="bg-[#FF8FAD] text-white p-4 sm:p-6 rounded-3xl sm:rounded-[2rem] rounded-tr-sm sm:rounded-tr-sm border-2 border-b-4 sm:border-4 sm:border-b-8 border-[#D86082] shadow-sm">
                      <p className="text-base sm:text-lg leading-snug font-medium">{msg.content}</p>
                    </div>
                  </div>
                ) : (
                  /* AI MESSAGE: Hybrid Brutalist / Fisher-Price */
                  <div className="max-w-[95%] md:max-w-[85%] w-full">
                    <span className="flex items-center gap-1.5 sm:gap-2 mb-1 font-bold text-[9px] sm:text-[10px] uppercase tracking-widest ml-1">
                      <span className="text-[#FF8FAD] animate-pulse">●</span>
                      <span className="text-slate-500">LinkedInified Output</span>
                    </span>
                    <div className="bg-[#FFD166] text-slate-800 p-4 sm:p-6 rounded-3xl sm:rounded-[2rem] rounded-tl-sm sm:rounded-tl-sm border-2 border-b-4 sm:border-4 sm:border-b-8 border-[#D9A300] shadow-sm relative overflow-hidden">
                      {msg.status === 'loading' ? (
                        <div className="flex items-center gap-3 sm:gap-4 text-slate-700 font-bold tracking-widest">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 border-4 border-slate-700/30 border-t-slate-700 rounded-full animate-spin" />
                          <span className="text-sm sm:text-lg leading-snug font-medium uppercase">{loadingText}</span>
                        </div>
                      ) : msg.status === 'error' ? (
                        <div className="flex items-center gap-2 sm:gap-3 text-red-600">
                          <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
                          <span className="font-bold text-sm sm:text-base">{msg.content}</span>
                        </div>
                      ) : (
                        <div className="text-base sm:text-lg leading-snug font-medium whitespace-pre-wrap">
                          {msg.content}
                        </div>
                      )}
                      {/* Decorative Element */}
                      <div className="hidden sm:block absolute top-4 right-4 font-mono text-[10px] text-slate-800/20 tracking-widest">[ TELEMETRY ]</div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

        </div>
      </div>

      {/* Sticky Bottom Input Deck */}
      <div className="shrink-0 p-4 md:p-8 pt-12 relative z-20">
        
        {/* Premium Gradual Blur & Fade Backdrop */}
        <div 
          className="absolute inset-0 pointer-events-none hidden sm:block"
          style={{ 
            backdropFilter: 'blur(12px)', 
            WebkitBackdropFilter: 'blur(12px)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 60%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 60%)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F7F6F3] via-[#F7F6F3]/90 sm:via-[#F7F6F3]/80 to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto relative">
          
          {/* Double-Bezel Shell */}
          <div className="bg-black/5 p-2 rounded-[2rem] border border-black/10 backdrop-blur-xl">
            <div className="bg-white rounded-[1.5rem] border border-black/5 flex items-end p-2 shadow-sm gap-2">
              
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What mundane task did you do today? (Press Enter to send)"
                className="flex-1 min-w-0 max-h-48 min-h-[48px] sm:min-h-[56px] resize-none bg-transparent p-3 sm:p-4 font-sans text-sm sm:text-lg placeholder-slate-400 focus:outline-none focus:ring-0 leading-snug sm:leading-tight"
                rows={input.split('\n').length > 1 ? Math.min(input.split('\n').length, 5) : 1}
              />

              <motion.button
                whileHover={{ scale: 1.05, transition: FAST_SPRING }}
                whileTap={{ scale: 0.9 }}
                onClick={handleTranslate}
                disabled={isTranslating || !input.trim()}
                className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 bg-[#1E293B] text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-md group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="font-mono text-xl sm:text-2xl relative z-10 font-bold group-hover:translate-x-1 transition-transform">↗</span>
              </motion.button>
              
            </div>
          </div>
          
        </div>
      </div>

    </div>
  );
}
