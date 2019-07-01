import React from 'react'
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './app/page/Home'
import Profile from './app/page/Profile'
import AddContent from './app/page/AddContent';
import UpdateContent from './app/page/UpdateContent';

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Icon;
  let iconName;
  if (routeName === 'pageHome') {
    iconName = 'home';
  } else if (routeName === 'pageSearch') {
    iconName = `search`;
  } else if (routeName === 'pagePlus') {
    iconName = 'plus-square'
  } else if (routeName === 'pageNotification') {
    iconName = 'heart'
  } else if (routeName === 'pageProfile') {
    iconName = 'user'
  }
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const childNavigation = createStackNavigator({
  pageHandle: {
    screen: Home,
    navigationOptions: {
      header: null,
    }
  },
  pageHandleUpdate: {
    screen: UpdateContent,
    navigationOptions:{
      footer:null,
    }
  },
}, {
    initialRouteName: 'pageHandle'
  });

export default  createAppContainer(
  createBottomTabNavigator(
    {
      pageHome: { screen: childNavigation },
      pageSearch: { screen: AddContent },
      pagePlus: { screen: AddContent },
      pageNotification: { screen: Profile },
      pageProfile: { screen: Profile },
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor),
      }),
      tabBarOptions: {
        activeTintColor: 'black',
        inactiveTintColor: 'grey',
        showLabel: false
      },
    }
  )
);