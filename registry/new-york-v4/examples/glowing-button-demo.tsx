import { GlowingButton } from "@/registry/new-york-v4/ui/glowing-button"

export function GlowingButtonDemo() {
  return (
    <div className="flex flex-col gap-4">
      <GlowingButton>Hover me</GlowingButton>
      <GlowingButton glowColor="#ec4899">Hover Me</GlowingButton>
      <GlowingButton glowColor="#22d3ee">Hover Me</GlowingButton>
    </div>
  )
}
