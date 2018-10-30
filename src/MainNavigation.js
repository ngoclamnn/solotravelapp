import { createStackNavigator } from 'react-navigation'

import ROUTES from 'config/routes'
import Main from 'screens/Main'

const MainNavigation = createStackNavigator(
  {
    [ROUTES.main.routeName]: {
      screen: Main,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: ROUTES.main.routeName,
    mode: 'modal'
  }
)

export default MainNavigation
