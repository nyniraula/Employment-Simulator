import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Share2, Mail, ShieldAlert, Briefcase, PieChart, Coffee, TrendingUp, FolderOpen, Factory } from 'lucide-react';

const SPRING_CONFIG = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 15,
  mass: 1.2
};

const FAST_SPRING = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 12,
  mass: 0.8
};

const departments = [

  {
    title: 'Linkedin Boaster',
    description: `Inflating achievements since your first side project.`,
    icon: Share2,
    colors: {
      bg: 'bg-[#FF8FAD]',
      shadow: 'border-[#D86082]',
      text: 'text-white'
    },
    telemetry: '[ METRIC: CLOUT_INDEX ]'
  },
  {
    title: 'Email Yapper',
    description: `Because one sentence isn't enough.`,
    icon: Mail,
    colors: {
      bg: 'bg-[#60A5FA]',
      shadow: 'border-[#3B82F6]',
      text: 'text-white'
    },
    telemetry: '[ METRIC: JARGON_DENSITY ]'
  },
  {
    title: 'Excuse Generator',
    description: `Professionally explain that definitely wasn't your fault.`,
    icon: ShieldAlert,
    colors: {
      bg: 'bg-[#C084FC]',
      shadow: 'border-[#A855F7]',
      text: 'text-white'
    },
    telemetry: '[ METRIC: BLAME_DEFLECTION ]'
  }
];

const CONVEYOR_ITEMS = [
  { icon: Briefcase, color: 'text-blue-400', bg: 'bg-blue-100', border: 'border-blue-300' },
  { icon: PieChart, color: 'text-pink-400', bg: 'bg-pink-100', border: 'border-pink-300' },
  { icon: Coffee, color: 'text-amber-400', bg: 'bg-amber-100', border: 'border-amber-300' },
  { icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-100', border: 'border-emerald-300' },
  { icon: FolderOpen, color: 'text-purple-400', bg: 'bg-purple-100', border: 'border-purple-300' },
];

// Duplicate items to ensure smooth infinite scrolling
const BELT_ITEMS = [...CONVEYOR_ITEMS, ...CONVEYOR_ITEMS, ...CONVEYOR_ITEMS, ...CONVEYOR_ITEMS];

const ConveyorBeltRow = ({ reverse = false, speed = 40, delay = 0, yOffset = 0 }) => (
  <div
    className="absolute w-[200vw] flex items-center gap-16 md:gap-32"
    style={{ top: `${yOffset}%`, transform: 'rotate(-5deg)' }}
  >
    <motion.div
      animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear", delay }}
      className="flex gap-16 md:gap-32 min-w-max"
    >
      {BELT_ITEMS.map((item, idx) => (
        <div key={idx} className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl ${item.bg} border-4 ${item.border} border-b-8 flex items-center justify-center opacity-30 shadow-sm`}>
          <item.icon className={`w-12 h-12 md:w-16 md:h-16 ${item.color}`} strokeWidth={2.5} />
        </div>
      ))}
    </motion.div>
  </div>
);

const AnimatedBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#f4f9fb]">
    <ConveyorBeltRow yOffset={10} speed={45} reverse={false} />
    <ConveyorBeltRow yOffset={45} speed={35} reverse={true} delay={2} />
    <ConveyorBeltRow yOffset={80} speed={50} reverse={false} delay={5} />
    <div className="absolute inset-0 backdrop-blur-[2px] bg-white/10" />
  </div>
);

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--color-game-bg)] text-[var(--color-game-text)] overflow-y-auto font-sans flex flex-col relative z-10">
      <AnimatedBackground />

      {/* Global Navbar */}
      <header className="w-full h-16 md:h-20 bg-white/40 backdrop-blur-xl border-b border-white/50 z-50 px-6 flex items-center justify-between shadow-sm relative">
        <div className="flex items-center gap-3 text-slate-900">
          <Factory className="w-6 h-6 md:w-8 md:h-8 text-amber-500" strokeWidth={2.5} />
          <span className="font-black tracking-tighter text-lg md:text-2xl">Employment Simulator™</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs md:text-sm font-mono font-bold text-slate-600 uppercase tracking-widest bg-white/60 px-4 py-2 rounded-full border border-slate-200/50 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            Status: Nominal
          </div>
        </div>
      </header>

      {/* Main Play Area */}
      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-6 py-12 flex flex-col items-center justify-center">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ ...SPRING_CONFIG, delay: 0.05 }}
          className="text-center mb-16 w-full"
        >
          <h1 className="text-6xl md:text-[7rem] font-black tracking-tighter mb-10 leading-[0.85] text-slate-800" style={{ textShadow: '0 8px 0 #E2E8F0, 0 16px 24px rgba(0,0,0,0.05)' }}>
            Employment<br /> Simulator™
          </h1>

          {/* Warning Box Subtitle */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: -1, transition: FAST_SPRING }}
            whileTap={{ scale: 0.95, rotate: 0, transition: FAST_SPRING }}
            className="bg-[#FCD34D] border-4 border-[#F59E0B] border-b-8 rounded-[24px] p-6 md:p-8 max-w-2xl mx-auto flex flex-col sm:flex-row gap-5 items-start text-left shadow-xl shadow-amber-500/10 cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.2 }}
              transition={FAST_SPRING}
              className="bg-amber-100 p-3 rounded-2xl shrink-0 border-2 border-amber-500 shadow-inner"
            >
              <ShieldAlert className="w-8 h-8 text-[#B45309]" strokeWidth={2.5} />
            </motion.div>
            <p className="font-mono text-[#B45309] text-sm md:text-base font-bold leading-relaxed uppercase tracking-tight">
              WARNING: THESE TOOLS WILL NOT INCREASE PRODUCTIVITY.<br className="hidden sm:block" />
              THEY WILL ONLY MAKE YOU LOOK INCREDIBLY BUSY.
            </p>
          </motion.div>
        </motion.div>

        {/* The "Worlds" (Bento Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.title}
              onClick={() => {
                if (dept.title === 'Linkedin Boaster') navigate('/social');
                else if (dept.title === 'Corp Emailizer') navigate('/emailizer');
                else if (dept.title === 'Excuse Generator') navigate('/excuse');
              }}
              initial={{ opacity: 0, scale: 0.8, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ ...SPRING_CONFIG, delay: 0.15 + (index * 0.1) }}
              whileHover={{
                y: -16,
                scale: 1.04,
                rotate: index === 0 ? 0.5 : (index % 2 === 0 ? 2 : -2),
                transition: FAST_SPRING
              }}
              whileTap={{ scale: 0.92, y: 5, rotate: 0, transition: FAST_SPRING }}
              className={`${index === 0 ? 'md:col-span-2' : 'md:col-span-1'} ${dept.colors.bg} ${dept.colors.text} border-x-4 border-t-4 border-b-[12px] ${dept.colors.shadow} rounded-[32px] p-8 cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[280px] md:min-h-[320px] shadow-lg shadow-slate-300/50 group block origin-bottom`}
            >
              {/* Top Section */}
              <div className="flex justify-between items-start mb-4 relative z-10">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -5, 5, 0], scale: 1.15 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/30 group-hover:bg-white/40 transition-colors shadow-inner"
                >
                  <dept.icon className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={2.5} />
                </motion.div>

                {/* Brutalist Touch inside Bubble UI */}
                <div className="font-mono text-[10px] sm:text-xs bg-black/20 px-3 py-1.5 rounded-full border border-black/10 text-white font-bold tracking-wider">
                  {dept.telemetry}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 mt-auto">
                <h2 className={`${index === 0 ? 'text-4xl md:text-5xl' : 'text-3xl'} font-black mb-3 tracking-tight drop-shadow-sm`}>
                  {dept.title}
                </h2>
                <p className={`font-medium text-white/90 ${index === 0 ? 'text-xl md:text-2xl max-w-xl' : 'text-lg'} leading-snug`}>
                  {dept.description}
                </p>
              </div>

              {/* Decorative Shine */}
              <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-[28px]" />
            </motion.div>
          ))}
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full text-center py-8 pb-12 font-mono text-slate-400 text-sm">
        <p>[ SYSTEM: The Corporate Factory™ is a completely serious business tool. ]</p>
        <p className="opacity-60">[ Any resemblance to real corporate absurdity is entirely intentional. ]</p>
      </footer>
    </div>
  );
}


