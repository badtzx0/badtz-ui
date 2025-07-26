"use client"

import { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function MacbookKeyboard({ className }: { className?: string }) {
  return (
    <div className={cn("origin-bottom-left scale-75", className)}>
      <div className="border-border rounded-[10px] border bg-[#21222550] p-2.5">
        <div className="relative flex flex-col gap-2.5">
          <div className="flex flex-nowrap gap-2.5">
            {[
              { primary: "§", secondary: "±" },
              { primary: "1", secondary: "!" },
              { primary: "2", secondary: "@" },
              { primary: "3", secondary: "£" },
              { primary: "4", secondary: "$" },
              { primary: "5", secondary: "%" },
              { primary: "6", secondary: "^" },
              { primary: "7", secondary: "&" },
              { primary: "8", secondary: "*" },
              { primary: "9", secondary: "(" },
              { primary: "0", secondary: ")" },
              { primary: "-", secondary: "_" },
              { primary: "=", secondary: "+" },
            ].map((chars, index) => (
              <KeyboardKey key={index}>
                <PrimaryText>{chars.secondary}</PrimaryText>
                <PrimaryText>{chars.primary}</PrimaryText>
              </KeyboardKey>
            ))}
            <KeyboardKey className="w-[76px] items-end">
              <PrimaryText className="items-end">delete</PrimaryText>
            </KeyboardKey>
          </div>
          <div className="flex flex-nowrap gap-2.5">
            <KeyboardKey className="w-[76px] items-start">
              <PrimaryText className="items-end">
                <TabSvg />
              </PrimaryText>
            </KeyboardKey>
            {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map(
              (char, index) => (
                <KeyboardKey key={index}>
                  <span>{char}</span>
                </KeyboardKey>
              )
            )}
            {[
              { primary: "[", secondary: "{" },
              { primary: "]", secondary: "}" },
              { primary: `\\`, secondary: "|" },
            ].map((chars, index) => (
              <KeyboardKey key={index}>
                <PrimaryText>{chars.secondary}</PrimaryText>
                <PrimaryText>{chars.primary}</PrimaryText>
              </KeyboardKey>
            ))}
          </div>
          <div className="flex flex-nowrap gap-2.5">
            <KeyboardKey className="w-24 items-start">
              <PrimaryText className="items-end">
                <ShiftSvg />
              </PrimaryText>
            </KeyboardKey>
            {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map(
              (char, index) => (
                <KeyboardKey key={index}>
                  <span>{char}</span>
                </KeyboardKey>
              )
            )}
            {[
              { primary: ";", secondary: ":" },
              { primary: `'`, secondary: '"' },
            ].map((chars, index) => (
              <KeyboardKey key={index}>
                <PrimaryText>{chars.secondary}</PrimaryText>
                <PrimaryText>{chars.primary}</PrimaryText>
              </KeyboardKey>
            ))}
            <KeyboardKey className="w-[86px] items-end">
              <PrimaryText className="items-end">
                <EnterSvg />
              </PrimaryText>
            </KeyboardKey>
          </div>
          <div className="flex flex-nowrap gap-2.5">
            <KeyboardKey className="w-[66px] items-start">
              <PrimaryText className="items-end">
                <SmallShiftSvg />
              </PrimaryText>
            </KeyboardKey>
            {[{ primary: "`", secondary: "~" }].map((chars, index) => (
              <KeyboardKey key={index}>
                <PrimaryText>{chars.secondary}</PrimaryText>
                <PrimaryText>{chars.primary}</PrimaryText>
              </KeyboardKey>
            ))}
            {["Z", "X", "C", "V", "B", "N", "M"].map((char, index) => (
              <KeyboardKey key={index}>
                <span>{char}</span>
              </KeyboardKey>
            ))}
            {[
              { primary: ",", secondary: "<" },
              { primary: `.`, secondary: ">" },
              { primary: `/`, secondary: "?" },
            ].map((chars, index) => (
              <KeyboardKey key={index}>
                <PrimaryText>{chars.secondary}</PrimaryText>
                <PrimaryText>{chars.primary}</PrimaryText>
              </KeyboardKey>
            ))}
            <KeyboardKey className="w-[116px] items-end">
              <PrimaryText className="items-end">
                <SmallShiftSvg />
              </PrimaryText>
            </KeyboardKey>
          </div>
          <div className="flex flex-nowrap gap-2.5">
            <KeyboardKey className="items-normal">
              <PrimaryText className="justify-end">fn</PrimaryText>
              <PrimaryText>
                <WorldSvg />
              </PrimaryText>
            </KeyboardKey>
            <KeyboardKey className="items-normal">
              <PrimaryText className="justify-end">⌃</PrimaryText>
              <PrimaryText className="justify-end text-[10.5px]">
                control
              </PrimaryText>
            </KeyboardKey>
            <KeyboardKey className="items-normal">
              <PrimaryText className="justify-end">⌥</PrimaryText>
              <PrimaryText className="justify-end text-[10.5px]">
                option
              </PrimaryText>
            </KeyboardKey>
            <KeyboardKey className="items-normal w-[66px]">
              <PrimaryText className="justify-end">⌘</PrimaryText>
              <PrimaryText className="justify-end text-[10.5px]">
                command
              </PrimaryText>
            </KeyboardKey>
            <KeyboardKey className="flex-1"></KeyboardKey>
            <KeyboardKey className="items-normal w-[66px]">
              <PrimaryText className="justify-start">⌘</PrimaryText>
              <PrimaryText className="justify-start text-[10.5px]">
                command
              </PrimaryText>
            </KeyboardKey>
            <KeyboardKey className="items-normal">
              <PrimaryText className="justify-start">⌥</PrimaryText>
              <PrimaryText className="justify-start text-[10.5px]">
                option
              </PrimaryText>
            </KeyboardKey>
            <KeyboardKey className="text-[10px]">
              <span>◀</span>
            </KeyboardKey>
            <KeyboardKey className="h-6 rounded-br-none rounded-bl-none text-[10px]">
              <span>▼</span>
            </KeyboardKey>
            <KeyboardKey className="absolute right-[58px] bottom-0 h-6 rounded-tl-none rounded-tr-none text-[10px]">
              <span>▼</span>
            </KeyboardKey>
            <KeyboardKey className="text-[10px]">
              <span>▶</span>
            </KeyboardKey>
          </div>
        </div>
      </div>
    </div>
  )
}

interface KeyboardKeyProps {
  children?: ReactNode
  className?: string
}

const KeyboardKey = ({ children, className = "" }: KeyboardKeyProps) => {
  return (
    <div
      className={`from-secondary to-background/50 relative flex h-12 w-12 flex-shrink-0 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-[5px] bg-gradient-to-b p-2 leading-4 text-[#D8D8D8] bg-blend-overlay shadow-[0_1.5px_0.5px_2.5px_rgba(0,0,0,0.5),0_0_0.5px_1px_#000,inset_0_2px_1px_1px_rgba(0,0,0,0.25),inset_0_1px_1px_1px_rgba(255,255,255,0.2)] transition-all duration-200 ease-out select-none hover:translate-y-px hover:bg-gradient-to-b hover:from-[rgba(255,255,255,0.04)] hover:to-[rgba(255,255,255,0.016)] hover:shadow-[0_1.5px_1px_0px_rgba(0,0,0,0.2),0_0_0.5px_1px_#000,inset_0_0.5px_1px_0.5px_rgba(255,255,255,0.2)] ${className}`}
    >
      {children}
    </div>
  )
}

interface PrimaryTextProps {
  children?: ReactNode
  className?: string
}

const PrimaryText = ({ children, className = "" }: PrimaryTextProps) => {
  return (
    <div
      className={`flex flex-1 text-xs font-medium text-[#D8D8D8] ${className}`}
      style={{ textShadow: "0px 1px 1px rgba(0, 0, 0, 0.1)" }}
    >
      {children}
    </div>
  )
}

const TabSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    fill="none"
    viewBox="0 0 26 19"
  >
    <path
      fill="#D8D8D8"
      d="M13.844 18.194q.48 0 .87-.375l7.755-7.725q.42-.39.42-.9t-.42-.915L14.714.569q-.39-.375-.87-.375-.495 0-.84.33t-.345.825q0 .24.082.465.083.225.248.39l2.085 2.145 5.055 4.56.27-.78-3.69-.15H1.754q-.54 0-.87.337-.33.338-.33.878 0 .525.33.862.33.338.87.338h14.955l3.69-.135-.27-.78-5.055 4.56-2.085 2.13q-.165.165-.248.39t-.082.465q0 .51.345.84t.84.33m10.245 0q.525 0 .87-.33t.345-.84V1.379q0-.525-.345-.855t-.87-.33-.87.33-.345.855v15.645q0 .51.345.84t.87.33"
    ></path>
  </svg>
)

const ShiftSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 21 21">
    <path
      fill="#D8D8D8"
      d="M7.67 14.533h5.552q1.075 0 1.612-.579.537-.58.537-1.57v-1.421h3.415q.645 0 1.099-.358.454-.359.454-.944 0-.37-.185-.668a2.7 2.7 0 0 0-.532-.597l-7.976-7.021a3.6 3.6 0 0 0-.567-.406 1.27 1.27 0 0 0-.639-.167q-.335 0-.627.167a3.6 3.6 0 0 0-.567.406L1.27 8.408a3 3 0 0 0-.537.603q-.18.28-.18.65 0 .585.454.944.454.358 1.099.358h3.403v1.42q0 .993.543 1.571.543.58 1.618.58m.18-1.612q-.24 0-.395-.15a.51.51 0 0 1-.155-.387V9.685q0-.18-.072-.256-.072-.078-.25-.078H2.953q-.072 0-.072-.06 0-.035.036-.071l7.403-6.412a.2.2 0 0 1 .12-.048q.07 0 .119.048l7.414 6.412q.036.035.036.071 0 .06-.071.06h-4.024q-.18 0-.251.078-.072.077-.072.256v2.699a.534.534 0 0 1-.55.537zm-.622 7.88h6.353q.87 0 1.343-.47.471-.473.471-1.356v-1.41q0-.883-.471-1.354-.472-.472-1.343-.472H7.228q-.883 0-1.355.478-.471.477-.472 1.349v1.409q0 .87.472 1.35.471.477 1.355.477m.251-1.504q-.465 0-.466-.477V17.72q0-.226.12-.358t.346-.131h5.839q.238 0 .358.131.12.132.12.358v1.099q0 .477-.478.477z"
    ></path>
  </svg>
)

const SmallShiftSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    fill="none"
    viewBox="0 0 24 21"
  >
    <path
      fill="#D8D8D8"
      d="M8.632 20.41h6.357q1.215 0 1.835-.662.621-.662.621-1.794v-4.611h4.175q.723 0 1.22-.41.5-.409.499-1.077 0-.423-.191-.744a3.6 3.6 0 0 0-.505-.648l-9.454-9.413a2.5 2.5 0 0 0-.635-.464 1.61 1.61 0 0 0-1.473 0 2.7 2.7 0 0 0-.648.464l-9.44 9.413a3.3 3.3 0 0 0-.526.655q-.184.315-.184.737 0 .668.504 1.078.506.409 1.215.409h4.174v4.611q0 1.133.621 1.794.621.662 1.835.662m.205-1.897a.6.6 0 0 1-.444-.17.6.6 0 0 1-.17-.444v-6.03q0-.368-.382-.368H2.998q-.082 0-.082-.068 0-.041.04-.096l8.718-8.635a.19.19 0 0 1 .137-.055q.082 0 .136.055l8.718 8.635q.054.056.054.096 0 .068-.082.068h-4.856q-.382 0-.382.368v6.03q0 .26-.178.437a.6.6 0 0 1-.436.177z"
    ></path>
  </svg>
)

const EnterSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    fill="none"
    viewBox="0 0 24 21"
  >
    <path
      fill="#D8D8D8"
      d="M7.626 20.802q.495 0 .79-.31t.296-.79q0-.233-.075-.42a1 1 0 0 0-.227-.336l-2.914-2.818-2.722-2.268-.234.578 3.547.178h13.278q2.02 0 2.894-.92.872-.922.872-2.846V4.554q0-2.02-.872-2.886-.873-.866-2.894-.866h-5.677q-.509 0-.818.323a1.1 1.1 0 0 0-.309.79q0 .454.31.777.308.323.817.323h5.677q.839 0 1.19.357.35.358.35 1.182v6.296q0 .838-.35 1.196-.351.357-1.19.357H6.087l-3.547.165.234.591 2.722-2.268L8.41 8.06q.15-.152.227-.33.075-.18.075-.427 0-.48-.295-.783t-.79-.302a1.1 1.1 0 0 0-.812.343L.547 12.678q-.37.344-.37.825 0 .48.37.838l6.268 6.117q.345.345.811.344"
    ></path>
  </svg>
)

const WorldSvg = () => (
  <svg
    stroke="#D8D8D8"
    fill="#D8D8D8"
    viewBox="0 0 512 512"
    height="14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M256 48h-.7c-55.4.2-107.4 21.9-146.6 61.1C69.6 148.4 48 200.5 48 256s21.6 107.6 60.8 146.9c39.1 39.2 91.2 60.9 146.6 61.1h.7c114.7 0 208-93.3 208-208S370.7 48 256 48zm180.2 194h-77.6c-.9-26.7-4.2-52.2-9.8-76.2 17.1-5.5 33.7-12.5 49.7-21 22 28.2 35 61.6 37.7 97.2zM242 242h-61.8c.8-24.5 3.8-47.7 8.8-69.1 17.4 3.9 35.1 6.3 53 7.1v62zm0 28v61.9c-17.8.8-35.6 3.2-53 7.1-5-21.4-8-44.6-8.8-69H242zm28 0h61.3c-.8 24.4-3.8 47.6-8.8 68.9-17.2-3.9-34.8-6.2-52.5-7V270zm0-28v-62c17.8-.8 35.4-3.2 52.5-7 5 21.4 8 44.5 8.8 69H270zm109.4-117.9c-12.3 6.1-25 11.3-38 15.5-7.1-21.4-16.1-39.9-26.5-54.5 24 8.3 45.9 21.6 64.5 39zM315 146.8c-14.7 3.2-29.8 5.2-45 6V79.4c17 9.2 33.6 33.9 45 67.4zM242 79v73.7c-15.4-.8-30.6-2.8-45.5-6.1 11.6-33.8 28.4-58.5 45.5-67.6zm-45.6 6.4c-10.3 14.5-19.2 32.9-26.3 54.1-12.8-4.2-25.4-9.4-37.5-15.4 18.4-17.3 40.1-30.5 63.8-38.7zm-82.9 59.5c15.8 8.4 32.3 15.4 49.2 20.8-5.7 23.9-9 49.5-9.8 76.2h-77c2.6-35.4 15.6-68.8 37.6-97zM75.8 270h77c.9 26.7 4.2 52.3 9.8 76.2-16.9 5.5-33.4 12.5-49.2 20.8-21.9-28.1-34.9-61.5-37.6-97zm56.7 117.9c12.1-6 24.7-11.2 37.6-15.4 7.1 21.3 16 39.6 26.3 54.2-23.7-8.4-45.4-21.5-63.9-38.8zm64-22.6c14.9-3.3 30.2-5.3 45.5-6.1V433c-17.2-9.1-33.9-33.9-45.5-67.7zm73.5 67.3v-73.5c15.2.8 30.3 2.8 45 6-11.4 33.6-28 58.3-45 67.5zm45-5.7c10.4-14.6 19.4-33.1 26.5-54.5 13 4.2 25.8 9.5 38 15.6-18.6 17.3-40.6 30.6-64.5 38.9zm83.5-59.8c-16-8.5-32.6-15.5-49.7-21 5.6-23.9 8.9-49.4 9.8-76.1h77.6c-2.7 35.5-15.6 68.9-37.7 97.1z"></path>
  </svg>
)
