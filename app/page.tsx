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

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const headlineSpans = headlineSpansRef.current.filter(
        Boolean
      ) as HTMLSpanElement[];
      const stats = statsRef.current.filter(Boolean) as HTMLDivElement[];

      // 1) Headline reveal (fade + slight movement, staggered letters)
      gsap.set(headlineSpans, { opacity: 0, y: 18, rotateX: -20 });
      gsap.to(headlineSpans, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.03,
      });

      // 2) Impact stats intro (one by one with subtle delay)
      gsap.from(stats, {
        opacity: 0,
        y: 22,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.18,
        delay: 0.35,
      });

      // 3) Scroll-driven hero animation (scrubbed, transform-based)
      gsap.to(carWrapRef.current, {
        x: "38vw",
        y: "-10vh",
        rotate: 18,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1, // smooth mapping for premium feel
        },
      });
    }, heroRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const headline = "W E L C O M E I T Z F I Z Z";
  const stats = [
    { value: "95%", label: "Performance", desc: "Low-latency interactions" },
    { value: "120%", label: "Engagement", desc: "Higher attention & dwell" },
    { value: "80%", label: "Growth", desc: "Stronger conversion signals" },
  ];

  return (
    <>
      <main
        ref={heroRef}
        className="relative h-screen overflow-hidden bg-black text-white flex flex-col justify-center items-center"
      >
        {/* HEADLINE */}
        <h1 className="text-4xl md:text-6xl font-bold whitespace-pre leading-none">
          {headline.split("").map((char, i) => (
            <span
              key={`${char}-${i}`}
              ref={(el) => {
                headlineSpansRef.current[i] = el;
              }}
              className="inline-block will-change-transform"
            >
              {char}
            </span>
          ))}
        </h1>

        {/* STATS */}
        <div className="flex flex-wrap justify-center gap-10 mt-10 px-6">
          {stats.map((item, i) => (
            <div
              key={item.value + item.label}
              ref={(el) => {
                statsRef.current[i] = el;
              }}
              className="text-center w-[180px] md:w-[220px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-6 py-5"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold">
                {item.value}
              </h2>
              <p className="text-gray-300 mt-1 font-semibold">{item.label}</p>
              <p className="text-gray-400 text-sm mt-2">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CAR (scroll-driven) */}
        <div
          ref={carWrapRef}
          className="absolute bottom-12 left-10 md:left-16 will-change-transform pointer-events-none"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/car.png"
            alt="car"
            className="w-40 md:w-64"
            draggable={false}
          />
        </div>
      </main>

      {/* Extra scroll space to demonstrate the scrubbed animation */}
      <section className="h-[200vh] bg-gray-900" />
    </>
  );
}