import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDeviceQuality } from '../hooks/useDeviceQuality';

const QualityContext = createContext({
  tier: 'high',
  dpr: 1.5,
  isMobile: false,
  hasWebGL: true,
  particleCount: 700,
  enablePostProcessing: true,
  setTierOverride: () => {},
});

export function QualityProvider({ children }) {
  const autoQuality = useDeviceQuality();
  const [tierOverride, setTierOverride] = useState(null);

  const effectiveTier = tierOverride || autoQuality.tier;

  const currentSettings = {
    ...autoQuality,
    tier: effectiveTier,
    particleCount: effectiveTier === 'low' ? 220 : effectiveTier === 'medium' ? 450 : 750,
    enablePostProcessing: effectiveTier !== 'low',
    setTierOverride,
  };

  return (
    <QualityContext.Provider value={currentSettings}>
      {children}
    </QualityContext.Provider>
  );
}

export function useQuality() {
  return useContext(QualityContext);
}
