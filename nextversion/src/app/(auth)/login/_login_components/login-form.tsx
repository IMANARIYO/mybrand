"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogIn, Mail, Lock, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { loginAction } from "@/app/(auth)/login/actions"
import { toast } from "sonner"

export default function LoginForm() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    setError(null)

    startTransition(async () => {
      try {
        const result = await loginAction(formData)

        if (result && !result.success) {
          setError(result.message || "Login failed")
          toast.error(result.message || "Login failed")
        } else if (result && result.success) {
          toast.success("Login successful! Redirecting...")
          setTimeout(() => {
            if (result.role === "ADMIN" || result.role === "USER") {
              router.push("/dashboard")
            } else {
              router.push("/")
            }
          }, 1000)
        }
      } catch (error) {
        console.error("Login error:", error)
        const errorMessage = "An unexpected error occurred"
        setError(errorMessage)
        toast.error(errorMessage)
      }
    })
  }

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
        <div className="p-3 text-xs bg-blue-50 border border-blue-200 rounded-md">
          <p className="font-semibold text-blue-800">Test Credentials:</p>
          <p className="text-blue-700">Admin: admin@example.com / admin123</p>
          <p className="text-blue-700">User: user@example.com / user123</p>
        </div>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                className="pl-10"
                required
                disabled={isPending}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Your secure password"
                className="pl-10"
                required
                disabled={isPending}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full" size="lg" type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
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
      </form>
    </Card>
  );
}