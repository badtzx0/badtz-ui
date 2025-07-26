import {
  Keyboard,
  Keycap,
  KeyRow,
} from "@/registry/new-york-v4/ui/animated-keyboard"

const KEY_HEIGHT = "48px"

function TopRow() {
  return (
    <KeyRow gap="md">
      <Keycap
        char="⇥"
        variant="tab"
        height={KEY_HEIGHT}
        className="w-16 text-xs"
      />
      <Keycap
        char="1"
        secondaryChar="!"
        variant="double"
        height={KEY_HEIGHT}
        className="w-12"
      />
      <Keycap char="A" height={KEY_HEIGHT} className="w-12" />
    </KeyRow>
  )
}

function BottomRow() {
  return (
    <KeyRow gap="md">
      <Keycap char="Q" height={KEY_HEIGHT} className="w-12" />
      <Keycap
        char="2"
        secondaryChar="@"
        variant="double"
        height={KEY_HEIGHT}
        className="w-12"
      />
      <Keycap
        char="⇧"
        variant="caps"
        height={KEY_HEIGHT}
        className="w-16 text-xs"
      />
    </KeyRow>
  )
}

export default function MiniKeyboardDemo() {
  return (
    <div className="flex justify-center">
      <Keyboard className="w-fit bg-[#21222550]">
        <TopRow />
        <BottomRow />
      </Keyboard>
    </div>
  )
}
