const bars = Array(12).fill(0)

interface SpinnerProps {
  color?: string
  size?: number
}

export function Spinner({ color, size = 20 }: SpinnerProps) {
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: size, width: size }}
    >
      <div
        className="relative"
        style={{
          top: "50%",
          left: "50%",
          height: size,
          width: size,
        }}
      >
        {bars.map((_, i) => (
          <div
            key={`spinner-bar-${i}`}
            className="absolute rounded-sm"
            style={{
              animation: "spin-fade 1.2s linear infinite",
              animationDelay: `${-1.2 + i * 0.1}s`,
              background: color,
              height: "8%",
              left: "-10%",
              top: "-3.9%",
              width: "24%",
              transform: `rotate(${
                i === 0 ? 0.0001 : i * 30
              }deg) translate(146%)`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
