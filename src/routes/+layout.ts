// This prevents a bug where /privacy/page.ts tries to access local storage on
// the server, and obviously fails. SSR stands for Server Side Rendering
export const ssr = false;
