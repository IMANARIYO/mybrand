import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { skills } from "../../data/about";

interface SkillsSectionProps {
  activeSkillCategory: string;
  onSkillCategoryChange: (category: string) => void;
}

export const SkillsSection = ({ activeSkillCategory, onSkillCategoryChange }: SkillsSectionProps) => {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          💻 Technical Expertise
        </CardTitle>
        <CardDescription>
          Comprehensive skill set spanning modern web and mobile technologies with proven proficiency levels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeSkillCategory} onValueChange={onSkillCategoryChange}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="frontend">Frontend</TabsTrigger>
            <TabsTrigger value="backend">Backend</TabsTrigger>
            <TabsTrigger value="databases">Database</TabsTrigger>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
            <TabsTrigger value="uiux">Design</TabsTrigger>
          </TabsList>
          
          {Object.entries(skills).map(([category, skillList]) => (
            <TabsContent key={category} value={category} className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="capitalize text-xl">{category} Technologies</CardTitle>
                  <CardDescription>
                    {category === 'frontend' && 'Modern UI frameworks and libraries for responsive web applications'}
                    {category === 'backend' && 'Server-side technologies for scalable API development'}
                    {category === 'databases' && 'Database management and optimization for data-driven applications'}
                    {category === 'mobile' && 'Cross-platform mobile development frameworks'}
                    {category === 'uiux' && 'Design tools for creating user-centered interfaces'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {skillList.map((skill) => (
                      <Card key={skill.name} className="p-4 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{skill.icon}</span>
                            <div>
                              <h4 className="font-semibold">{skill.name}</h4>
                              <p className="text-sm text-muted-foreground">Production Ready</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                              {skill.level}
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000"
                            style={{ width: skill.level }}
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};