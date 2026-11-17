const Skeleton = ({ variant = 'text', width, height, count = 1, className = '' }) => {
  const baseClass = 'bg-gray-800 animate-pulse rounded';

  const variantStyles = {
    text: 'h-4 rounded',
    title: 'h-6 w-3/4 rounded',
    avatar: 'w-12 h-12 rounded-full',
    thumbnail: 'w-full h-48 rounded-lg',
    card: 'w-full h-64 rounded-xl',
    button: 'h-10 w-32 rounded-lg',
    badge: 'h-6 w-20 rounded-full',
  };

  const style = {};
  if (width) style.width = typeof width === 'number' ? width + 'px' : width;
  if (height) style.height = typeof height === 'number' ? height + 'px' : height;

  const items = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={baseClass + ' ' + (variantStyles[variant] || variantStyles.text) + ' ' + className}
      style={style}
    />
  ));

  return count > 1 ? <div className="flex flex-col gap-3">{items}</div> : items[0];
};

export default Skeleton;
