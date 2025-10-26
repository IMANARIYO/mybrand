import React from "react";
import { User } from "lucide-react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
    <CardHeader className="relative mb-16 p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/10 border border-primary/10 shadow-custom-lg">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
            {icon || <User className="h-10 w-10 text-primary" />}
          </div>
          <CardTitle className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {title}
          </CardTitle>
        </div>
        {subtitle && (
          <CardDescription className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {subtitle}
          </CardDescription>
        )}
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-full blur-2xl -z-10" />
    </CardHeader>
  );
}
