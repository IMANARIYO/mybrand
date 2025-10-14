/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export const AboutHeader = () => {
  return (
    <Card className="mb-8 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-2">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-5xl font-bold tracking-tight mb-4">
          Who is
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Imanariyo Baptiste
          </span>
          ?
        </CardTitle>
        <CardDescription className="text-xl max-w-3xl mx-auto">
          Full-Stack Software Engineer | Problem Solver | Innovation Driver
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg text-center leading-relaxed max-w-4xl mx-auto">
          I'm a passionate full-stack engineer who transforms complex business challenges into scalable,
          user-centered digital solutions. With expertise in modern web and mobile technologies,
          I deliver high-performance applications that drive real business impact.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-semibold text-primary mb-1">Innovation</h3>
              <p className="text-sm text-muted-foreground">Cutting-edge solutions with modern tech stack</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-secondary mb-1">Performance</h3>
              <p className="text-sm text-muted-foreground">Optimized, scalable, and reliable systems</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-accent mb-1">Results</h3>
              <p className="text-sm text-muted-foreground">Measurable impact and business value</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};