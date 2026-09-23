import { useState, useEffect } from 'react';

export function useScrollProgress() {
  const [scrollData, setScrollData] = useState({
    scrollY: 0,
    progress: 0, // 0 to 1
    activeSection: 'hero',
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;

      // Detect active section based on offsets
      const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'github', 'discord', 'contact'];
      let currentSection = 'hero';

      const viewportMiddle = scrollY + window.innerHeight * 0.35;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (viewportMiddle >= top && viewportMiddle < top + height) {
            currentSection = sectionId;
            break;
          }
        }
      }

      setScrollData({
        scrollY,
        progress,
        activeSection: currentSection,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial computation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollData;
}
