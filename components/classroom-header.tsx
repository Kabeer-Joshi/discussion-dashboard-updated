"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"

// Dummy data for classes
const classes = [
  { id: "1", name: "Mathematics 101" },
  { id: "2", name: "Physics 201" },
  { id: "3", name: "Chemistry 301" },
]

export function ClassroomHeader() {
  const router = useRouter()
  const { logout} = useAuth()
  const [showProfile, setShowProfile] = useState(false)

  return (
    <div className="flex items-center justify-between w-full">
      <Select onValueChange={(value) => router.push(`/classroom/${value}`)}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select a class" />
        </SelectTrigger>
        <SelectContent>
          {classes.map((cls) => (
            <SelectItem key={cls.id} value={cls.id}>
              {cls.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/01.png" alt="@user" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">John Doe</p>
              <p className="text-xs leading-none text-muted-foreground">
                john@example.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowProfile(true)}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => logout()}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Profile</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col items-center gap-4 py-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/avatars/01.png" alt="@user" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                  <h3 className="font-medium">John Doe</h3>
                  <p className="text-sm text-muted-foreground">Student</p>
                  <p className="text-sm text-muted-foreground">john@example.com</p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
