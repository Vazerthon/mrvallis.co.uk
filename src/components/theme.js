const spacingUnit = 0.25;

module.exports = {
  typography: {
    fontFamilyBody: 'sans-serif',
    fontFamilyHeading: 'serif',
    baseFontSizePx: '20',
  },
  colour: {
    white: '#ffffff',
    transparentBackground: 'rgba(41, 41, 41, 90%)',
    cmyk: {
      cyan: '#00ffff',
      magenta: '#ff00f0',
      yellow: '#ffff00',
      key: '#292929',
    },
  },
  spacing: {
    unit: spacingUnit,
    units: (multiple) => `${multiple * spacingUnit}rem`,
  },
};
