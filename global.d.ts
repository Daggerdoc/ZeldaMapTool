declare module '*.png' {
  const path: string;
  export default path;
}

declare module '*.module.scss' {
  const styles: Record<string, string>;
  export default styles;
  export = styles;
}
