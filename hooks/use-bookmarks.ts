"use client"

import { useCallback, useEffect, useState } from "react"

interface Bookmark {
  title: string
  href: string
}

const STORAGE_KEY = "badtz-ui-bookmarks"
const BOOKMARKS_EVENT = "bookmarks-updated"

function getBookmarksFromStorage(): Bookmark[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveBookmarksToStorage(bookmarks: Bookmark[]) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
    window.dispatchEvent(
      new CustomEvent(BOOKMARKS_EVENT, { detail: bookmarks })
    )
  } catch (error) {
    console.error("Failed to save bookmarks:", error)
  }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setBookmarks(getBookmarksFromStorage())
    setIsLoaded(true)

    const handleBookmarksUpdate = (event: CustomEvent<Bookmark[]>) => {
      setBookmarks(event.detail)
    }

    window.addEventListener(
      BOOKMARKS_EVENT,
      handleBookmarksUpdate as EventListener
    )

    return () => {
      window.removeEventListener(
        BOOKMARKS_EVENT,
        handleBookmarksUpdate as EventListener
      )
    }
  }, [])

  const addBookmark = useCallback((bookmark: Bookmark) => {
    const currentBookmarks = getBookmarksFromStorage()
    const exists = currentBookmarks.some((b) => b.href === bookmark.href)

    if (!exists) {
      const newBookmarks = [...currentBookmarks, bookmark]
      saveBookmarksToStorage(newBookmarks)
      setBookmarks(newBookmarks)
    }
  }, [])

  const removeBookmark = useCallback((href: string) => {
    const currentBookmarks = getBookmarksFromStorage()
    const newBookmarks = currentBookmarks.filter((b) => b.href !== href)
    saveBookmarksToStorage(newBookmarks)
    setBookmarks(newBookmarks)
  }, [])

  const isBookmarked = useCallback(
    (href: string) => {
      return bookmarks.some((b) => b.href === href)
    },
    [bookmarks]
  )

  return {
    bookmarks,
    isLoaded,
    addBookmark,
    removeBookmark,
    isBookmarked,
  }
}
