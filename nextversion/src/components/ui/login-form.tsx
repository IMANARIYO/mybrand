"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogIn, Mail, Lock } from "lucide-react"
import Link from "next/link"

export default function LoginForm() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl flex items-center gap-2">
          <LogIn className="h-5 w-5" />
          Welcome Back
        </CardTitle>
        <CardDescription>
          Sign in to access your personalized experience
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              className="pl-10"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="Your secure password"
              className="pl-10"
              required
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full" size="lg">Sign In</Button>
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            New here?{" "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Create your account
            </Link>
          </p>
          <p className="text-xs text-muted-foreground">
            Join our community and unlock exclusive features
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}