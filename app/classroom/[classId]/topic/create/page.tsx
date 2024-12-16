"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

const folders = [
  { id: "1", name: "General Discussion" },
  { id: "2", name: "Assignments" },
  { id: "3", name: "Resources" },
  { id: "4", name: "Announcements" },
]

const tags = [
  { id: "question", label: "Question" },
  { id: "announcement", label: "Announcement" },
  { id: "note", label: "Note" },
]

export default function CreateTopicPage() {
  const router = useRouter()
  const params = useParams()
  const [selectedTag, setSelectedTag] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Navigate back to classroom
    router.push(`/classroom/${params.classId}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Topic</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Discussion Topic Input */}
          <div className="space-y-2">
            <Label htmlFor="topic">Discussion Topic</Label>
            <Input
              id="topic"
              placeholder="Enter the topic title"
              className="w-full"
              required
            />
          </div>

          {/* Folder Selection */}
          <div className="space-y-2">
            <Label htmlFor="folder">Folder</Label>
            <Select required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a folder" />
              </SelectTrigger>
              <SelectContent>
                {folders.map((folder) => (
                  <SelectItem key={folder.id} value={folder.id}>
                    {folder.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tags Selection */}
          <div className="space-y-2">
            <Label>Type</Label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Button
                  key={tag.id}
                  type="button"
                  variant={selectedTag === tag.id ? "default" : "outline"}
                  onClick={() => setSelectedTag(tag.id)}
                  className="flex-1 sm:flex-none"
                >
                  {tag.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Rich Text Editor (Textarea for now) */}
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your content here..."
              className="min-h-[200px]"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Topic"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
} 
