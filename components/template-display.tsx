import * as React from "react"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Template {
  name: string
  meta?: {
    title?: string
    preview?: string
    tags?: string[]
  }
  description?: string
  categories?: string[]
}

async function getTemplate(name: string): Promise<Template | null> {
  try {
    const { Index } = await import("@/registry/__index__")
    return Index[name] || null
  } catch {
    return null
  }
}

export async function TemplateDisplay({ name }: { name: string }) {
  const template = await getTemplate(name)

  if (!template) {
    return null
  }

  const title = template.meta?.title || name
  const description = template.description || "No description available"
  const previewUrl = template.meta?.preview
  const tags = template.meta?.tags || []

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription className="text-base">
              {description}
            </CardDescription>
          </div>
          {previewUrl && (
            <Button asChild variant="outline" size="sm">
              <Link href={previewUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Preview
              </Link>
            </Button>
          )}
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted flex aspect-video items-center justify-center rounded-lg">
            <span className="text-muted-foreground">Template Preview</span>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href={`/templates/${template.categories?.[0]}/${name}`}>
                View Details
              </Link>
            </Button>
            {previewUrl && (
              <Button asChild variant="outline">
                <Link
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
