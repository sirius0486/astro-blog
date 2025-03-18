// "use client";

import { motion } from "motion/react";
import React, { useRef, useState } from "react";

function NavHeader() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      // className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1"
      className="relative mx-auto flex w-fitborder-black bg-white dark:bg-darkmode-body p-1"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      <Tab setPosition={setPosition} href="/blog">
        Blog
      </Tab>
      <Tab setPosition={setPosition} href="/about">
        About
      </Tab>
      <Tab setPosition={setPosition} href="/gallery">
        Gallery
      </Tab>
      <Tab setPosition={setPosition} href="/friends">
        Friends
      </Tab>
      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({
  children,
  setPosition,
  href,
}: {
  children: React.ReactNode;
  setPosition: any;
  href: string;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      <a href={href}>{children}</a>
    </li>
  );
};

const Cursor = ({ position }: { position: any }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12"
    />
  );
};

export default NavHeader;
