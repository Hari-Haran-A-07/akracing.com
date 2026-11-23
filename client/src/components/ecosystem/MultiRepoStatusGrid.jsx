import React from 'react';
import EcosystemRepoCard from './EcosystemRepoCard';

const MultiRepoStatusGrid = ({ repositories = [] }) => {
  return (
    <div className=\"w-full\">
      <div className=\"flex items-center justify-between mb-4\">
        <div>
          <h3 className=\"text-sm font-mono uppercase tracking-widest text-white font-bold\">
            Connected Ecosystem Repositories (5 Microservices)
          </h3>
          <p className=\"text-xs text-gray-400 mt-0.5\">
            Real-time synchronization across polyglot motorsport services
          </p>
        </div>
        <span className=\"px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-xs font-bold\">
          ALL SYSTEMS SYNCHRONIZED
        </span>
      </div>

      <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4\">
        {repositories.map((repo) => (
          <EcosystemRepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};

export default MultiRepoStatusGrid;
