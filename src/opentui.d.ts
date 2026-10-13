declare module "@opentui/core" {
  import type { JSX } from "solid-js";

  interface StyleProps {
    flexDirection?: "row" | "column";
    justifyContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
    alignItems?: "flex-start" | "center" | "flex-end" | "stretch";
    gap?: number;
    padding?: number;
    paddingX?: number;
    paddingY?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    margin?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    width?: string | number;
    height?: string | number;
    borderTop?: "single" | "double" | "none";
    borderBottom?: "single" | "double" | "none";
    borderLeft?: "single" | "double" | "none";
    borderRight?: "single" | "double" | "none";
    [key: string]: any;
  }

  interface BoxProps extends StyleProps {
    children?: JSX.Element | JSX.Element[];
  }

  interface TextProps extends StyleProps {
    content?: string;
    weight?: "normal" | "bold";
    color?: string;
    children?: string;
  }

  interface VStackProps extends StyleProps {
    children?: JSX.Element | JSX.Element[];
  }

  export const Box: (props: BoxProps) => JSX.Element;
  export const Text: (props: TextProps) => JSX.Element;
  export const VStack: (props: VStackProps) => JSX.Element;
  export const HStack: (props: BoxProps) => JSX.Element;
}

declare module "@opentui/solid" {
  import type { JSX } from "solid-js";

  export function render<T>(fn: () => T): () => JSX.Element;
}