// preinstall guard: block npm/yarn without fetching anything from the
// registry (replaces `npx only-allow pnpm`, which ran unpinned code).
const agent = process.env.npm_config_user_agent || "";

if (!agent.startsWith("pnpm/")) {
  console.error("\nThis project uses pnpm. Run `pnpm install` instead.\n");
  process.exit(1);
}
