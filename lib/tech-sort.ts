import type { TechKey } from "@/types";

/**
 * Display priority for tech chips on project cards. Order:
 *   1. Languages (TS/JS/HTML/CSS)
 *   2. Frameworks (React/Next/Vue/Nuxt/Angular/RN/Vite/Nx/Zalo Mini App)
 *   3. State management
 *   4. Networking (HTTP/socket/MQTT/GraphQL clients)
 *   5. Routers
 *   6. UI component libraries
 *   7. Stylesheet / CSS-in-JS / template engines
 *   8. Form controllers
 *   9. Other libraries / third-party services
 */
const PRIORITY: readonly TechKey[] = [
  "typescript",
  "javascript",
  "html",
  "css",
  "react",
  "nextjs",
  "vuejs",
  "nuxtjs",
  "angular",
  "reactnative",
  "vite",
  "nx",
  "zaloMiniApp",
  "handlebars",
  "twig",
  "pugjs",
  "redux",
  "reduxsaga",
  "mobx",
  "vuex",
  "rxjs",
  "reactquery",
  "recoil",
  "swr",
  "axios",
  "socketio",
  "mqtt",
  "graphql",
  "apolloclient",
  "reactrouter",
  "reactnavigation",
  "tanstackrouter",
  "mui",
  "antdesign",
  "chakraui",
  "tamagui",
  "ngzorro",
  "angularmaterial",
  "reactstrap",
  "ngbootstrap",
  "bootstrap",
  "sass",
  "jss",
  "styledcomponents",
  "tailwindcss",
  "formik",
  "reacthookform",
  "reactspring",
  "stripe",
  "paypal",
  "googlemaps",
  "firebase",
  "sentry",
  "onesignal",
  "appcenter",
];

const RANK = new Map<TechKey, number>(PRIORITY.map((k, i) => [k, i]));

export function sortTechs(techs: readonly TechKey[]): TechKey[] {
  return [...techs].sort(
    (a, b) => (RANK.get(a) ?? Number.POSITIVE_INFINITY) - (RANK.get(b) ?? Number.POSITIVE_INFINITY),
  );
}
