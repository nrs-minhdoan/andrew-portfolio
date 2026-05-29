/**
 * Theme bootstrap loader. Renders an external async `<script src>` so React 19
 * hoists it as a resource (see getResource → "script" branch in react-dom).
 * Inline executable scripts created through React always trigger the dev-only
 * "script tag while rendering React component" warning; hoistable resources
 * bypass that code path entirely.
 *
 * Trade-off: async means the bootstrap may execute marginally after first
 * paint on a cold cache. The script is tiny and preloaded by the browser, so
 * the window for a theme flash is sub-frame in practice. Persisted-theme
 * users who explicitly opt into dark on a light system may see a brief flash;
 * `<ThemeProvider>` on the client immediately re-applies the correct class.
 */
export function ThemeScript() {
  return <script src="/theme-bootstrap.js" async />;
}
