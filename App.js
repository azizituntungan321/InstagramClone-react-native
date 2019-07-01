import { createAppContainer, createStackNavigator } from 'react-navigation';
import Login from './app/page/Login'
import ModulHome from './ModulHome'

const rootNavigation = createStackNavigator({
  pageLogin: {
    screen: Login,
    navigationOptions: {
      header: null,
    }
  },
  pageHome: {
    screen: ModulHome,
    navigationOptions: {
      header: null,
    }
  },
}, {
  
  });

export default createAppContainer(rootNavigation);