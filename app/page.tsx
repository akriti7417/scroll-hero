"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const textRef = useRef<any[]>([]);
  const statsRef = useRef<any[]>([]);
  const carRef = useRef(null);
  useEffect(() => {
  // 1. Text animation (keep this)
  gsap.from(textRef.current, {
    opacity: 0,
    y: 50,
    stagger: 0.05,
    duration: 1,
  });

  // 2. Stats animation (keep this)
  gsap.from(statsRef.current, {
    opacity: 0,
    y: 30,
    stagger: 0.2,
    delay: 0.8,
  });

  // 3. Scroll animation (ADD this)
  const handleScroll = () => {
    const scrollY = window.scrollY;

    gsap.to(carRef.current, {
      x: scrollY * 0.5,
      rotate: scrollY * 0.05,
      duration: 0.5,
    });
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const text = "WELCOME";

  return (
  <>
    <main className="h-screen flex flex-col justify-center items-center bg-black text-white relative">

      {/* HEADLINE */}
      <h1 className="text-4xl md:text-6xl font-bold tracking-[0.5em] flex flex-row">
        {text.split("").map((char, i) => (
          <span
            key={i}
            ref={(el) => (textRef.current[i] = el)}
            className="inline-block"
          >
            {char}
          </span>
        ))}
      </h1>

      {/* SUB TEXT */}
      <p className="mt-4 text-gray-400">ITZ FIZZ</p>

      {/* STATS */}
      <div className="flex gap-10 mt-10">
        {[
          { value: "95%", label: "Performance" },
          { value: "120%", label: "Engagement" },
          { value: "80%", label: "Growth" },
        ].map((item, i) => (
          <div
            key={i}
            ref={(el) => (statsRef.current[i] = el)}
            className="text-center"
          >
            <h2 className="text-2xl font-bold">{item.value}</h2>
            <p className="text-gray-400">{item.label}</p>
          </div>
        ))}
      </div>

      {/* CAR */}
      <img
  ref={carRef}
  src="https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.png"
  alt="car"
  className="absolute bottom-10 left-0 w-40 md:w-64"
/>

    </main>

    {/* 👇 ADD THIS FOR SCROLL */}
    <section className="h-[200vh] bg-gray-900"></section>
  </>
);
}