import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { education } from "../../data/about";

export const EducationSection = () => {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          🎓 Education & Foundation
        </CardTitle>
        <CardDescription>
          Strong academic foundation supporting technical expertise and continuous learning mindset
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {education.map((edu, index) => (
          <Card key={edu.institution} className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-background border shadow-sm">
                  <Image
                    src={edu.logo}
                    alt={`${edu.institution} Logo`}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl text-foreground">{edu.degree}</CardTitle>
                  <CardDescription className="text-lg font-semibold text-primary">{edu.institution}</CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                      {edu.duration}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">{edu.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 bg-primary/5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">💡</span>
                    <div>
                      <h4 className="font-semibold text-primary">Technical Foundation</h4>
                      <p className="text-sm text-muted-foreground">Core CS principles & algorithms</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 bg-secondary/5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🔬</span>
                    <div>
                      <h4 className="font-semibold text-secondary">Practical Application</h4>
                      <p className="text-sm text-muted-foreground">Hands-on project experience</p>
                    </div>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="text-3xl">📚</div>
              <h3 className="text-xl font-semibold">Continuous Learning</h3>
              <p className="text-muted-foreground">
                Committed to staying current with emerging technologies through online courses, 
                technical documentation, and hands-on experimentation with new frameworks and tools.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">Self-Directed Learning</span>
                <span className="text-xs bg-secondary/20 text-secondary px-3 py-1 rounded-full">Technology Research</span>
                <span className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full">Best Practices</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};