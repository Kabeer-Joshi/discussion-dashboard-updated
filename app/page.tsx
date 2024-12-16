"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, MessagesSquare, TrendingUp } from "lucide-react"
import { MainHeader } from "@/components/main-header"
import { useAuth } from "@/hooks/use-auth"



export default function Home() {
  useAuth()

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section with improved gradient */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-background" />
        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center lg:px-8">
          <div className="inline-flex items-center justify-center px-4 py-2 mb-8 rounded-full border bg-background/50 backdrop-blur-sm">
            <TrendingUp className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium">Your Discussion Stats</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Discussions by Goreeva
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Engage in meaningful classroom discussions and collaborate with your peers
          </p>
        </div>
      </div>

      {/* Stats Section with larger, more detailed cards */}
      <div className="mx-auto max-w-5xl px-6 pb-24 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
              <CardTitle className="text-lg font-semibold">
                Topics Posted
              </CardTitle>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MessagesSquare className="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-5xl font-bold text-primary">10</div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Topics you've created across all classes
                    </p>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-2/3 bg-primary rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
              <CardTitle className="text-lg font-semibold">
                Responses Posted
              </CardTitle>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-5xl font-bold text-primary">24</div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Responses you've made to other topics
                    </p>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-4/5 bg-primary rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
