import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import {
  Briefcase, Calendar, Users, TrendingUp, Award,
  Target, Zap, Code2, Globe, Rocket
} from "lucide-react";
import { experience } from "../../data/about";

export const ExperienceSection = () => {
  const getImpactMetrics = (position: string) => {
    switch (position) {
      case "Senior Full Stack Developer":
        return [
          { label: "Users Served", value: "10,000+", icon: Users },
          { label: "Performance Gain", value: "40%", icon: TrendingUp },
          { label: "Projects Delivered", value: "15+", icon: Award }
        ]
      case "Full Stack Developer":
        return [
          { label: "Applications Built", value: "8+", icon: Code2 },
          { label: "Load Time Improvement", value: "50%", icon: Zap },
          { label: "Team Productivity", value: "Enhanced", icon: Users }
        ]
      default:
        return [
          { label: "Mobile Apps", value: "Multiple", icon: Globe },
          { label: "Learning Focus", value: "Cross-platform", icon: Target },
          { label: "Team Skills", value: "Collaborative", icon: Users }
        ]
    }
  }

  const getTechStack = (position: string) => {
    switch (position) {
      case "Senior Full Stack Developer":
        return ["React", "Next.js", "Node.js", "MongoDB", "TypeScript", "CI/CD"]
      case "Full Stack Developer":
        return ["React", "TypeScript", "Spring Boot", "REST APIs", "PostgreSQL"]
      default:
        return ["React Native", "Flutter", "Agile", "Git", "Mobile Development"]
    }
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Briefcase className="h-6 w-6" />
          Professional Experience & Impact
        </CardTitle>
        <CardDescription>
          Real-world projects delivering measurable business value through innovative solutions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {experience.map((exp, index) => {
            const metrics = getImpactMetrics(exp.position)
            const techStack = getTechStack(exp.position)

            return (
              <AccordionItem key={exp.position} value={`item-${index}`} className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-4 text-left w-full">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <exp.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-lg text-left">{exp.position}</h3>
                          <p className="text-primary font-semibold text-left">{exp.company}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span className="font-medium">{exp.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="pb-6">
                  <Card className="mt-4">
                    <CardContent className="p-6 space-y-6">
                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed text-balance">
                        {exp.description}
                      </p>

                      <Separator />

                      {/* Impact Metrics */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Target className="h-4 w-4 text-primary" />
                          Key Impact & Results
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {metrics.map((metric, idx) => {
                            const IconComponent = metric.icon
                            return (
                              <Card key={idx} className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 rounded-lg bg-primary/20">
                                    <IconComponent className="h-4 w-4 text-primary" />
                                  </div>
                                  <div>
                                    <div className="font-bold text-lg text-primary">{metric.value}</div>
                                    <div className="text-xs text-muted-foreground font-medium">{metric.label}</div>
                                  </div>
                                </div>
                              </Card>
                            )
                          })}
                        </div>
                      </div>

                      <Separator />

                      {/* Tech Stack */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Code2 className="h-4 w-4 text-primary" />
                          Technologies & Tools
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {techStack.map((tech, idx) => (
                            <Badge key={idx} variant="secondary" className="px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>

        
        {/* Career Progression Summary */}
        <Card className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-2 border-dashed border-primary/20 mt-6">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-3 rounded-full bg-primary/20">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Career Growth & Impact</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Progressive advancement from intern to senior developer, consistently delivering
                high-impact solutions while mentoring teams and driving technical excellence across
                diverse projects and technologies.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <Badge className="px-4 py-2">4+ Years Experience</Badge>
                <Badge variant="secondary" className="px-4 py-2">25+ Projects</Badge>
                <Badge variant="outline" className="px-4 py-2">Team Leadership</Badge>
                <Badge variant="outline" className="px-4 py-2">Mentorship</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}