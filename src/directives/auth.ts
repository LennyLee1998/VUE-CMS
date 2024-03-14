import usePermissions from "@/hooks/usePermissions";
import type { App } from "vue";

function directiveAuth(app: App<Element>) {
  app.directive("auth", (el, binding) => {
    const { value } = binding;
    if (!usePermissions(value)) {
      el.remove();
    }
  });
}

export default directiveAuth;
