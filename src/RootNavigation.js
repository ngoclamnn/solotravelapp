import { StackNavigator } from 'react-navigation'
import Loading from 'screens/Loading'
import SignUp from 'screens/SignUp'
import Login from 'screens/Login'
import Chat from 'screens/Chat'
import MainNavigation from './MainNavigation'
import ROUTES from 'config/routes'
const App = StackNavigator(
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
    },
    [ROUTES.chat.routeName]: {
      screen: Chat
    }
  },
  {
    initialRouteName: ROUTES.loading.routeName
  }
)
export default App
