import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Code2 } from "lucide-react";
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
          <Code2 className="h-6 w-6" />
          Technical Expertise
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skillList.map((skill) => {
                      const getProficiencyColor = (level: string) => {
                        switch (level) {
                          case 'Expert': return 'bg-green-500'
                          case 'Advanced': return 'bg-blue-500'
                          case 'Intermediate': return 'bg-yellow-500'
                          case 'Beginner': return 'bg-orange-500'
                          default: return 'bg-gray-500'
                        }
                      }
                      
                      return (
                        <Card key={skill.name} className="group p-6 hover:shadow-xl transition-all duration-300 border hover:border-primary/30">
                          <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 flex-shrink-0">
                              <skill.icon className="h-7 w-7 text-primary group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <div className="flex-1 space-y-3">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-bold text-lg group-hover:text-primary transition-colors duration-300">{skill.name}</h4>
                                  <div className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getProficiencyColor(skill.proficiency)}`}>
                                    {skill.proficiency}
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                                  <span className="font-medium">{skill.years} experience</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <div className="h-2 w-2 rounded-full bg-secondary"></div>
                                  <span className="font-medium">{skill.projects} projects</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      )
                    })}
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