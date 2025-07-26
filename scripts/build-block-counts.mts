import { promises as fs } from "fs"
import path from "path"
import { rimraf } from "rimraf"

import { getAllBlockIds } from "../lib/blocks"
import { registryCategories } from "../registry/registry-categories"

async function buildBlockCounts() {
  console.log("📊 Building block counts...")

  const counts: Record<string, number> = {}

  // Calculate counts for each category
  for (const section of Object.values(registryCategories)) {
    for (const category of section.categories) {
      try {
        const blocks = await getAllBlockIds(["registry:block"], [category.slug])
        counts[category.slug] = blocks.length
        console.log(
          `  ${category.name} (${category.slug}): ${blocks.length} blocks`
        )
      } catch (error) {
        console.warn(
          `  Warning: Could not count blocks for ${category.slug}:`,
          error
        )
        counts[category.slug] = 0
      }
    }
  }

  // Write the counts to a JSON file
  const outputPath = path.join(
    process.cwd(),
    "registry",
    "__block-counts__.json"
  )
  rimraf.sync(outputPath)
  await fs.writeFile(outputPath, JSON.stringify(counts, null, 2))

  console.log(`✅ Block counts saved to registry/__block-counts__.json`)
  return counts
}

// Export for use in other scripts
export { buildBlockCounts }

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    await buildBlockCounts()
  } catch (error) {
    console.error("❌ Error building block counts:", error)
    process.exit(1)
  }
}
