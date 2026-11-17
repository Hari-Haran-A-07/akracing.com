import { Link, useLocation } from 'react-router-dom';

const routeLabels = {
  cars: 'Fleet',
  shop: 'Merchandise',
  news: 'News Hub',
  racing: 'Racing',
  driver: 'Ajith Kumar',
  team: 'Team',
  calendar: 'Race Calendar',
  results: 'Results',
  technology: 'Technology',
  media: 'Media Centre',
  about: 'About AKR',
  contact: 'Contact',
  partners: 'Partners',
  stories: 'Stories',
  experiences: 'Experiences',
  live: 'Live Race',
  admin: 'Race Director',
  checkout: 'Checkout',
};

const Breadcrumb = () => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="px-6 py-3 text-sm font-mono">
      <ol className="flex items-center gap-2 text-gray-500">
        <li>
          <Link to="/" className="hover:text-red-500 transition-colors">HOME</Link>
        </li>
        {segments.map((seg, i) => {
          const path = '/' + segments.slice(0, i + 1).join('/');
          const label = (routeLabels[seg] || seg).toUpperCase();
          const isLast = i === segments.length - 1;
          return (
            <li key={path} className="flex items-center gap-2">
              <span className="text-gray-700">/</span>
              {isLast ? (
                <span className="text-white font-semibold">{label}</span>
              ) : (
                <Link to={path} className="hover:text-red-500 transition-colors">{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
