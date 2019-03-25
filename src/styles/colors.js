import Color from 'color';

export default {
  white: '#FFF',
  lighter: '#EEE',
  light: '#DDD',
  regular: '#999',
  dark: '#666',
  darker: '#333',
  black: '#000',

  primary: '#c1d869',
  primaryDark: Color('#c1d869').darken(0.1),
  secundary: '#80d8f7',
  success: '#9DCA83',
  warn: '#936C3F',
  danger: '#E37A7A',

  transparent: 'transparent',
  darkTransparent: 'rgba(0, 0, 0, 0.6)',
  whiteTransparent: 'rgba(255, 255, 255, 0.3)',

  marker: 'rgba(112,128,144, 0.9)',
  markerRing: 'rgba(112,128,144, 0.3)',
  markerRingBorder: 'rgba(112,128,144, 0.5)',
  markerNotSynchronized: 'rgba(0,100,0, 0.9)',
  markerRingNotSynchronized: 'rgba(0,100,0, 0.3)',
  markerRingBorderNotSynchronized: 'rgba(0,100,0, 0.5)',
};
