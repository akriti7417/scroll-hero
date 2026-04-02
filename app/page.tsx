"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const headlineSpansRef = useRef<Array<HTMLSpanElement | null>>([]);
  const statsRef = useRef<Array<HTMLDivElement | null>>([]);
  const carWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const headlineSpans = headlineSpansRef.current.filter(
        Boolean
      ) as HTMLSpanElement[];

      const stats = statsRef.current.filter(
        Boolean
      ) as HTMLDivElement[];
      gsap.set(headlineSpans, { opacity: 0, y: 20 });
      gsap.to(headlineSpans, {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(stats, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        delay: 0.5,
        duration: 0.8,
      });

      gsap.to(carWrapRef.current, {
        x: "40vw",
        y: "-10vh",
        rotate: 8,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const text = "WELCOME ITZ FIZZ";

  return (
    <>
      <main
        ref={heroRef}
        className="relative h-screen flex flex-col justify-center items-center bg-black text-white overflow-hidden"
      >
        {/* HEADLINE */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-[0.5em] text-center flex flex-wrap justify-center">
          {text.split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => {
                headlineSpansRef.current[i] = el;
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* STATS */}
        <div className="flex gap-10 mt-10">
          {[
            { value: "95%", label: "Performance" },
            { value: "120%", label: "Engagement" },
            { value: "80%", label: "Growth" },
          ].map((item, i) => (
            <div
              key={i}
              ref={(el) => {
                statsRef.current[i] = el;
              }}
              className="text-center px-6 py-4 rounded-xl border border-white/10 bg-white/5"
            >
              <h2 className="text-2xl font-bold">{item.value}</h2>
              <p className="text-gray-400">{item.label}</p>
            </div>
          ))}
        </div>

        {/* CAR */}
        <div
          ref={carWrapRef}
          className="absolute bottom-16 left-10"
        >
          <img
            src="/car.png" 
            alt="car"
            className="w-40 md:w-64"
            draggable={false}
          />
        </div>
      </main>
      <section className="h-[200vh] bg-gray-900"></section>
    </>
  );
}