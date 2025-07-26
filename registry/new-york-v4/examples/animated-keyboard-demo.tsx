import {
  Keyboard,
  Keycap,
  KeyRow,
} from "@/registry/new-york-v4/ui/animated-keyboard"

const KEY_HEIGHT = "48px"

const TOP_ROW_KEYS = [
  { char: "§", secondaryChar: "±" },
  { char: "1", secondaryChar: "!" },
  { char: "2", secondaryChar: "@" },
  { char: "3", secondaryChar: "£" },
  { char: "4", secondaryChar: "$" },
  { char: "5", secondaryChar: "%" },
  { char: "6", secondaryChar: "^" },
  { char: "7", secondaryChar: "&" },
  { char: "8", secondaryChar: "*" },
  { char: "9", secondaryChar: "(" },
  { char: "0", secondaryChar: ")" },
  { char: "-", secondaryChar: "_" },
  { char: "=", secondaryChar: "+" },
]

const SECOND_ROW_KEYS = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]

const THIRD_ROW_KEYS = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]

const FOURTH_ROW_KEYS = ["Z", "X", "C", "V", "B", "N", "M"]

const SPECIAL_KEYS = {
  SECOND_ROW_END: [
    { char: "[", secondaryChar: "{" },
    { char: "]", secondaryChar: "}" },
    { char: "\\", secondaryChar: "|" },
  ],
  THIRD_ROW_END: [
    { char: ";", secondaryChar: ":" },
    { char: "'", secondaryChar: '"' },
  ],
  FOURTH_ROW_END: [
    { char: ",", secondaryChar: "<" },
    { char: ".", secondaryChar: ">" },
    { char: "/", secondaryChar: "?" },
  ],
}

function TopRow() {
  return (
    <KeyRow>
      {TOP_ROW_KEYS.map((key) => (
        <Keycap
          key={key.char}
          char={key.char}
          secondaryChar={key.secondaryChar}
          variant="double"
          height={KEY_HEIGHT}
          className="w-12"
        />
      ))}
      <Keycap
        char="delete"
        variant="tab"
        height={KEY_HEIGHT}
        className="w-[76px] items-end text-xs"
      />
    </KeyRow>
  )
}

function SecondRow() {
  return (
    <KeyRow>
      <Keycap
        char="⇥"
        variant="tab"
        height={KEY_HEIGHT}
        className="w-[76px] items-start text-xs"
      />
      {SECOND_ROW_KEYS.map((char) => (
        <Keycap key={char} char={char} height={KEY_HEIGHT} className="w-12" />
      ))}
      {SPECIAL_KEYS.SECOND_ROW_END.map((key) => (
        <Keycap
          key={key.char}
          char={key.char}
          secondaryChar={key.secondaryChar}
          variant="double"
          height={KEY_HEIGHT}
          className="w-12"
        />
      ))}
    </KeyRow>
  )
}

function ThirdRow() {
  return (
    <KeyRow>
      <Keycap
        char="⇧"
        variant="caps"
        height={KEY_HEIGHT}
        className="w-24 items-start text-xs"
      />
      {THIRD_ROW_KEYS.map((char) => (
        <Keycap key={char} char={char} height={KEY_HEIGHT} className="w-12" />
      ))}
      {SPECIAL_KEYS.THIRD_ROW_END.map((key) => (
        <Keycap
          key={key.char}
          char={key.char}
          secondaryChar={key.secondaryChar}
          variant="double"
          height={KEY_HEIGHT}
          className="w-12"
        />
      ))}
      <Keycap
        char="⏎"
        variant="shift"
        height={KEY_HEIGHT}
        className="w-[86px] items-end text-xs"
      />
    </KeyRow>
  )
}

function FourthRow() {
  return (
    <KeyRow>
      <Keycap
        char="⇧"
        variant="shift"
        height={KEY_HEIGHT}
        className="w-[66px] items-start text-xs"
      />
      <Keycap
        char="`"
        secondaryChar="~"
        variant="double"
        height={KEY_HEIGHT}
        className="w-12"
      />
      {FOURTH_ROW_KEYS.map((char) => (
        <Keycap key={char} char={char} height={KEY_HEIGHT} className="w-12" />
      ))}
      {SPECIAL_KEYS.FOURTH_ROW_END.map((key) => (
        <Keycap
          key={key.char}
          char={key.char}
          secondaryChar={key.secondaryChar}
          variant="double"
          height={KEY_HEIGHT}
          className="w-12"
        />
      ))}
      <Keycap
        char="⇧"
        variant="shift"
        height={KEY_HEIGHT}
        className="w-[116px] items-end text-xs"
      />
    </KeyRow>
  )
}

function BottomRow() {
  return (
    <KeyRow>
      <Keycap
        char="fn"
        variant="command"
        height={KEY_HEIGHT}
        className="w-12 text-xs"
      />
      <Keycap
        char="⌃"
        variant="command"
        height={KEY_HEIGHT}
        className="w-12 text-xs"
      />
      <Keycap
        char="⌥"
        variant="command"
        height={KEY_HEIGHT}
        className="w-12 text-xs"
      />
      <Keycap
        char="⌘"
        variant="command"
        height={KEY_HEIGHT}
        className="w-[66px] text-xs"
      />
      <Keycap char="" variant="space" height={KEY_HEIGHT} className="flex-1" />
      <Keycap
        char="⌘"
        variant="command"
        height={KEY_HEIGHT}
        className="w-[66px] text-xs"
      />
      <Keycap
        char="⌥"
        variant="command"
        height={KEY_HEIGHT}
        className="w-12 text-xs"
      />
      <Keycap
        char="fn"
        variant="command"
        height={KEY_HEIGHT}
        className="w-12 text-xs"
      />
    </KeyRow>
  )
}

export default function KeyboardDemo() {
  return (
    <div className="flex scale-75 items-center justify-center">
      <Keyboard className="bg-[#21222550]">
        <TopRow />
        <SecondRow />
        <ThirdRow />
        <FourthRow />
        <BottomRow />
      </Keyboard>
    </div>
  )
}
