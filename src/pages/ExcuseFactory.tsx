import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Copy, Factory, RefreshCw, ChevronDown } from 'lucide-react';
import { generateExcuse } from '../lib/gemini';

const RECIPIENTS = ['Boss', 'Professor', 'Manager'];
const SEVERITIES = [
  { id: 'Minor', label: 'Minor', emoji: '🙂', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'Awkward', label: 'Awkward', emoji: '😬', color: 'text-amber-600', bg: 'bg-amber-50' },
  { id: 'Catastrophic', label: 'Catastrophic', emoji: '🔥', color: 'text-rose-600', bg: 'bg-rose-50' }
];

const LOADING_MESSAGES = [
  "Looking for someone else to blame...",
  "Consulting unforeseen circumstances...",
  "Removing accountability...",
  "Increasing believability...",
  "Adding unnecessary professionalism...",
  "Finalizing explanation..."
];

export default function ExcuseFactory() {
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState('Boss');
  const [reality, setReality] = useState('');
  const [severity, setSeverity] = useState('Minor');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedExcuse, setGeneratedExcuse] = useState('');
  const [loadingText, setLoadingText] = useState(LOADING_MESSAGES[0]);
  const [copied, setCopied] = useState(false);

  // Loading text cycler
  useEffect(() => {
    if (!isGenerating) return;
    const interval = setInterval(() => {
      setLoadingText(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
    }, 800);
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleManufacture = async () => {
    if (!reality.trim() || isGenerating) return;

    setIsGenerating(true);
    setGeneratedExcuse('');

    try {
      const result = await generateExcuse(reality, recipient, severity);
      setGeneratedExcuse(result);
    } catch (err) {
      setGeneratedExcuse("SYSTEM ERROR: The truth is unavoidable at this time.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedExcuse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#FBFBFA] text-slate-800 font-sans relative overflow-hidden">

      {/* Background ambient motion */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, -5, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[100px]"
        />
      </div>

      {/* Header */}
      <header className="shrink-0 h-16 border-b border-black/5 bg-[#FBFBFA]/80 backdrop-blur-md px-6 flex items-center justify-between z-20 relative">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold tracking-wide hidden sm:inline">Back to Lobby</span>
        </button>

        {/* Center Title */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center w-full max-w-[60%] pointer-events-none">
          <h1 className="text-base md:text-lg font-bold tracking-tight text-slate-900 leading-tight">Excuse Generator</h1>
        </div>

        <div className="flex items-center gap-2 text-amber-500">
          <Factory className="w-4 h-4 md:w-5 md:h-5" />
          <span className="font-bold tracking-widest uppercase text-xs md:text-sm hidden sm:inline">Excuse Generator™</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto z-10 p-6 flex flex-col items-center">
        <div className="w-full max-w-2xl flex flex-col gap-6 pb-12 pt-2">

          {/* Subtitle */}
          <div className="text-center mb-0">
            <p className="text-slate-500 text-lg">Turn poor decisions into operational inevitabilities.</p>
          </div>

          {!generatedExcuse && !isGenerating ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col gap-8"
            >

              {/* 1. Recipient */}
              <div className="flex flex-col gap-3">
                <label className="font-bold text-slate-800 tracking-wide">1. Who needs convincing?</label>
                <div className="relative">
                  <select
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full appearance-none bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3.5 text-lg font-medium text-slate-800 focus:outline-none focus:border-amber-400 focus:bg-white transition-colors cursor-pointer"
                  >
                    {RECIPIENTS.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* 2. Reality */}
              <div className="flex flex-col gap-3">
                <label className="font-bold text-slate-800 tracking-wide">2. What actually happened?</label>
                <textarea
                  value={reality}
                  onChange={(e) => setReality(e.target.value)}
                  placeholder="e.g. 'I overslept...' or 'I forgot the deadline...'"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-lg font-medium text-slate-800 focus:outline-none focus:border-amber-400 focus:bg-white transition-colors resize-none h-32"
                />
              </div>

              {/* 3. Severity */}
              <div className="flex flex-col gap-3">
                <label className="font-bold text-slate-800 tracking-wide">3. How bad is this?</label>
                <div className="flex bg-slate-100 rounded-xl p-1.5 gap-1.5">
                  {SEVERITIES.map(s => {
                    const isSelected = severity === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSeverity(s.id)}
                        className={`flex-1 py-3 px-2 rounded-lg font-bold text-sm md:text-base transition-all flex items-center justify-center gap-2 ${isSelected
                          ? 'bg-white shadow-sm text-slate-900 ring-1 ring-slate-200/50'
                          : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                          }`}
                      >
                        <span className="text-lg">{s.emoji}</span>
                        <span>{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Primary Action */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleManufacture}
                disabled={!reality.trim()}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-2xl py-4 md:py-5 font-bold tracking-wide text-lg md:text-xl shadow-md shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-4 flex items-center justify-center gap-3"
              >
                <Factory className="w-6 h-6" />
                Manufacture Excuse
              </motion.button>

            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-[2rem] p-12 shadow-sm border border-slate-100 flex flex-col items-center justify-center min-h-[400px] gap-8"
                >
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-amber-100 border-t-amber-500 rounded-full animate-spin" />
                    <Factory className="w-6 h-6 text-amber-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <motion.p
                    key={loadingText}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-mono text-sm uppercase tracking-widest font-bold text-slate-400 text-center max-w-xs"
                  >
                    {loadingText}
                  </motion.p>
                </motion.div>
              ) : (
                <motion.div
                  key="output"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-100 flex flex-col gap-6"
                >
                  <div className="flex items-center gap-3 text-amber-600 border-b border-slate-100 pb-6">
                    <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5" strokeWidth={3} />
                    </div>
                    <div>
                      <h2 className="font-bold tracking-widest uppercase text-sm">Approved Explanation</h2>
                      <p className="text-slate-400 text-xs font-mono uppercase tracking-widest">Severity: {severity}</p>
                    </div>
                  </div>

                  <div className="text-slate-800 text-lg md:text-xl leading-relaxed whitespace-pre-wrap font-medium">
                    {generatedExcuse}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100 mt-2">
                    <button
                      onClick={handleCopy}
                      className="flex-1 bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-4 font-bold tracking-wide text-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      {copied ? 'Copied to Clipboard' : 'Copy Statement'}
                    </button>
                    <button
                      onClick={() => setGeneratedExcuse('')}
                      className="sm:w-auto w-full px-6 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl py-4 font-bold tracking-wide text-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <RefreshCw className="w-5 h-5" />
                      Start Over
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

        </div>
      </main>
    </div>
  );
}
