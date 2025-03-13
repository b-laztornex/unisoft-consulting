/// <reference types="@solidjs/start/env" />
import "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      slider: any; // or a more specific type if needed
    }
  }
}
