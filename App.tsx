if(__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

// Importaciones necesarias
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer , DefaultTheme,DarkTheme } from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Navegator } from './src/Navegator';
import { AuthProvider } from './src/context/AuthContex';
import { NivelesProvider } from './src/context/NivelesContext';

import { createStackNavigator } from '@react-navigation/stack';

// Tema Oscuro
export const AppDark = {
  ...DarkTheme,
  roundness: 10,
  colors: {
    ...DarkTheme.colors,
    background:'#121212',
    primary: '#3498db',
  },
};

// Tema Claro
export const theme = {
    ...DefaultTheme,
    roundness: 10,
    colors: {
      ...DefaultTheme.colors,
      background: '#f6f6f6',
      primary: '#3498db',
    },
};

// Estado de la aplicación (datos globales de la aplicación)
const AppState =({children}:any)=>{
  return(
   <AuthProvider>
    <NivelesProvider>
     {children}
     </NivelesProvider>
   </AuthProvider>
  )
}
const Stack = createStackNavigator();
// Funcion principal de la aplicación
const App = () => {
  const scheme = useColorScheme();
  return (
    <PaperProvider >
      <AppState>
        <NavigationContainer
          theme={scheme === 'dark' ? AppDark : theme}
        >
          <Navegator/>
        </NavigationContainer>
      </AppState>
    </PaperProvider>
  );
}

export default App;