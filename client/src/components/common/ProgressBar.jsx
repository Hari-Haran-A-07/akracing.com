import { motion } from 'framer-motion';

const variants = {
  default: 'bg-red-600',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  blue: 'bg-blue-600',
  gradient: 'bg-gradient-to-r from-red-600 via-orange-500 to-amber-400',
};

const ProgressBar = ({
  progress = 0,
  max = 100,
  variant = 'default',
  showLabel = false,
  label,
  height = 'h-2',
  striped = false,
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, (progress / max) * 100));

  return (
    <div className={w-full \}>
      {showLabel && (
        <div className=\"flex justify-between items-center mb-1.5 text-xs font-mono\">
          <span className=\"text-gray-400 uppercase tracking-wider\">{label}</span>
          <span className=\"text-white font-bold\">{percentage.toFixed(0)}%</span>
        </div>
      )}
      <div className={w-full bg-gray-800 rounded-full overflow-hidden \}>
        <motion.div
          className={h-full rounded-full transition-all \ \}
          initial={{ width: 0 }}
          animate={{ width: \% }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
