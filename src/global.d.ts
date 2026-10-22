declare module "*.css";
import * as React from "react";

declare global {
  namespace JSX {
    interface ElementClass extends React.Component<any, any> {
      render(): React.ReactNode;
    }
  }
}

export {};
