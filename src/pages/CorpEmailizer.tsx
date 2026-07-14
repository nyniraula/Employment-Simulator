import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, FileText, Copy, Check } from 'lucide-react';
import { generateCorporateEmail } from '../lib/gemini';



const LOADING_MESSAGES = [
  "Adding unnecessary greetings...",
  "CC'ing uninvolved stakeholders...",
  "Passing legal review...",
  "Optimizing passive-aggression...",
  "Realigning bandwidth...",
  "Drafting synergy frameworks...",
  "Consulting the micromanagers...",
  "Formatting bullet points..."
];

export default function CorpEmailizer() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [isEmailizing, setIsEmailizing] = useState(false);
  const [loadingText, setLoadingText] = useState(LOADING_MESSAGES[0]);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [displayedEmail, setDisplayedEmail] = useState('');
  const [copied, setCopied] = useState(false);

  // Loading text cycler
  useEffect(() => {
    if (!isEmailizing) return;
    const interval = setInterval(() => {
      setLoadingText(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
    }, 1500);
    return () => clearInterval(interval);
  }, [isEmailizing]);

  // Typewriter effect
  useEffect(() => {
    if (!generatedEmail) {
      setDisplayedEmail('');
      return;
    }

    let i = 0;
    const speed = 15; // ms per character - fast enough to not be annoying, slow enough to look like typing

    const typeChar = () => {
      if (i < generatedEmail.length) {
        setDisplayedEmail(generatedEmail.slice(0, i + 1));
        i++;
        setTimeout(typeChar, speed + (Math.random() * 10)); // slight randomization for realism
      }
    };

    typeChar();
  }, [generatedEmail]);

  const handleEmailize = async () => {
    if (!input.trim() || isEmailizing) return;

    setIsEmailizing(true);
    setGeneratedEmail('');
    setDisplayedEmail('');

    try {
      const result = await generateCorporateEmail(input);
      setGeneratedEmail(result);
      setInput('');
    } catch (err) {
      setGeneratedEmail("SYSTEM ERROR: UNABLE TO SYNERGIZE. PLEASE REBOOT THE ENTERPRISE.");
    } finally {
      setIsEmailizing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleEmailize();
    }
  };

  const handleCopy = () => {
    if (!generatedEmail) return;
    navigator.clipboard.writeText(generatedEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-[#FBFBFA] text-slate-800 font-sans overflow-hidden relative">

      {/* Background ambient motion */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden sm:flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-[800px] h-[800px] bg-[#60A5FA]/5 rounded-full blur-[100px]"
          style={{ willChange: 'transform' }}
        />
      </div>

      {/* Header - Minimalist */}
      <header className="shrink-0 h-16 border-b border-black/5 bg-[#FBFBFA]/80 backdrop-blur-md px-6 flex items-center justify-between z-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-mono text-xs uppercase tracking-widest font-bold hidden sm:inline">Abort to Hub</span>
        </button>

        <div className="flex items-center gap-4">
          <h1 className="font-black tracking-tight text-xl">Email Yapper</h1>
        </div>

        <div className="w-8" />
      </header>

      {/* Main Compose Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 flex items-center justify-center relative z-10 scroll-smooth">

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-full max-w-4xl bg-white rounded-2xl md:rounded-[2rem] border-2 border-b-4 md:border-4 md:border-b-8 border-[#3B82F6] shadow-sm flex flex-col overflow-hidden"
        >

          {/* Fake Window Chrome */}
          <div className="bg-[#F6F6F6] border-b border-slate-200 px-4 h-10 flex items-center">
            <div className="flex items-center gap-1.5 w-1/3">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
            </div>
            <div className="w-1/3 flex justify-center">
              <span className="font-bold text-slate-700 text-xs tracking-widest uppercase">New Message</span>
            </div>
            <div className="w-1/3" />
          </div>

          {/* Email Headers - Ultra Minimal */}
          <div className="flex flex-col text-sm md:text-base bg-white">
            <div className="border-b border-slate-200 px-6 py-3 flex items-center gap-4">
              <span className="text-slate-400 font-medium w-10 text-right">To:</span>
              <span className="text-slate-900 font-semibold tracking-wide">everyone@thecorporatefactory.com</span>
            </div>

            <div className="border-b border-slate-200 px-6 py-3 flex items-center gap-4">
              <span className="text-slate-400 font-medium w-10 text-right">Cc:</span>
              <div className="flex items-center gap-2 text-slate-900 font-semibold tracking-wide">
                <span>legal@</span>
                <span className="text-slate-300 font-normal">•</span>
                <span>micromanagers@</span>
              </div>
            </div>
          </div>

          {/* Email Body */}
          <div className="p-6 md:p-8 flex-1 min-h-[250px] md:min-h-[300px] text-slate-800 text-base md:text-lg leading-normal relative bg-white">

            <AnimatePresence mode="wait">
              {isEmailizing ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 gap-4"
                >
                  <div className="w-8 h-8 border-4 border-slate-200 border-t-[#3B82F6] rounded-full animate-spin" />
                  <span className="font-mono text-sm uppercase tracking-widest font-bold">{loadingText}</span>
                </motion.div>
              ) : displayedEmail ? (
                <motion.div
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full flex flex-col gap-3"
                >
                  {displayedEmail.split('\n\n').map((paragraph, idx, arr) => (
                    <p key={idx} className="whitespace-pre-wrap">
                      {paragraph}
                      {idx === arr.length - 1 && displayedEmail.length < generatedEmail.length && (
                        <span className="inline-block w-2 h-[1em] bg-slate-400 ml-1 align-middle animate-pulse" />
                      )}
                    </p>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center opacity-40 gap-4 pointer-events-none"
                >
                  <FileText className="w-12 h-12 text-slate-300" />
                  <p className="font-mono text-sm uppercase tracking-widest font-bold text-slate-400">Awaiting Reality Input...</p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Footer Fake Toolbar */}
          <div className="bg-white border-t border-slate-100 p-3 px-4 sm:px-6 flex items-center gap-4 text-slate-400">
            <button
              onClick={handleCopy}
              disabled={!generatedEmail || isEmailizing}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span className="font-bold text-[10px] uppercase tracking-widest">{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>
            <div className="flex-1" />
            <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-slate-300 hidden sm:inline">Optimized for maximum meeting creation</span>
          </div>

        </motion.div>

      </main>

      {/* Sticky Bottom Input Deck */}
      <div className="shrink-0 p-4 md:px-8 pb-6 pt-0 relative z-20">
        <div className="max-w-4xl mx-auto relative">

          <div className="bg-black/5 p-1.5 rounded-[1.5rem] border border-black/10 backdrop-blur-xl">
            <div className="bg-white rounded-xl border border-black/5 flex items-center p-1.5 shadow-sm gap-2">

              <div className="hidden sm:flex pl-4 pr-2 font-bold text-[9px] uppercase tracking-widest text-slate-400 flex-col items-end leading-tight">
                <span>The</span>
                <span>Reality</span>
              </div>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g. 'I dont want to come.'"
                className="flex-1 min-w-0 bg-transparent py-3 pr-2 sm:pr-3 font-sans text-sm sm:text-base placeholder-slate-400 focus:outline-none focus:ring-0 leading-relaxed sm:border-l-2 sm:border-slate-100 ml-1 sm:ml-2 pl-3 sm:pl-4 resize-none overflow-y-auto"
                rows={2}
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEmailize}
                disabled={isEmailizing || !input.trim()}
                className="h-10 sm:h-12 px-4 sm:px-6 shrink-0 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-sm font-bold tracking-wide text-sm sm:text-base gap-2 transition-colors"
              >
                <span className="hidden sm:inline">Emailize</span>
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
