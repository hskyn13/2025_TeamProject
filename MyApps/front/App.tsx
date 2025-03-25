// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigations/root/RootNavigator';

function App() {

  console.log('✅ App Component Rendered');
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default App;
