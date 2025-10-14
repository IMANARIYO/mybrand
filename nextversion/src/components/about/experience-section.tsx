import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import Image from "next/image";
import { experience } from "../../data/about";

export const ExperienceSection = () => {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          🚀 Professional Experience & Impact
        </CardTitle>
        <CardDescription>
          Real-world projects delivering measurable business value through innovative solutions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {experience.map((exp, index) => (
            <AccordionItem key={exp.position} value={`item-${index}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4 text-left">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-background border">
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} Logo`}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{exp.position}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.duration}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Card className="mt-4">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="p-4 bg-primary/5">
                          <div className="text-center">
                            <div className="text-2xl mb-2">🎯</div>
                            <h4 className="font-semibold text-primary">Problem Solving</h4>
                            <p className="text-sm text-muted-foreground">Complex technical challenges</p>
                          </div>
                        </Card>
                        
                        <Card className="p-4 bg-secondary/5">
                          <div className="text-center">
                            <div className="text-2xl mb-2">📈</div>
                            <h4 className="font-semibold text-secondary">Performance</h4>
                            <p className="text-sm text-muted-foreground">Optimized system efficiency</p>
                          </div>
                        </Card>
                        
                        <Card className="p-4 bg-accent/5">
                          <div className="text-center">
                            <div className="text-2xl mb-2">🤝</div>
                            <h4 className="font-semibold text-accent">Collaboration</h4>
                            <p className="text-sm text-muted-foreground">Cross-functional teamwork</p>
                          </div>
                        </Card>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">Leadership</span>
                        <span className="text-xs bg-secondary/10 text-secondary px-3 py-1 rounded-full">Scalability</span>
                        <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full">Innovation</span>
                        <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">Results-Driven</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};