import { SwitchNavigator } from 'react-navigation'
import Loading from 'screens/Loading'
import SignUp from 'screens/SignUp'
import Login from 'screens/Login'
import MainNavigation from './MainNavigation'
import ROUTES from 'config/routes'
const App = SwitchNavigator(
  {
    [ROUTES.loading.routeName]: {
      screen: Loading
    },
    [ROUTES.signUp.routeName]: {
      screen: SignUp
    },
    [ROUTES.login.routeName]: {
      screen: Login
    },
    [ROUTES.main.routeName]: {
      screen: MainNavigation
    }
  },
  {
    initialRouteName: ROUTES.loading.routeName
  }
)
export default App
