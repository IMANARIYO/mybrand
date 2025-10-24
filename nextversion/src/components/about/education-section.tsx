import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { GraduationCap, Lightbulb, FlaskConical, BookOpen, Calendar, Award, Target } from "lucide-react";
import { education } from "../../data/about";

export const EducationSection = () => {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <GraduationCap className="h-6 w-6" />
          Education & Foundation
        </CardTitle>
        <CardDescription>
          Strong academic foundation supporting technical expertise and continuous learning mindset
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {education.map((edu, index) => {
            const getEducationHighlights = (degree: string) => {
              if (degree.includes("Bachelor")) {
                return [
                  { label: "GPA", value: "3.8/4.0", description: "Graduated with Honors" },
                  { label: "Focus Areas", value: "Full-Stack Dev", description: "Specialized in web technologies" },
                  { label: "Projects", value: "12+ Academic", description: "Capstone & coursework projects" }
                ]
              } else {
                return [
                  { label: "Certifications", value: "5+ Completed", description: "Industry-recognized credentials" },
                  { label: "Learning Path", value: "Continuous", description: "Ongoing skill development" },
                  { label: "Technologies", value: "Modern Stack", description: "Latest frameworks & tools" }
                ]
              }
            }
            
            const highlights = getEducationHighlights(edu.degree)
            
            return (
              <AccordionItem key={edu.institution} value={`edu-${index}`} className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-4 text-left w-full">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <edu.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-lg text-left line-clamp-1">{edu.degree}</h3>
                          <p className="text-primary font-semibold text-left">{edu.institution}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span className="font-medium">{edu.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="pb-6">
                  <Card className="mt-4">
                    <CardContent className="p-6 space-y-6">
                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed">
                        {edu.description}
                      </p>

                      <Separator />

                      {/* Education Highlights */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Target className="h-4 w-4 text-primary" />
                          Academic Highlights
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {highlights.map((highlight, idx) => (
                            <Card key={idx} className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                              <div className="text-center space-y-2">
                                <div className="font-bold text-lg text-primary">{highlight.value}</div>
                                <div className="text-sm font-semibold">{highlight.label}</div>
                                <div className="text-xs text-muted-foreground">{highlight.description}</div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Key Learning Areas */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Award className="h-4 w-4 text-primary" />
                          Key Learning Areas
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card className="p-4 bg-primary/5">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-primary/20">
                                <Lightbulb className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-primary">Technical Foundation</h4>
                                <p className="text-sm text-muted-foreground">Core CS principles & algorithms</p>
                              </div>
                            </div>
                          </Card>
                          
                          <Card className="p-4 bg-secondary/5">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-secondary/20">
                                <FlaskConical className="h-4 w-4 text-secondary" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-secondary">Practical Application</h4>
                                <p className="text-sm text-muted-foreground">Hands-on project experience</p>
                              </div>
                            </div>
                          </Card>
                        </div>
                      </div>

                      {/* Skills Gained */}
                      <div>
                        <h4 className="font-semibold mb-3">Skills & Knowledge Gained</h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.degree.includes("Bachelor") ? [
                            "Data Structures", "Algorithms", "Software Engineering", "Database Design", 
                            "System Architecture", "Problem Solving", "Team Collaboration", "Project Management"
                          ] : [
                            "Modern Frameworks", "Cloud Deployment", "DevOps Practices", "API Development",
                            "Performance Optimization", "Security Best Practices", "Agile Methodology", "Code Quality"
                          ].map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default">
                              {skill}
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
        
        {/* Continuous Learning Summary */}
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-2 border-dashed border-primary/20 mt-6">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-3 rounded-full bg-primary/20">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Continuous Learning Journey</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Committed to staying current with emerging technologies through online courses, 
                technical documentation, and hands-on experimentation with new frameworks and tools.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <Badge className="px-4 py-2">Self-Directed Learning</Badge>
                <Badge variant="secondary" className="px-4 py-2">Technology Research</Badge>
                <Badge variant="outline" className="px-4 py-2">Best Practices</Badge>
                <Badge variant="outline" className="px-4 py-2">Industry Trends</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};