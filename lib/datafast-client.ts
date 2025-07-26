"use client"

// Client-side DataFast utilities
// Use this for React components, client-side interactions
import { useCallback } from "react"

import type { GoalName } from "./datafast"

// Extend window interface for DataFast
declare global {
  interface Window {
    datafast?: (goalName: string) => void
  }
}

/**
 * Track a goal client-side using DataFast window function
 * @param goalName - Goal name (lowercase, max 32 chars, numbers/underscores/spaces allowed)
 */
export function trackGoal(goalName: GoalName): void {
  try {
    const validatedGoalName = validateGoalNameClient(goalName)

    if (typeof window !== "undefined" && window.datafast) {
      window.datafast(validatedGoalName)
    } else {
      console.warn("DataFast not initialized. Make sure the script is loaded.")
    }
  } catch (error) {
    console.error("Failed to track goal client-side:", error)
  }
}

/**
 * React hook for tracking goals
 * @returns Object with track function
 */
export function useDataFast() {
  const track = useCallback((goalName: GoalName) => {
    trackGoal(goalName)
  }, [])

  return {
    track,
  }
}

/**
 * Validate goal name according to DataFast rules (client-side version)
 * - Lowercase letters
 * - Numbers, underscores, spaces allowed (spaces converted to underscores)
 * - Max 32 characters
 */
function validateGoalNameClient(goalName: string): string {
  if (!goalName || typeof goalName !== "string") {
    throw new Error("Goal name must be a non-empty string")
  }

  // Convert to lowercase and replace spaces with underscores
  const validated = goalName.toLowerCase().replace(/\s+/g, "_")

  // Check length
  if (validated.length > 32) {
    throw new Error("Goal name must be 32 characters or less")
  }

  // Check for invalid characters (only letters, numbers, underscores allowed)
  if (!/^[a-z0-9_]+$/.test(validated)) {
    throw new Error(
      "Goal name can only contain lowercase letters, numbers, and underscores"
    )
  }

  return validated
}

// Re-export common goal names for convenience
export { GOAL_NAMES } from "./datafast"
export type { GoalName } from "./datafast"
