export const FADE_IN_ANIMATION_SETTINGS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.2 },
};

export const FADE_DOWN_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

export const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

export const SUPPORTED_TOKENS = [
  {
    icon: "/flow-flow-logo.svg",
    title: "FLOW",
  },
  {
    icon: "/usd-coin-usdc-logo.svg",
    title: "USDC",
  },
];

export const SUPPORTED_TOKENS_MAP = {
  FLOW: {
    icon: "/flow-flow-logo.svg",
  },
  USDC: {
    icon: "/usd-coin-usdc-logo.svg",
  },
  incFLOW: {
    icon: "/increment-logo-transparent.png",
  },
};
