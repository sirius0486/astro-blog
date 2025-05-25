"use client";

import socialConfig from "@/config/social.json";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Frontend Developer & UI/UX Enthusiast";
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [typedText, fullText]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background to-background/80 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/5"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 0.3 + Math.random() * 0.2,
              scale: 0.8 + Math.random() * 0.5,
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <main className="container relative z-10 flex flex-col items-center justify-items-start py-12 min-h-screen px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-center max-w-3xl w-full text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Avatar with animation */}
          <motion.div
            className="relative mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          >
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20 p-1">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/40 to-primary/20 animate-spin-slow" />
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <img
                  src={"/images/avatar.jpeg"}
                  alt="Avatar"
                  width="150"
                  height="150"
                />
              </div>
            </div>
          </motion.div>

          {/* Name with animation */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text bg-gradient-to-r from-primary to-primary/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Sirius
          </motion.h1>

          {/* Typing effect */}
          <div className="h-8 mt-4 mb-6">
            <motion.p
              className="text-lg sm:text-xl text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {typedText}
              {!isComplete && (
                <span className="inline-block w-1 h-5 ml-1 bg-primary animate-blink" />
              )}
            </motion.p>
          </div>

          {/* Description with animation */}
          <motion.p
            className="text-base sm:text-lg max-w-2xl mb-8 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            I'm passionate about creating beautiful, functional, and accessible
            web experiences. With expertise in React, Next.js, and Hono.js, I
            build applications that are both visually appealing and performant.
          </motion.p>

          {/* Social links with hover animations */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            {socialConfig.main.map((social) => {
              const Icon = Icons[
                social.icon as keyof typeof Icons
              ] as React.ElementType;
              return (
                <SocialLink
                  key={social.label}
                  href={social.href}
                  icon={<Icon />}
                  label={social.label}
                />
              );
            })}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex items-center justify-center w-12 h-12 rounded-full",
          "bg-background border border-border shadow-sm",
          "text-foreground hover:text-primary hover:border-primary",
          "transition-all duration-300"
        )}
        aria-label={label}
      >
        {icon}
      </a>
    </motion.div>
  );
}
