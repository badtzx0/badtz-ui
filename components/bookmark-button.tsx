"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { useBookmarks } from "@/hooks/use-bookmarks"
import { Button } from "@/components/ui/button"

interface BookmarkButtonProps extends React.ComponentProps<"div"> {
  title: string
  href: string
}

export function BookmarkButton({
  className,
  title,
  href,
}: BookmarkButtonProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks()
  const bookmarked = isBookmarked(href)

  const handleClick = () => {
    if (!bookmarked) {
      setShouldAnimate((prevState) => !prevState)
      addBookmark({ title, href })
      let slug = ""
      if (typeof window !== "undefined") {
        const parts = window.location.pathname.split("/").filter(Boolean)
        slug = parts[parts.length - 1] || ""
        slug = slug.toLowerCase().replace(/[^a-z0-9]/g, "_")
      }
      const goalName = `bookmarked_${slug}`.substring(0, 32)
      if (typeof window !== "undefined" && window.datafast) {
        window.datafast(goalName)
      }
    } else {
      removeBookmark(href)
    }
  }

  useEffect(() => {
    if (shouldAnimate) {
      const tid = setTimeout(() => {
        setShouldAnimate((prevState) => !prevState)
      }, 520)

      return () => {
        clearTimeout(tid)
      }
    }
  }, [shouldAnimate])

  return (
    <Button
      className={cn(
        "[&_svg]:text-muted-foreground text-fd-secondary-foreground h-8 w-auto justify-start gap-3.5 border bg-transparent px-2 text-xs shadow-none transition-all duration-300 ease-out hover:bg-transparent [&_svg]:!size-3",
        className
      )}
      onClick={handleClick}
    >
      <div className="relative mt-1 h-3 w-3" tabIndex={-1}>
        <motion.div
          animate={shouldAnimate ? { y: -6, x: -2, rotate: -2 } : {}}
          transition={{
            type: "spring",
            stiffness: 800,
            damping: 100,
            duration: 0.5,
          }}
          className="absolute bottom-0 left-0 z-[2] flex"
        >
          <BookmarkIcon active={bookmarked} />
        </motion.div>
        <motion.div
          animate={shouldAnimate ? { y: -8, x: 1, rotate: 2 } : {}}
          transition={{
            type: "spring",
            stiffness: 600,
            damping: 100,
            duration: 0.5,
            delay: 0.05,
          }}
          className="absolute -right-1.5 bottom-1 z-[1] flex"
        >
          <BookmarkIcon active={bookmarked} />
        </motion.div>
        <AnimatePresence>{shouldAnimate && <Confetti />}</AnimatePresence>
      </div>
      <motion.span
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          duration: 0.3,
        }}
      >
        {bookmarked ? "Bookmarked" : "Bookmark"}
      </motion.span>
    </Button>
  )
}

const BookmarkIcon = ({ active }: { active?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    stroke={active ? "var(--foreground)" : "var(--muted-foreground)"}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
    fill={active ? "var(--foreground)" : "var(--background)"}
    style={{
      filter:
        "drop-shadow(1px 0 0 var(--background)) drop-shadow(-1px 0 0 var(--background)) drop-shadow(0 1px 0 var(--background)) drop-shadow(0 -1px 0 var(--background))",
    }}
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
)

const Confetti = () => {
  const variants = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    animate: (e: {
      animateX: number
      animateY: number
      animateRotate?: number
    }) => {
      return {
        opacity: 1,
        scale: 1,
        x: e.animateX,
        y: e.animateY,
        rotate: e.animateRotate ?? 0,
      }
    },
    exit: (e: { exitX: number; exitY: number; exitRotate?: number }) => {
      return {
        opacity: 0.5,
        scale: 0,
        x: e.exitX,
        y: e.exitY,
        rotate: e.exitRotate ?? 0,
      }
    },
  }

  return (
    <>
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={{
          animateX: 8,
          animateY: -12,
          exitX: 18,
          exitY: -15,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 100,
          duration: 0.5,
        }}
        className="bg-muted-foreground absolute right-0.5 -bottom-3.5 h-1.5 w-1.5 rounded-full"
      />
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={{
          animateX: 7,
          animateY: -14,
          exitX: 27,
          exitY: -10,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 100,
          duration: 0.5,
        }}
        className="bg-muted-foreground absolute -right-2.5 -bottom-1 h-2 w-2 rounded-full"
      />
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={{
          animateX: 8,
          animateY: -26,
          exitX: 13,
          exitY: -22,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 100,
          duration: 0.5,
        }}
        className="bg-muted-foreground absolute top-0 -right-0.5 h-1.5 w-1.5 rounded-full"
      />
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={{
          animateX: -26,
          animateY: -14,
          exitX: -30,
          exitY: -17,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 100,
          duration: 0.5,
        }}
        className="bg-muted-foreground absolute top-2 left-3 h-1.5 w-1.5 rounded-full"
      />
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={{
          animateX: -12,
          animateY: -22,
          exitX: -16,
          exitY: -17,
          animateRotate: -30,
          exitRotate: -70,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 100,
          duration: 0.5,
        }}
        className="absolute -top-4 left-0.5 flex"
      >
        <StarIcon />
      </motion.div>
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={{
          animateX: 21,
          animateY: -7,
          exitX: 26,
          exitY: -5,
          animateRotate: 30,
          exitRotate: 70,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 100,
          duration: 0.5,
        }}
        className="absolute -top-2.5 left-2.5 flex"
      >
        <StarIcon />
      </motion.div>
    </>
  )
}

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="var(--muted-foreground)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)
