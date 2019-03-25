import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import HeaderNavigationOptions from '~/components/Header';

import Welcome from '~/pages/Welcome';
import NewInfo from '~/pages/NewInfo';

const InitialStack = createStackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: HeaderNavigationOptions.headerWithTitle,
  },
  NewInfo: {
    screen: NewInfo,
    navigationOptions: HeaderNavigationOptions.headerWithBackButton,
  },
});

const AppRoute = createSwitchNavigator({ InitialStack });

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      App: AppRoute,
    },
    {
      initialRouteName: 'App',
    },
  ),
);

export default Routes;
