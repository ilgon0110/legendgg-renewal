import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      black: "#0A2742";
      darkblue: "#0A3B63";
      silver: "#BBB4A5";
      mint: "#00FF99";
    };
    boxShadow: {
      normal: "0 3px 8px 0 rgb(0 0 0 / 10%)";
      purple: "0 3px 8px 0 #d6c9ff";
      blue: "0 3px 8px 0 #b3e2e6";
    };
  }
}
