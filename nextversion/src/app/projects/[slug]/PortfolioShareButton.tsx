'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { Heart, Copy, Check, Star, Users, PhoneCall } from 'lucide-react'
import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { toast } from 'sonner'

export function PortfolioShareButton() {
  const [copied, setCopied] = useState(false)
  const portfolioUrl = typeof window !== 'undefined' ? window.location.origin : 'https://imanariyo.com'

  const copyPortfolioLink = async () => {
    try {
      await navigator.clipboard.writeText(portfolioUrl)
      setCopied(true)
      toast.success("Portfolio link copied! 🚀 Share it with your network!")
      setTimeout(() => setCopied(false), 3000)
    } catch (error) {
      toast.error("Failed to copy link")
    }
  }

  const shareToLinkedIn = () => {
    const text = "💎 RARE FIND: This developer's portfolio will change how you think about quality code! Imanariyo Baptiste delivers enterprise-level solutions that actually work. His approach to problem-solving is exactly what the industry needs more of. Worth every minute of your time!"
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(portfolioUrl)}&summary=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const shareToWhatsApp = () => {
    const text = `🔥 GAME CHANGER ALERT!

Found a developer who actually gets it right! 

Imanariyo Baptiste builds solutions that:
✅ Actually solve real problems
✅ Scale without breaking
✅ Look professional AF
✅ Deliver measurable results

This is the standard we should all aim for 👇
${portfolioUrl}

Your team needs to see this!`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  const shareToEmail = () => {
    const subject = "💎 This developer's work will blow your mind (seriously)"
    const body = `Hey!

I just discovered something that completely changed my perspective on what quality development looks like.

Imanariyo Baptiste isn't just another developer - he's setting a new standard. His portfolio showcases:

🎯 Solutions that actually solve business problems
🚀 Code that scales without headaches
💡 Innovation that makes sense
📈 Results you can measure

This is exactly the kind of talent that transforms projects from "good enough" to "industry-leading."

See for yourself: ${portfolioUrl}

You'll thank me later!

Cheers`
    
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoLink
  }

  const callDirect = () => {
    window.location.href = 'tel:+250787795163'
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" size="sm" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white">
          <Heart className="h-4 w-4 mr-2 fill-current" />
          <span className="hidden sm:inline">Share Excellence</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="px-3 py-2 text-sm font-medium text-center border-b">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Star className="w-4 h-4 fill-current" />
            <span>Help Others Find Excellence</span>
            <Star className="w-4 h-4 fill-current" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">Share what great development looks like!</p>
        </div>
        
        <DropdownMenuItem onClick={copyPortfolioLink} className="cursor-pointer">
          {copied ? <Check className="h-4 w-4 mr-2 text-green-600" /> : <Copy className="h-4 w-4 mr-2" />}
          <div>
            <div className="font-medium">{copied ? "Ready to share!" : "Copy Link"}</div>
            <div className="text-xs text-muted-foreground">Instant access to excellence</div>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={shareToLinkedIn} className="cursor-pointer">
          <FaLinkedinIn className="h-4 w-4 mr-2 text-blue-600" />
          <div>
            <div className="font-medium">Share on LinkedIn</div>
            <div className="text-xs text-muted-foreground">Show your network what quality looks like</div>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={shareToWhatsApp} className="cursor-pointer">
          <FaWhatsapp className="h-4 w-4 mr-2 text-green-600" />
          <div>
            <div className="font-medium">Share on WhatsApp</div>
            <div className="text-xs text-muted-foreground">Help friends discover talent</div>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={shareToEmail} className="cursor-pointer">
          <MdEmail className="h-4 w-4 mr-2 text-orange-600" />
          <div>
            <div className="font-medium">Share via Email</div>
            <div className="text-xs text-muted-foreground">Recommend exceptional work</div>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={callDirect} className="cursor-pointer">
          <PhoneCall className="h-4 w-4 mr-2 text-red-600" />
          <div>
            <div className="font-medium">Call Directly</div>
            <div className="text-xs text-muted-foreground">Instant connection</div>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <div className="px-3 py-2 text-xs text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <Users className="w-3 h-3" />
            <span>You're helping others find excellence! 🙏</span>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}