"use client";

import React, { ReactNode, useState, useRef, useEffect } from "react";

interface TooltipProps {
  children: ReactNode;
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      setIsTruncated(element.scrollWidth > element.clientWidth);
    }
  }, [text]);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => isTruncated && setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div ref={ref} className="truncate">
        {children}
      </div>
      {show && (
        <div className="absolute z-50 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap -top-6 left-0">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
