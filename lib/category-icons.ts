import {
  Box,
  Code,
  Eclipse,
  FileText,
  Flame,
  MousePointerClick,
  Settings,
  Sparkles,
  SquareDashedMousePointer,
  Type,
} from "lucide-react"

export const categoryIcons = {
  "Getting Started": Settings,
  Components: Code,
  "Dark Mode": Eclipse,
  Configuration: Settings,
  Documentation: FileText,
  Advanced: Sparkles,
  "3D & Shaders": Box,
  "Animated Cards": SquareDashedMousePointer,
  Backgrounds: Flame,
  "Text Effects": Type,
  Buttons: MousePointerClick,
} as const

export function getCategoryIcon(categoryName: string) {
  return categoryIcons[categoryName as keyof typeof categoryIcons] || Settings
}
