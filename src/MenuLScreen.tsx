// Importaciones necesarias
import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerItem } from '@react-navigation/drawer';
import { MenuInicio } from './screens/MenuInicio';
import { Configuracion } from './screens/Configuracion';
import { Logro } from './screens/Logro';
import { AuthContext } from './context/AuthContex';
import { useWindowDimensions, View, useColorScheme } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NivelContext } from './context/NivelesContext';

// Creacion del menu lateral
const Drawer = createDrawerNavigator();

// Menu Lateral
export const MenuLateral = () => {
  
  const { width } = useWindowDimensions();

  return (
    <Drawer.Navigator
      drawerContent={ (props) => <MenuInterno { ...props } /> }
      screenOptions={{headerShown:false,}}
    >
      <Drawer.Screen name="StackNavigator" component={ MenuInicio } />
      <Drawer.Screen name="Configuracion" component={ Configuracion } />
      <Drawer.Screen name="Logros" component={ Logro } />
    </Drawer.Navigator>
  );
}

// Aciones del menu lateral
const MenuInterno = ( { navigation }: DrawerContentComponentProps) => {

    const [state, setState] = useState("First");
    const {logOut}=useContext(AuthContext);
    const {niveles,limpiar}=useContext(NivelContext);
    const scheme = useColorScheme();
    
    const salir = () =>{
      logOut();
      limpiar();
    }

  return (
    <View style={{flex:1, backgroundColor:(scheme === 'dark' ? '#121212': '#f6f6f6')}}>
      <SafeAreaView style={{flex:1, marginVertical:20}}>
        <ScrollView style={{flex:1}}>

          {/* Inicio */}
          <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="home"
                color={color}
                size={size}
              />
            )}
            label="Inicio"
            focused={state==="First"}
            onPress={() => { setState("First");
            navigation.navigate('StackNavigator');
            navigation.closeDrawer(); }}
          />

          {/* Logros */}
          <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="trophy"
                color={color}
                size={size}
              />
            )}
            label="Logros"
            focused={state==="Third"}
            onPress={() => { setState("Third");
            navigation.navigate('Logros');
            navigation.closeDrawer(); }}
          />

          {/* Configuración */}
          <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="gear"
                color={color}
                size={size}
              />
            )}
            label="Configuración"
            focused={state==="Second"}
            onPress={() => { setState("Second");
            navigation.navigate('Configuracion');
            navigation.closeDrawer(); }}
          />

        </ScrollView>

        {/* Cerrar sesión */}
        <View>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="sign-out"
                color={color}
                size={size}
              />
            )}
            label="Cerrar Sesión"
            style={{}}
            onPress={salir}
          />
       </View>

      </SafeAreaView>
    </View>
  );
}

// Función para llamar la sección de inicio
export const MenuScreen = () => {
  
  return (
    <>
        <MenuLateral/>
      </>
    );
  }
  
  
  
  // export function MenuL(){
  //     const {logOut}=useContext(AuthContext);
  //   return (
        
  //     <Drawer.Navigator
  //     // initialRouteName="Inicio"
      
  //     screenOptions={{
  //         headerShown:false,
  //     }}
  //     >
  //       <Drawer.Screen name="Inicio" component={MenuInicio} />
  //       <Drawer.Screen name="Configuracion" component={Configuracion } />
        
  //     </Drawer.Navigator>
  //   );
  // }