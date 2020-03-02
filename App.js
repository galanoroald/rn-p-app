import React from 'react';
import { StyleSheet, Image, Text, TextInput, View, Button, Dimensions} from 'react-native';
import { Header } from 'react-native-elements';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Backendless from 'backendless';

///Components
import LoginScreen from './screens/LoginScreen';
import DetailsScreen from './screens/DetailsScreen';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import AccountScreen from './screens/AccountScreen';
import RegisterScreen from './screens/RegisterScreen';
import ReviewScreen from './screens/ReviewScreen';
import Review_ViewScreen from './screens/Review_ViewScreen';

///Styling
import { THEME } from './styles/theme.js';

/*
wa koy lingaw
|------------------//\
|                 //-|\
|                //--|-\
|               //---|--\
|              //----|---\
|             //-----|----\
|            //------|-----\
|-----------<-|------|------>
|            \\------|-----/
|             \\-----|----/
|              \\----|---/
|               \\---|--/
|                \\--|-/
|                 \\-|/
|------------------\\/
*/


/**** Stack Navigator Section ****/
const HomeTab  = createStackNavigator(
  {
    Home: HomeScreen,
    Review_View: Review_ViewScreen
  },
  {
    //Stack Navigator properties
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: THEME.header_background,
      },
      headerTintColor: THEME.header_text,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const ShopTab = createStackNavigator(
  {
    Details: DetailsScreen,
    Game: GameScreen,
    Review: ReviewScreen
  },
  {
    //Stack Navigator properties
    initialRouteName: 'Details',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: THEME.header_background,
      },
      headerTintColor: THEME.header_text,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const AccountTab = createStackNavigator(
  {
    Account: AccountScreen,
  },
  {
    //Stack Navigator properties
    initialRouteName: 'Account',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: THEME.header_background,
      },
      headerTintColor: THEME.header_text,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const SwitchNavigator = createSwitchNavigator(
  {
    Landing: createStackNavigator(
      {
        Login: LoginScreen,
        Register: RegisterScreen,
      },
      {
        //Stack Navigator properties
        initialRouteName: 'Login',
        defaultNavigationOptions: {
          headerStyle: {
            backgroundColor: THEME.header_background,
          },
          headerTintColor: THEME.header_text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        },
      }
    ),
    Main: createBottomTabNavigator(
      {
        Home: {
          screen: HomeTab,
          navigationOptions: {
            tabBarLabel:"Home",
            tabBarIcon: () => (
              <Icon name="home" size={25} color={THEME.icon}/>
            )
          },
        },
        Shop: {
          screen: ShopTab,
          navigationOptions: {
            tabBarLabel:"Review",
            tabBarIcon: () => (
              <Icon name="edit" size={25} color={THEME.icon}/>
            )
          },
        },
        Account: {
          screen: AccountTab,
          navigationOptions: {
            tabBarLabel:"Account",
            tabBarIcon: () => (
              <Icon name="info" size={25} color={THEME.icon}/>
            )
          },
        }
      },
      {
        order: ['Home', 'Shop', 'Account'],
        tabBarOptions: {
          activeTintColor: THEME.active,
          inactiveTintColor: THEME.inactive,
          // activeBackgroundColor: THEME.active,
          // inactiveBackgroundColor: THEME.inactive,
          style: {
            backgroundColor: THEME.footer_background,
          }
        },
      }
    )
  },
  {
    initialRouteName: 'Landing',
  }
);

const AppContainer = createAppContainer(
  SwitchNavigator
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: undefined,
      client: undefined,
      isLoadingComplete: false
    };
    this._loadClient = this._loadClient.bind(this);
  }

  componentDidMount() {
    this._loadClient();
  }

  render() {
    return <AppContainer />;
  }

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  _loadClient() {
    console.log("Initialized...")
    // Stitch.initializeDefaultAppClient("YOUR APP ID").then(client => {
    //   this.setState({ client });
    //   this.state.client.auth
    //     .loginWithCredential(new AnonymousCredential())
    //     .then(user => {
    //       console.log(`Successfully logged in as user ${user.id}`);
    //       this.setState({ currentUserId: user.id });
    //       this.setState({ currentUserId: client.auth.user.id });
    //     })
    //     .catch(err => {
    //       console.log(`Failed to log in anonymously: ${err}`);
    //       this.setState({ currentUserId: undefined });
    //     });
    // });
    var APPLICATION_ID = '27FA6AAE-A240-4B99-A9C7-20AFAE2F6D65';
    var API_KEY = 'E907502D-80B1-4201-865B-6F9776E01972';
    Backendless.serverURL = "https://api.backendless.com";
    Backendless.initApp(APPLICATION_ID, API_KEY);
  }
}



var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//lmao
