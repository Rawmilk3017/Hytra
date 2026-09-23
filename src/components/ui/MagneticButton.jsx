import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';

export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  onClick,
  href,
  target,
  rel,
  dataCursor,
  ariaLabel,
  disabled = false,
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { playInteractionSound } = useAudio();

  const handleMouseMove = (e) => {
    if (disabled || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    setPosition({
      x: middleX * strength,
      y: middleY * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    playInteractionSound('hover');
  };

  const handleClick = (e) => {
    playInteractionSound('click');
    if (onClick) onClick(e);
  };

  const Tag = href ? motion.a : motion.button;

  return (
    <Tag
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.2 }}
      data-cursor={dataCursor || (href ? 'link' : 'hover')}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
    >
      {children}
    </Tag>
  );
}
