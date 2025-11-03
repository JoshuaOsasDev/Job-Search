"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
type DirectionVariants = Variants & {
  enter: (direction: number) => {
    x: string;
    opacity: number;
    rotateY: number;
  };
  center: {
    zIndex: number;
    x: number;
    opacity: number;
    rotateY: number;
    transition: {
      duration: number;
      ease: string;
    };
  };
  exit: (direction: number) => {
    zIndex: number;
    x: string;
    opacity: number;
    rotateY: number;
    transition: {
      duration: number;
      ease: string;
    };
  };
};

const slides = [
  {
    id: 1,
    image: "/image3.jpg",
    title: "Find Your Dream Job",
    text: "Explore thousands of job listings tailored to your skills and goals.",
  },
  {
    id: 2,
    image: "/background2.jpg",
    title: "Connect with Top Companies",
    text: "Get discovered by employers actively searching for talent like you.",
  },
  {
    id: 3,
    image: "/image2.webp",
    title: "Advance Your Career",
    text: "Apply easily and track your progress all in one place.",
  },
];

export default function Slider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // +1 for next, -1 for previous

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  };

  //   const prevSlide = () => {
  //     setDirection(-1);
  //     setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  //   };

  const variants: DirectionVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      rotateY: direction > 0 ? 90 : -90, // rotate as it enters
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      rotateY: direction > 0 ? -90 : 90, // rotate as it exits
      transition: { duration: 0.7, ease: "easeInOut" },
    }),
  };

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-xl perspective-[1000px]">
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={slides[index].id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <Image
            src={slides[index].image}
            alt={slides[index].title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 rounded-xl bg-black/50" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h3 className="text-2xl font-semibold">{slides[index].title}</h3>
            <p className="mt-2 max-w-sm text-gray-200">{slides[index].text}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      {/* <div className="absolute inset-y-0 flex w-full items-center justify-between px-3 text-white">
        <button
          onClick={prevSlide}
          className="rounded-full bg-black/40 p-2 hover:bg-black/60"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="rounded-full bg-black/40 p-2 hover:bg-black/60"
        >
          ›
        </button>
      </div> */}

      {/* Dots indicator */}
      <div className="absolute right-6 bottom-4 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={`h-2 w-2 rounded-full ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
