declare module "react-simple-maps" {
  import * as React from "react";

  export interface ComposableMapProps {
    width?: number;
    height?: number;
    projection?: string | Function;
    projectionConfig?: any;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
  }

  export class ComposableMap extends React.Component<ComposableMapProps> {}

  export interface GeographiesProps {
    geography?: string | object | string[];
    children?: (data: { geographies: any[] }) => React.ReactNode;
    parseGeographies?: (geos: any[]) => any[];
    className?: string;
    style?: React.CSSProperties;
  }

  export class Geographies extends React.Component<GeographiesProps> {}

  export interface GeographyProps {
    geography?: any;
    onMouseEnter?: (event: any) => void;
    onMouseLeave?: (event: any) => void;
    onMouseDown?: (event: any) => void;
    onMouseUp?: (event: any) => void;
    onClick?: (event: any) => void;
    onFocus?: (event: any) => void;
    onBlur?: (event: any) => void;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
    className?: string;
  }

  export class Geography extends React.Component<GeographyProps> {}

  export interface MarkerProps {
    coordinates?: [number, number];
    children?: React.ReactNode;
    onMouseEnter?: (event: any) => void;
    onMouseLeave?: (event: any) => void;
    onMouseDown?: (event: any) => void;
    onMouseUp?: (event: any) => void;
    onClick?: (event: any) => void;
    onFocus?: (event: any) => void;
    onBlur?: (event: any) => void;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
    className?: string;
  }

  export class Marker extends React.Component<MarkerProps> {}

  export interface AnnotationProps {
    subject?: [number, number];
    dx?: number;
    dy?: number;
    connectorProps?: any;
    children?: React.ReactNode;
    className?: string;
  }

  export class Annotation extends React.Component<AnnotationProps> {}
}
