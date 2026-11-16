import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', text = 'Loading...', fullScreen = false }) => {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  const spinner = (
    <div className={fullScreen ? 'fixed inset-0 bg-black/90 flex items-center justify-center z-50' : 'flex flex-col items-center justify-center py-8'}>
      <motion.div
        className={sizes[size] + ' rounded-full border-red-600 border-t-transparent'}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      />
      {text && (
        <motion.p
          className="mt-4 text-gray-400 text-sm tracking-widest uppercase font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  return spinner;
};

export default LoadingSpinner;
