import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import ChooseNextStep from '../pages/ChooseNextStep';
import Items from '../pages/Items';
import Groups from '../pages/Groups';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="Items" component={Items} />
    <App.Screen name="Groups" component={Groups} />
    <App.Screen name="ChooseNextStep" component={ChooseNextStep} />
  </App.Navigator>
);

export default AppRoutes;