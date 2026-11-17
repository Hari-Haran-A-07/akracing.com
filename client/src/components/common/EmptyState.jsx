import { motion } from 'framer-motion';

const presets = {
  noResults: { icon: 'ðŸ”', title: 'No Results Found', subtitle: 'Try adjusting your search or filters.' },
  noData: { icon: 'ðŸ“­', title: 'Nothing Here Yet', subtitle: 'Check back soon for updates.' },
  error: { icon: 'âš ï¸', title: 'Something Went Wrong', subtitle: 'Please try again later.' },
  noRaces: { icon: 'ðŸ', title: 'No Races Scheduled', subtitle: 'The next race weekend is being finalized.' },
  emptyCart: { icon: 'ðŸ›’', title: 'Your Cart is Empty', subtitle: 'Explore our official AKR merchandise.' },
  noNews: { icon: 'ðŸ“°', title: 'No News Available', subtitle: 'Stay tuned for the latest from the paddock.' },
};

const EmptyState = ({ preset, icon, title, subtitle, action, actionLabel }) => {
  const config = preset ? presets[preset] || presets.noData : {};
  const displayIcon = icon || config.icon || 'ðŸ“­';
  const displayTitle = title || config.title || 'Nothing Here';
  const displaySubtitle = subtitle || config.subtitle || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="text-5xl mb-4">{displayIcon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{displayTitle}</h3>
      {displaySubtitle && <p className="text-gray-400 max-w-md mb-6">{displaySubtitle}</p>}
      {action && (
        <button
          onClick={action}
          className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm tracking-wide"
        >
          {actionLabel || 'TRY AGAIN'}
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;
