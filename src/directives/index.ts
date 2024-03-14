import type { App } from "vue";
import directiveAuth from "./auth";

export default function useDirectives(app: App<Element>) {
  directiveAuth(app);
}
