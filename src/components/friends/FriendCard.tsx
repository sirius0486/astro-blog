"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";

interface FriendCardProps {
  name: string;
  avatar: string;
  bio: string;
  url: string;
}

export function FriendCard({ name, avatar, bio, url }: FriendCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <Card className="overflow-hidden h-full border-2 hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm hover:shadow-lg">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <motion.div
              className="relative mb-4"
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <div className="size-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 backdrop-blur-md p-[2px]">
                <Avatar className="size-full">
                  <AvatarImage
                    src={avatar}
                    alt={name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-xl font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute -right-1 -bottom-1 size-6 rounded-full bg-background flex items-center justify-center border-2 border-primary">
                <ExternalLink className="size-3 text-primary" />
              </div>
            </motion.div>

            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
              {name}
            </h3>

            <p className="text-sm text-muted-foreground">{bio}</p>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  );
}
