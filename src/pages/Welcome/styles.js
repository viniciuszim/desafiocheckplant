import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'relative',
  },

  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.marker,
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.markerRing,
    position: 'absolute',
    borderWidth: 1,
    borderColor: colors.markerRingBorder,
  },
  markerNotSynchronized: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.markerNotSynchronized,
  },
  ringNotSynchronized: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.markerRingNotSynchronized,
    position: 'absolute',
    borderWidth: 1,
    borderColor: colors.markerRingBorderNotSynchronized,
  },

  calloutView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
    width: 200,
    height: 200,
    marginTop: metrics.baseMargin * 2,
  },
  date: {
    fontWeight: 'bold',
    fontSize: 12,
    color: colors.black,
    marginBottom: 5,
  },
  info: {
    flex: 1,
    fontSize: 15,
    color: colors.black,
  },
});

export default styles;
