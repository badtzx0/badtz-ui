"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef, RefObject } from "react";

interface SpaceshipScrollbarProps {
  targetRef: RefObject<HTMLElement>;
}

export function SpaceshipScrollbar({ targetRef }: SpaceshipScrollbarProps) {
  const { scrollYProgress } = useScroll({
    container: targetRef,
    layoutEffect: false,
  });
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Smooth spring animation for scroll progress
  const yProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    mass: 0.5,
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
      setLastScrollY(currentScrollY);
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsScrolling(false), 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, [lastScrollY]);

  return (
    <>
      <style jsx global>{`
        body::-webkit-scrollbar {
          display: none;
        }
        body {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>

      {/* Track */}
      <motion.div className="sticky right-6 top-[25px] bottom-[25px] w-[2px] z-50 h-[280px] left-full dark:bg-[rgba(255,255,255,0.03)] bg-[rgba(0,0,0,0.1)] dark:border-radius-[1px] border-radius-[1px] dark:backdrop-filter-blur-[8px] backdrop-filter-blur-[8px]">
        {/* Progress line */}
        <motion.div
          className="absolute top-0 right-0 w-full"
          style={{
            height: "100%",
            scaleY: yProgress,
            transformOrigin: "top",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)",
          }}
        />

        {/* Spaceship */}
        <motion.div
          className="absolute -left-[12px] w-[26px] h-[26px]"
          style={{
            top: useTransform(yProgress, [0, 1], ["0%", "100%"]),
            rotate: scrollDirection === "down" ? 0 : 180,
          }}
        >
          {/* Spaceship body */}
          <motion.div
            className="relative w-full h-full"
            animate={{
              scale: isScrolling ? [1, 1.05, 1] : 1,
              rotate: isScrolling
                ? [0, scrollDirection === "down" ? 5 : -5, 0]
                : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Main body - glass effect */}
            <div className="absolute inset-0 rounded-full dark:bg-gradient-to-br dark:from-white/20 dark:to-white/5 bg-gradient-to-br from-black/20 to-black/5 dark:backdrop-blur-sm backdrop-blur-sm dark:border dark:border-white/10 border border-black/10 shadow-lg" />

            {/* Inner glow */}
            <div className="absolute inset-1 rounded-full dark:bg-gradient-to-br dark:from-white/40 dark:to-transparent bg-gradient-to-br from-black/40 to-transparent blur-[1px]" />

            {/* Center core */}
            <div className="absolute inset-[30%] rounded-full dark:bg-white/80 bg-black/80 blur-[0.5px]" />

            {/* Thruster effects */}
            <motion.div
              className="absolute inset-x-0 -bottom-4"
              animate={
                isScrolling
                  ? {
                      opacity: [0.3, 0.8, 0.3],
                      scale: [0.8, 1, 0.8],
                    }
                  : { opacity: 0.3, scale: 0.8 }
              }
              transition={{
                duration: 0.5,
                repeat: isScrolling ? Number.POSITIVE_INFINITY : 0,
              }}
            >
              {/* Main thruster */}
              <div className="w-[2px] h-6 mx-auto dark:bg-gradient-to-b dark:from-white dark:to-transparent bg-gradient-to-b from-black to-transparent blur-[2px]" />

              {/* Side thrusters */}
              <div className="absolute top-1 left-[45%] w-[1px] h-4 dark:bg-gradient-to-b dark:from-white/50 dark:to-transparent bg-gradient-to-b from-black/50 to-transparent blur-[1px] rotate-[-15deg]" />
              <div className="absolute top-1 right-[45%] w-[1px] h-4 dark:bg-gradient-to-b dark:from-white/50 dark:to-transparent bg-gradient-to-b from-black/50 to-transparent blur-[1px] rotate-[15deg]" />
            </motion.div>

            {/* Particle effects */}
            {isScrolling && (
              <motion.div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={`particle-${Math.random().toString(36).substr(2, 9)}`}
                    className="absolute w-[2px] h-[2px] dark:bg-white/60 bg-black/60 rounded-full blur-[0.5px]"
                    initial={{
                      x: 0,
                      y: 0,
                      opacity: 0.8,
                    }}
                    animate={{
                      x: Math.random() * 40 - 20,
                      y: scrollDirection === "down" ? 20 : -20,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.5 + Math.random() * 0.3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: Math.random() * 0.2,
                    }}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default function SpaceshipScrollbarDemo() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      ref={scrollRef}
      className="space-scroll-container w-full h-[350px] overflow-scroll relative px-6 flex justify-start items-start disable-scrollbar"
    >
      <p className="font-mono text-sm text-muted-foreground p-12">
        Once upon a time, in a small village nestled at the foot of the Japanese
        mountains, there was a young boy named Haruto. Haruto was known for his
        insatiable curiosity and his love for the ancient legends his
        grandmother told him.
        <br />
        <br />
        One evening, as the moon shone brightly in the sky, Haruto sat by the
        fire with his grandmother. She told him the story of Ryujin, the dragon
        king of the seas. Ryujin lived in a coral palace at the bottom of the
        ocean and possessed a magical pearl that controlled the tides.
        <br />
        <br />
        Fascinated by this story, Haruto dreamed of meeting Ryujin. One day, he
        decided to set out on an adventure. He walked for days, crossing dense
        forests and rushing rivers, until he reached the coast.
        <br />
        <br />
        There, he met a giant turtle, who offered to take him to Ryujin's
        palace. Haruto gladly accepted and climbed onto the turtle's back.
        Together, they dove into the depths of the ocean.
        <br />
        <br />
        At the palace, Ryujin welcomed Haruto with kindness. The dragon,
        impressed by the boy's courage, offered him a fragment of his magical
        pearl. With this gift, Haruto could now understand the language of
        animals and the elements.
        <br />
        <br />
        Back in his village, Haruto used this gift to help his people,
        predicting storms and protecting the crops. He became a local hero, and
        his story was passed down from generation to generation, inspiring other
        young people to follow their dreams and respect nature.
        <br />
        <br />
        And so, Haruto, the curious boy, became a legend in his own right,
        thanks to his encounter with the dragon of the seas.
      </p>
      <SpaceshipScrollbar targetRef={scrollRef} />
    </div>
  );
}
