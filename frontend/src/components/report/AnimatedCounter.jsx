import { useEffect, useRef, useState } from "react";

const AnimatedCounter = ({ value = 0, suffix = "", prefix = "", decimals = 0, className = "" }) => {
  const [displayValue, setDisplayValue] = useState(Number.isFinite(value) ? value : 0);
  const displayValueRef = useRef(displayValue);

  useEffect(() => {
    const duration = 850;
    const start = performance.now();
    const from = Number.isFinite(displayValueRef.current) ? displayValueRef.current : 0;
    const to = Number.isFinite(value) ? value : 0;
    let frameId;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = from + (to - from) * eased;
      displayValueRef.current = nextValue;
      setDisplayValue(nextValue);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [value]);

  const formatted = Number.isFinite(displayValue) ? displayValue.toFixed(decimals) : "0";

  return (
    <span className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;