import { ScreenBreakpoints, Devices } from "./interfaces";

export const breakpoints: ScreenBreakpoints = {
  xs: "340px",
  lg: "1024px",
  xl: "1920px",
};

export const size: Devices = {
  mobile: `(min-width: ${breakpoints.xs})`,
  laptop: `(min-width: ${breakpoints.lg})`,
  desktop: `(min-width: ${breakpoints.xl})`,
};
