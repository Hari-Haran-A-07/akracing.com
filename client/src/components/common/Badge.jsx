const variants = {
  default: 'bg-gray-700 text-gray-200',
  primary: 'bg-red-600 text-white',
  success: 'bg-green-600 text-white',
  warning: 'bg-yellow-600 text-black',
  danger: 'bg-red-800 text-white',
  info: 'bg-blue-600 text-white',
  live: 'bg-red-600 text-white animate-pulse',
  purple: 'bg-purple-600 text-white',
  p1: 'bg-yellow-400 text-black',
  p2: 'bg-gray-300 text-black',
  p3: 'bg-amber-700 text-white',
};

const sizes = {
  sm: 'px-1.5 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

const Badge = ({ children, variant = 'default', size = 'md', dot = false, className = '' }) => {
  return (
    <span
      className={
        'inline-flex items-center gap-1.5 font-bold uppercase tracking-wider rounded-full ' +
        (variants[variant] || variants.default) + ' ' +
        (sizes[size] || sizes.md) + ' ' +
        className
      }
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
};

export default Badge;
