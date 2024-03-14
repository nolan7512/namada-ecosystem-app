import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import thư viện icon MaterialIcons
import Home from './screens/Home';
import Projects from './screens/Project';
import Nebb from './screens/Nebb';
import Explorer from './screens/Explorer';

const Tab = createBottomTabNavigator();



const App = () => {
  const customTheme = {
    dark: true,
    colors: {
      primary: '#FFFF00', // Màu chữ
      background: '#000000', // Màu nền
      card: '#000000',
      text: '#FFFF00', // Màu chữ
      border: '#FFFF00', // Màu chữ cho đường viền
    },
  };
  return (
    <NavigationContainer theme={customTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Namada') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Explorer') {
              iconName = focused ? 'info' : 'info';
            }
            else if (route.name === 'Nebb') {
              iconName = focused ? 'api' : 'api';
            }
            else if (route.name === 'Query') {
              iconName = focused ? 'explore' : 'explore';
            }
            else if (route.name === 'Command') {
              iconName = focused ? 'keyboard-command' : 'keyboard-command';
            }

            // Trả về component Icon với tên icon và thuộc tính size và color
            return <Icon name={iconName} size={25} color="#FFFF00" />;
          },
          tabBarActiveTintColor: '#FFFF00',
          tabBarInactiveTintColor: '#FFFFFF',
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',           
          },
          tabBarStyle: {
            display: 'flex',
          },
        })}
      >
        <Tab.Screen name="Namada" component={Home} />
        <Tab.Screen name="Explorer" component={Explorer} />
        <Tab.Screen name="Nebb" component={Nebb} />
        <Tab.Screen name="Query" component={Projects} />
        <Tab.Screen name="Command" component={Projects} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
