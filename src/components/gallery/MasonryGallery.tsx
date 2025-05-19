"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Image = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

interface MasonryGalleryProps {
  images: Image[];
  columns?: number;
}

export default function MasonryGallery({
  images,
  columns = 3,
}: MasonryGalleryProps) {
  const [visibleImages, setVisibleImages] = useState<Image[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // 响应式列数设置
  const [columnCount, setColumnCount] = useState(columns);

  useEffect(() => {
    // 根据屏幕宽度调整列数
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setColumnCount(1);
      } else if (window.innerWidth < 1024) {
        setColumnCount(2);
      } else {
        setColumnCount(columns);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [columns]);

  useEffect(() => {
    // 初始加载时显示前几张图片
    setVisibleImages(images.slice(0, 6));

    // 设置 Intersection Observer 用于懒加载
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const lastEntry = entries[0];
        if (lastEntry.isIntersecting && visibleImages.length < images.length) {
          // 当滚动到最后一个元素时，再加载更多图片
          setVisibleImages((prev) => [
            ...prev,
            ...images.slice(prev.length, prev.length + 3),
          ]);
        }
      },
      { threshold: 0.1 }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [images]);

  // 当可见图片数量变化时，观察最后一个元素
  useEffect(() => {
    if (galleryRef.current && observerRef.current) {
      const items = galleryRef.current.querySelectorAll(".gallery-item");
      if (items.length > 0) {
        observerRef.current.observe(items[items.length - 1]);
      }
    }
  }, [visibleImages]);

  // 创建瀑布流列
  const createColumns = () => {
    const cols: Image[][] = Array.from({ length: columnCount }, () => []);

    visibleImages.forEach((image, i) => {
      // 根据图片高宽比分配到对应的列中
      const shortestColIndex = cols
        .map((col) => col.reduce((acc, img) => acc + img.height / img.width, 0))
        .reduce(
          (minIndex, height, i, heights) =>
            height < heights[minIndex] ? i : minIndex,
          0
        );

      cols[shortestColIndex].push(image);
    });

    return cols;
  };

  const handleImageLoad = () => {
    setLoadedCount((prev) => prev + 1);
  };

  const galleryColumns = createColumns();

  return (
    <div ref={galleryRef} className="w-full">
      <div className="flex gap-4">
        {galleryColumns.map((column, colIndex) => (
          <div key={colIndex} className="flex-1 flex flex-col gap-4">
            {column.map((image, imgIndex) => {
              const delay = (colIndex + imgIndex) * 0.1;
              return (
                <motion.div
                  key={`${colIndex}-${imgIndex}-${image.src}`}
                  className="gallery-item relative overflow-hidden rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay }}
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.2 },
                  }}
                >
                  <motion.div
                    className="relative aspect-auto"
                    style={{
                      paddingBottom: `${(image.height / image.width) * 100}%`,
                    }}
                  >
                    <motion.img
                      src={image.src}
                      alt={image.alt}
                      className={cn(
                        "absolute inset-0 w-full h-full object-cover",
                        "transition-opacity duration-300",
                        loadedCount < visibleImages.length
                          ? "opacity-0"
                          : "opacity-100"
                      )}
                      onLoad={handleImageLoad}
                      loading="lazy"
                    />
                    {loadedCount < visibleImages.length && (
                      <div className="absolute inset-0 flex items-center justify-center bg-muted">
                        <div className="size-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      {visibleImages.length < images.length && (
        <div className="w-full flex justify-center mt-8">
          <div className="size-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
