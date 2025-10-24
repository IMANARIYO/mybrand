import { Card, CardContent } from "../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Code2, GraduationCap, Briefcase } from "lucide-react";

interface SectionNavigationProps {
  sections: string[];
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sectionIcons = {
  skills: Code2,
  education: GraduationCap,
  experience: Briefcase
};

const sectionDescriptions = {
  skills: 'Technical Expertise',
  education: 'Academic Foundation',
  experience: 'Professional Impact'
};

export const SectionNavigation = ({ sections, activeSection, onSectionChange }: SectionNavigationProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-2 sm:p-4">
        <Tabs value={activeSection} onValueChange={onSectionChange}>
          <TabsList className="grid w-full grid-cols-3 h-auto gap-1 sm:gap-2">
            {sections.map((section) => (
              <TabsTrigger
                key={section}
                value={section}
                className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground min-h-[60px] sm:min-h-[80px]"
              >
                {(() => {
                  const IconComponent = sectionIcons[section as keyof typeof sectionIcons]
                  return <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
                })()}
                <div className="text-center">
                  <div className="font-medium capitalize text-xs sm:text-sm">{section}</div>
                  <div className="text-[10px] sm:text-xs opacity-80 hidden sm:block">{sectionDescriptions[section as keyof typeof sectionDescriptions]}</div>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  );
}