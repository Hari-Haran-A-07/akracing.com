import { useEffect } from 'react';

const SEO_DEFAULTS = {
  siteName: 'Ajith Kumar Racing',
  separator: ' | ',
  defaultDescription: 'Official motorsport platform for Ajith Kumar Racing (AKR). Racing. Performance. Precision.',
  defaultImage: '/akr-og-image.jpg',
};

const SEOMeta = ({ title, description, image, url, type = 'website' }) => {
  useEffect(() => {
    const fullTitle = title
      ? title + SEO_DEFAULTS.separator + SEO_DEFAULTS.siteName
      : SEO_DEFAULTS.siteName;

    document.title = fullTitle;

    const setMeta = (name, content) => {
      if (!content) return;
      let el = document.querySelector('meta[name=\"' + name + '\"], meta[property=\"' + name + '\"]');
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(name.startsWith('og:') ? 'property' : 'name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description || SEO_DEFAULTS.defaultDescription);
    setMeta('og:title', fullTitle);
    setMeta('og:description', description || SEO_DEFAULTS.defaultDescription);
    setMeta('og:image', image || SEO_DEFAULTS.defaultImage);
    setMeta('og:type', type);
    if (url) setMeta('og:url', url);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description || SEO_DEFAULTS.defaultDescription);
  }, [title, description, image, url, type]);

  return null;
};

export default SEOMeta;
