// App.tsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigations/root/RootNavigator';
import queryClient from './src/api/queryClient';

function App() {

  console.log('✅ App Component Rendered');
  return (
    <QueryClientProvider client = {queryClient}>

      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>

    </QueryClientProvider>
  );
}

export default App;
