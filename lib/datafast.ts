// Server-side DataFast utilities
// Use this for API routes, Server Actions, and other server-side code

export interface GoalOptions {
  visitorId?: string
  metadata?: Record<string, string | number | boolean>
}

export interface GoalResponse {
  success: boolean
  error?: string
}

/**
 * Track a goal server-side using DataFast API
 * @param goalName - Goal name (lowercase, max 32 chars, numbers/underscores/spaces allowed)
 * @param options - Additional options like visitorId
 */
export async function trackGoalServer(
  goalName: string,
  options: GoalOptions = {}
): Promise<GoalResponse> {
  try {
    // Validate goal name according to DataFast rules
    const validatedGoalName = validateGoalName(goalName)

    const apiKey = process.env.DATA_FAST_API_KEY
    if (!apiKey) {
      throw new Error("DATA_FAST_API_KEY environment variable is not set")
    }

    const response = await fetch("https://api.datafa.st/goal", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        goal_name: validatedGoalName,
        visitor_id: options.visitorId,
        metadata: options.metadata,
      }),
    })

    if (!response.ok) {
      throw new Error(`DataFast API error: ${response.statusText}`)
    }

    return { success: true }
  } catch (error) {
    console.error("Failed to track goal server-side:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

/**
 * Validate goal name according to DataFast rules
 * - Lowercase letters
 * - Numbers, underscores, spaces allowed (spaces converted to underscores)
 * - Max 32 characters
 */
function validateGoalName(goalName: string): string {
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

// Common goal names for type safety
export const GOAL_NAMES = {
  PRICING_CLICKED_BANNER: "pricing_clicked_banner",
  PRICING_CLICKED_HEADER_LINK: "pricing_clicked_header_link",
  PRICING_CLICKED_HEADER_CTA: "pricing_clicked_header_cta",
  PRICING_CLICKED_HERO: "pricing_clicked_hero",
  BROWSE_BLOCKS_CLICKED_HERO: "browse_blocks_clicked_hero",
  PRICING_CLICKED_CTA: "pricing_clicked_cta",
  PRICING_CLICKED_UNLOCK: "pricing_clicked_unlock",
  CHECKOUT_INITIATED: "checkout_initiated",
  COMPONENTS_CLICKED_DOCS: "components_clicked_docs",
} as const

export type GoalName = (typeof GOAL_NAMES)[keyof typeof GOAL_NAMES] | string
