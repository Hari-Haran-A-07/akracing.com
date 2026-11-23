import React from 'react';

const MobileSyncQR = ({ pairingToken = 'AKR-MOBILE-9X82' }) => {
  return (
    <div className=\"p-6 rounded-2xl bg-gray-900/60 border border-gray-800 text-center font-mono max-w-sm mx-auto\">
      <span className=\"text-[10px] text-red-500 font-bold uppercase tracking-widest block mb-2\">
        Companion App Pairing
      </span>
      <h4 className=\"text-lg font-bold text-white mb-2\">akr-pitwall-mobile</h4>
      <p className=\"text-xs text-gray-400 mb-4\">
        Scan with pit crew mobile handset to link direct encrypted telemetry mirror
      </p>

      {/* Stylized QR placeholder */}
      <div className=\"w-36 h-36 mx-auto bg-white rounded-xl p-3 flex flex-col items-center justify-center shadow-xl mb-4\">
        <div className=\"w-full h-full border-4 border-black flex items-center justify-center font-bold text-xs text-black\">
          [AKR QR CODE]
        </div>
      </div>

      <div className=\"bg-black/60 border border-gray-800 p-2.5 rounded-lg text-xs\">
        <span className=\"text-gray-500 mr-2\">PAIR CODE:</span>
        <span className=\"text-white font-bold tracking-widest\">{pairingToken}</span>
      </div>
    </div>
  );
};

export default MobileSyncQR;
