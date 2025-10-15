// src/theme/theme-overrides.ts
import type { GlobalThemeOverrides } from 'naive-ui'

export const themeOverrides: GlobalThemeOverrides = {
  common: {
    textColorBase: '#000',
    borderRadius: '8px',
    primaryColor: '#337080',
    primaryColorHover: '#0f65d6ff',
    fontSize: '1rem',
  },
  Layout: {
    siderColorInverted: "#22333b",
  },
  Card: {
    borderRadius: '10px',
  },
  Tag: {
    borderRadius: '8px'
  },
  Menu: {
    // Background
    itemColorInverted: "#22333b",
    itemColorHoverInverted: "#eae0d5",
    itemColorActiveInverted: "#c6ac8f",

    // Text
    itemTextColorInverted: "#ffffff",
    itemTextColorHoverInverted: "#ffffff",
    itemTextColorActiveInverted: "#ffffff",

    // Icon
    itemIconColorInverted: "#ffffff",
    itemIconColorHoverInverted: "#ffffff",
    itemIconColorActiveInverted: "#ffffff",

    borderRadius: "6px"
  },
  Input: {
    borderRadius: '10px',
    heightSmall: '28px',
    heightMedium: '36px',
    heightLarge: '44px',
    fontSizeSmall: '12px',
    fontSizeMedium: '14px',
    fontSizeLarge: '16px',
  },
  Button: {
    borderRadius: '8px',
    colorHover: '#fff'
  }
}

