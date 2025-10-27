/* eslint-disable react/no-unescaped-entities */
"use client"

import type React from "react"
import { Phone, Mail, MessageCircle, UserCheck, Briefcase, Rocket } from "lucide-react"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

export interface EnhancedHoverCardItem {
    href?: string;
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    target?: string;
    rel?: string;
    description?: string;
    strengths?: string[];
    useCases?: string;
    isEmail?: boolean;
}

interface EnhancedHoverCardProps {
    item: EnhancedHoverCardItem;
    isSkills?: boolean;
    onEmailClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => void;
    onSkillTriggerClick?: (skillTitle: string) => void;
}

export const EnhancedHoverCard: React.FC<EnhancedHoverCardProps> = ({
    item,
    isSkills = false,
    onEmailClick,
    onSkillTriggerClick
}) => {
    const TriggerComponent = isSkills ? 'div' : 'a'
    const triggerProps = isSkills ? {
        onClick: onSkillTriggerClick ? () => onSkillTriggerClick(item.title) : undefined
    } : {
        href: item.href,
        target: item.target || "_blank",
        rel: item.rel || "noopener noreferrer",
        onClick: item.isEmail && onEmailClick ? (e: React.MouseEvent<HTMLAnchorElement>) => onEmailClick(e, item.href || '') : undefined
    }

    return (
        <HoverCard openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
                <TriggerComponent
                    {...(triggerProps as React.HTMLAttributes<HTMLElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>)}
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary hover:to-primary/80 text-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-primary/25 ${isSkills ? 'cursor-pointer hover:rotate-6' : ''
                        } border border-primary/20 hover:border-primary/50 shadow-lg hover:shadow-xl relative`}
                >
                    <div className="text-xl hover:scale-125 transition-transform duration-300">{item.icon}</div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-70 animate-pulse"></div>
                </TriggerComponent>
            </HoverCardTrigger>
            <HoverCardContent className="w-96 p-6 bg-background border-2 border-primary/20 shadow-2xl shadow-primary/10" side="top" align="center">
                <div className="space-y-4">
                    {/* Header */}
                    <div className="text-center p-4 rounded-lg bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 border border-primary/20">
                        <h3 className="font-bold text-xl text-foreground bg-background bg-clip-text ">{item.title}</h3>
                        {item.subtitle && (
                            <p className="text-sm text-muted-foreground mt-1 font-medium">{item.subtitle}</p>
                        )}
                    </div>

                    {/* Strengths */}
                    {item.strengths && (
                        <div className="bg-card/50 p-3 rounded-lg border border-border/50">
                            <h4 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                Core Strengths
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {item.strengths.map((strength, i) => (
                                    <span key={i} className="text-xs bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30 px-3 py-1.5 rounded-full font-medium hover:from-primary/30 hover:to-secondary/30 transition-all duration-200">
                                        {strength}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Use Cases */}
                    {item.useCases && (
                        <div className="bg-muted/30 p-3 rounded-lg border border-border/50">
                            <h4 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-2">
                                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                                Impact & Applications
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{item.useCases}</p>
                        </div>
                    )}

                    {/* Description */}
                    {item.description && (
                        <div className="bg-accent/20 p-3 rounded-lg border border-accent/30">
                            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                        </div>
                    )}

                    {/* CTA Buttons for contact items */}
                    {!isSkills && (
                        <div className="pt-2 border-t border-border/50">
                            <div className="flex gap-2 justify-center">
                                {item.title === "Direct Call" && (
                                    <a href={item.href} className="flex-1 bg-primary hover:from-primary/90 hover:to-primary text-primary-foreground text-xs font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg text-center flex items-center justify-center gap-1">
                                        <Phone size={14} /> Call Me
                                    </a>
                                )}
                                {item.title === "Email" && onEmailClick && (
                                    <button onClick={(e) => onEmailClick(e, item.href || '')} className="flex-1 bg-secondary hover:from-secondary/90 hover:to-secondary text-secondary-foreground text-xs font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-1">
                                        <Mail size={14} /> Mail Me
                                    </button>
                                )}
                                {item.title === "WhatsApp" && (
                                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xs font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg text-center flex items-center justify-center gap-1">
                                        <MessageCircle size={14} /> Chat Me
                                    </a>
                                )}
                                {item.title === "LinkedIn" && (
                                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg text-center flex items-center justify-center gap-1">
                                        <UserCheck size={14} /> Reach Out
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                    {/* CTA for skills */}
                    {isSkills && (
                        <div className="pt-2 border-t border-border/50">
                            <div className="flex gap-2">
                                {onEmailClick ? (
                                    <button onClick={(e) => onEmailClick(e, `mailto:imanariyobaptiste@gmail.com?subject=Collaboration%20Opportunity%20-%20${encodeURIComponent(item.title)}&body=Hello%20Imanariyo,%0A%0AI%20came%20across%20your%20portfolio%20and%20I'm%20impressed%20by%20your%20expertise%20in%20${encodeURIComponent(item.title)}.%20I%20would%20love%20to%20discuss%20how%20your%20technical%20stack%20and%20experience%20could%20contribute%20to%20our%20upcoming%20projects.%0A%0ACould%20we%20schedule%20a%20brief%20conversation%20to%20explore%20potential%20collaboration%20opportunities?%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0ABest%20regards,`)} className="flex-1 bg-primary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground text-xs font-semibold py-2 px-3 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg text-center flex items-center justify-center gap-1">
                                        <Briefcase size={14} /> Hire Me
                                    </button>
                                ) : (
                                    <a href={`mailto:imanariyobaptiste@gmail.com?subject=Collaboration%20Opportunity%20-%20${encodeURIComponent(item.title)}&body=Hello%20Imanariyo,%0A%0AI%20came%20across%20your%20portfolio%20and%20I'm%20impressed%20by%20your%20expertise%20in%20${encodeURIComponent(item.title)}.%20I%20would%20love%20to%20discuss%20how%20your%20technical%20stack%20and%20experience%20could%20contribute%20to%20our%20upcoming%20projects.%0A%0ACould%20we%20schedule%20a%20brief%20conversation%20to%20explore%20potential%20collaboration%20opportunities?%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0ABest%20regards,`} className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground text-xs font-semibold py-2 px-3 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg text-center flex items-center justify-center gap-1">
                                        <Briefcase size={14} /> Hire Me
                                    </a>
                                )}
                                <a href={`https://wa.me/250787795163?text=Hello%20Imanariyo!%20I%20discovered%20your%20portfolio%20and%20I'm%20particularly%20interested%20in%20your%20${encodeURIComponent(item.title)}%20expertise.%20I'd%20love%20to%20discuss%20how%20we%20could%20collaborate%20on%20some%20exciting%20projects.%20When%20would%20be%20a%20good%20time%20for%20a%20quick%20chat?`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg text-center flex items-center justify-center gap-1">
                                    <Rocket size={20} /> Let's Talk
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}