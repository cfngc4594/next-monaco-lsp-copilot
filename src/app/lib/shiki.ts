import { getSingletonHighlighter } from "shiki";

// TODO: Move hardcoded theme to constants
// TODO: Use fine-grained bundle for smaller size
const highlighterPromise = getSingletonHighlighter({
  themes: ["vitesse-dark", "vitesse-light"],
  langs: ["c", "cpp", "java", "python"],
});

export const getHighlighter = () => highlighterPromise;
