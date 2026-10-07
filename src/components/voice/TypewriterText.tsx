import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number; // ms per character
  isStreaming?: boolean;
  onComplete?: () => void;
  className?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 14,
  isStreaming = true,
  onComplete,
  className = '',
}) => {
  const [displayedLength, setDisplayedLength] = useState(isStreaming ? 0 : text.length);

  useEffect(() => {
    if (!isStreaming) {
      setDisplayedLength(text.length);
      return;
    }

    setDisplayedLength(0);
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current <= text.length) {
        setDisplayedLength(current);
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, isStreaming, onComplete]);

  const displayedText = text.slice(0, displayedLength);

  return (
    <span className={className}>
      {displayedText}
      {isStreaming && displayedLength < text.length && (
        <span className="inline-block w-1.5 h-3.5 bg-blue-500 ml-0.5 animate-pulse rounded-full align-middle" />
      )}
    </span>
  );
};

