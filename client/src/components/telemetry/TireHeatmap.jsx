import React from 'react';
import { getTireTempColor } from '../../utils/colorUtils';

const TireBox = ({ label, temp, pressure }) => {
  const color = getTireTempColor(temp);

  return (
    <div className=\"p-3 rounded-xl border border-gray-800 bg-black/60 flex flex-col items-center justify-center font-mono\">
      <span className=\"text-[10px] text-gray-500 font-bold uppercase\">{label}</span>
      <span className=\"text-xl font-black mt-1\" style={{ color }}>{temp}Â°C</span>
      <span className=\"text-[10px] text-gray-400 mt-0.5\">{pressure} PSI</span>
    </div>
  );
};

const TireHeatmap = ({ tires = { fl: { temp: 88, psi: 27.5 }, fr: { temp: 92, psi: 28.0 }, rl: { temp: 96, psi: 28.2 }, rr: { temp: 94, psi: 28.1 } } }) => {
  return (
    <div className=\"p-5 rounded-2xl bg-gray-900/60 border border-gray-800 backdrop-blur-md\">
      <h4 className=\"text-xs font-mono font-bold uppercase tracking-wider text-gray-400 mb-4 text-center\">
        4-Wheel Tire Thermal Matrix
      </h4>
      <div className=\"grid grid-cols-2 gap-4 max-w-xs mx-auto\">
        <TireBox label=\"Front Left\" temp={tires.fl.temp} pressure={tires.fl.psi} />
        <TireBox label=\"Front Right\" temp={tires.fr.temp} pressure={tires.fr.psi} />
        <TireBox label=\"Rear Left\" temp={tires.rl.temp} pressure={tires.rl.psi} />
        <TireBox label=\"Rear Right\" temp={tires.rr.temp} pressure={tires.rr.psi} />
      </div>
    </div>
  );
};

export default TireHeatmap;
