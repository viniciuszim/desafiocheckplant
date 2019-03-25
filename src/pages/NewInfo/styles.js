import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  iconRight: {
    fontSize: 24,
    color: colors.white,
  },

  containerForm: {
    flex: 1,
    marginHorizontal: metrics.baseMargin + 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  title: {
    fontSize: 25,
    color: colors.secundary,
    fontWeight: '500',
    letterSpacing: 1,
    marginTop: 5,
  },

  textInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    marginTop: metrics.baseMargin,
    marginBottom: metrics.baseMargin * 3,
  },
});

export default styles;
