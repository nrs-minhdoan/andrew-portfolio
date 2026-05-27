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
  | "pugjs";

export interface TechMeta {
  key: TechKey;
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
}
