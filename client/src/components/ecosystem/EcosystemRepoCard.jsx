import React from 'react';

const EcosystemRepoCard = ({ repo }) => {
  return (
    <div className=\"p-5 rounded-2xl bg-gray-900/60 border border-gray-800 backdrop-blur-md hover:border-gray-700 transition-all flex flex-col justify-between\">
      <div>
        <div className=\"flex items-center justify-between mb-2\">
          <span className=\"px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-600/20 text-red-400 border border-red-600/40 uppercase\">
            {repo.language}
          </span>
          <span className=\"inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 font-bold\">
            <span className=\"w-2 h-2 rounded-full bg-emerald-500 animate-pulse\" />
            {repo.status || 'ONLINE'}
          </span>
        </div>

        <h4 className=\"text-base font-bold text-white font-mono mb-1\">{repo.name}</h4>
        <p className=\"text-xs text-gray-400 font-sans leading-relaxed mb-4\">{repo.role}</p>
      </div>

      <div className=\"pt-3 border-t border-gray-800/80 flex items-center justify-between text-[11px] font-mono text-gray-400\">
        <span>Port: {repo.port}</span>
        <a
          href={repo.url}
          target=\"_blank\"
          rel=\"noopener noreferrer\"
          className=\"text-red-400 hover:text-red-300 transition-colors uppercase font-bold\"
        >
          View Repo ↗
        </a>
      </div>
    </div>
  );
};

export default EcosystemRepoCard;
