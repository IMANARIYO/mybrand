import React from "react";
import { User } from "lucide-react";

interface SectionHeaderProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  icon?: React.ReactNode; // optional custom icon
}

export function SectionHeader({
  title,
  subtitle,
  icon,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col items-start justify-sart text-start space-y-2 mb-12 bg-info/5 p-6 rounded-lg">
      <div className="flex items-start space-x-3">
        {icon || <User className="h-10 w-10 text-primary" />}
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-lg md:text-xl text-muted-foreground/80 leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
