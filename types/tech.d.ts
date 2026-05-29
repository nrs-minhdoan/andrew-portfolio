export type TechKey =
  | "html"
  | "css"
  | "typescript"
  | "javascript"
  | "nextjs"
  | "react"
  | "nuxtjs"
  | "vuejs"
  | "angular"
  | "reactnative"
  | "nx"
  | "redux"
  | "reduxsaga"
  | "mobx"
  | "vuex"
  | "rxjs"
  | "reactquery"
  | "socketio"
  | "mqtt"
  | "axios"
  | "graphql"
  | "stripe"
  | "paypal"
  | "googlemaps"
  | "vite"
  | "handlebars"
  | "twig"
  | "pugjs"
  | "recoil"
  | "swr"
  | "formik"
  | "reacthookform"
  | "reactrouter"
  | "reactnavigation"
  | "tanstackrouter"
  | "reactspring"
  | "zaloMiniApp"
  | "mui"
  | "antdesign"
  | "chakraui"
  | "tamagui"
  | "ngzorro"
  | "angularmaterial"
  | "tailwindcss"
  | "sass"
  | "jss"
  | "styledcomponents"
  | "apolloclient"
  | "bootstrap"
  | "firebase"
  | "reactstrap"
  | "ngbootstrap"
  | "onesignal"
  | "appcenter"
  | "sentry"
  | "jest"
  | "playwright"
  | "lessjs"
  | "docker";

export type TechCategory = "main" | "small_integration" | "big_integration";

export interface TechMeta {
  key: TechKey;
  type: TechCategory;
  name: string;
  /** devicon path under cdn.jsdelivr.net/gh/devicons/devicon/icons */
  icon?: string;
  /** absolute icon URL (e.g. simple-icons CDN) — takes precedence over `icon` */
  iconUrl?: string;
  /** fallback label when no icon available */
  fallback?: string;
  color: string;
  /** official homepage — click target on TechIcon/TechBadge */
  url?: string;
  /** apply CSS invert filter in dark theme (for black-only logos) */
  invertOnDark?: boolean;
}
