declare module "react-simple-maps" {
  import { ComponentProps, ReactNode } from "react";

  interface ComposableMapProps {
    projection?: string;
    projectionConfig?: Record<string, unknown>;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    className?: string;
  }

  interface GeographyProps extends ComponentProps<"path"> {
    geography: unknown;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
  }

  interface GeographiesProps {
    geography: string | object;
    children: (props: { geographies: GeographyItem[] }) => ReactNode;
  }

  interface GeographyItem {
    rsmKey: string;
    id: string;
    properties: Record<string, string>;
    [key: string]: unknown;
  }

  export function ComposableMap(props: ComposableMapProps & { children?: ReactNode }): JSX.Element;
  export function Geographies(props: GeographiesProps): JSX.Element;
  export function Geography(props: GeographyProps): JSX.Element;
  export function ZoomableGroup(props: { children?: ReactNode; [key: string]: unknown }): JSX.Element;
  export function Marker(props: { coordinates: [number, number]; children?: ReactNode; [key: string]: unknown }): JSX.Element;
}
