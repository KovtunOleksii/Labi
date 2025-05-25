/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

/**
 * Color scheme based on the original project
 */

const primaryColor = '#120b0c';      // Dark brown/black
const secondaryColor = '#d88b42';    // Orange/brown
const accentColor = '#bec6c8';       // Light gray
const backgroundColor = '#F5F5F5';    // Light gray background
const textColor = '#333333';         // Dark gray text

export const Colors = {
  light: {
    text: textColor,
    textDim: '#666666',
    background: backgroundColor,
    tint: secondaryColor,
    icon: secondaryColor,
    tabIconDefault: accentColor,
    tabIconSelected: secondaryColor,
    card: '#FFFFFF',
    input: '#FFFFFF',
    border: accentColor,
    error: '#dc3545',
    primary: primaryColor,
    secondary: secondaryColor,
    accent: accentColor,
    success: '#28a745',
    backgroundDim: '#f0f0f0',
  },
  dark: {
    text: '#FFFFFF',
    textDim: accentColor,
    background: primaryColor,
    tint: secondaryColor,
    icon: secondaryColor,
    tabIconDefault: accentColor,
    tabIconSelected: secondaryColor,
    card: '#1a1a1a',
    input: '#2a2a2a',
    border: accentColor,
    error: '#dc3545',
    primary: primaryColor,
    secondary: secondaryColor,
    accent: accentColor,
    success: '#28a745',
    backgroundDim: '#2a2a2a',
  },
};
