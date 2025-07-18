"use client";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import React from "react";

// Loader 1 — Bouncing Dots
export const LoaderOne = () => {
    const transition = (x: number): Transition => ({
        duration: 1,
        repeat: Infinity,
        repeatType: "loop",
        delay: x * 0.2,
        ease: "easeInOut",
    });

    return (
        <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    initial={{ y: 0 }}
                    animate={{ y: [0, 10, 0] }}
                    transition={transition(i)}
                    className="h-4 w-4 rounded-full border border-neutral-300 bg-gradient-to-b from-neutral-400 to-neutral-300"
                />
            ))}
        </div>
    );
};

// Loader 2 — Horizontal Movement
export const LoaderTwo = () => {
    const transition = (x: number): Transition => ({
        duration: 1,
        repeat: Infinity,
        repeatType: "loop",
        delay: x * 0.2,
        ease: "easeInOut",
    });

    return (
        <div className="flex items-center gap-2">
            {[0, 0.4, 0.8].map((delay, i) => (
                <motion.div
                    key={i}
                    initial={{ x: 0 }}
                    animate={{ x: [0, 20, 0] }}
                    transition={transition(delay)}
                    className={`h-4 w-4 rounded-full bg-neutral-200 shadow-md dark:bg-neutral-500 ${i === 1 ? "-translate-x-2" : i === 2 ? "-translate-x-4" : ""}`}
                />
            ))}
        </div>
    );
};

// Loader 3 — Arrow Drawing
export const LoaderThree = () => {
    return (
        <div className="flex justify-center items-center">
            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-neutral-500 dark:stroke-neutral-100"
            >
                <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <motion.path
                    initial={{ pathLength: 0, fill: "#ffffff00" }}
                    animate={{ pathLength: 1, fill: "#facc15" }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    d="M13 3v7h6L11 21v-7H5l8-11"
                />
            </motion.svg>
        </div>
    );
};

// Loader 4 — Text Flicker
export const LoaderFour = ({ text = "Loading..." }: { text?: string }) => {
    return (
        <div className="relative font-bold text-black dark:text-white text-2xl">
            <motion.span
                animate={{ skewX: [0, -40, 0], scaleX: [1, 2, 1] }}
                transition={{
                    duration: 0.05,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 2,
                    ease: "linear",
                }}
                className="relative z-20 inline-block"
            >
                {text}
            </motion.span>

            {/* Green Shadow */}
            <motion.span
                className="absolute inset-0 text-[#00e571]/50 blur-sm dark:text-[#00e571]"
                animate={{
                    x: [-2, 4, -3, 1.5, -2],
                    y: [-2, 4, -3, 1.5, -2],
                    opacity: [0.3, 0.9, 0.4, 0.8, 0.3],
                }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                }}
            >
                {text}
            </motion.span>

            {/* Purple Shadow */}
            <motion.span
                className="absolute inset-0 text-[#8b00ff]/50 dark:text-[#8b00ff]"
                animate={{
                    x: [0, 1, -1.5, 1.5, -1, 0],
                    y: [0, -1, 1.5, -0.5, 0],
                    opacity: [0.4, 0.8, 0.3, 0.9, 0.4],
                }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                }}
            >
                {text}
            </motion.span>
        </div>
    );
};
