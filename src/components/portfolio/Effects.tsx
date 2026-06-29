import { useEffect, useState } from "react";

export function Scramble({ text, className }: { text: string; className?: string }) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    const chars = "!<>-_\\/[]{}—=+*^?#________01";
    let frame = 0;
    let raf = 0;
    const total = 24;
    const tick = () => {
      let s = "";
      for (let i = 0; i < text.length; i++) {
        const start = Math.floor((i / text.length) * total * 0.6);
        if (frame >= start + 10) s += text[i];
        else if (frame >= start) s += chars[Math.floor(Math.random() * chars.length)];
        else s += " ";
      }
      setOut(s);
      frame++;
      if (frame < total + 12) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [text]);
  return <span className={className}>{out}</span>;
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const dur = 1800;
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <span>{n.toLocaleString()}{suffix}</span>;
}
