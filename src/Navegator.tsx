// Importaciones necesarias
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { InicioScreen } from './screens/InicioScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegistroScreen } from './screens/RegistroScreen';
import { AuthContext } from './context/AuthContex';
import { LoadingScreen } from './screens/LoadingScreen';
import { MenuScreen } from './MenuLScreen';
import { PrimerGrado } from './screens/PrimerGrado';
import { SegGrado } from './screens/SegGrado';

import Nivel1 from './screens/Niveles/Primer grado/Nivel1';
import Nivel2 from './screens/Niveles/Primer grado/Nivel2';
import Nivel3 from './screens/Niveles/Primer grado/Nivel3';
import Nivel4 from './screens/Niveles/Primer grado/Nivel4';
import Nivel5 from './screens/Niveles/Primer grado/Nivel5';
import Nivel6 from './screens/Niveles/Primer grado/Nivel6';
import Nivel7 from './screens/Niveles/Primer grado/Nivel7';
import Nivel8 from './screens/Niveles/Primer grado/Nivel8';
import Nivel9 from './screens/Niveles/Primer grado/Nivel9';
import Nivel10 from './screens/Niveles/Primer grado/Nivel10';
import Nivel11 from './screens/Niveles/Primer grado/Nivel11';
import Nivel12 from './screens/Niveles/Primer grado/Nivel12';
import Nivel13 from './screens/Niveles/Primer grado/Nivel13';
import Nivel14 from './screens/Niveles/Primer grado/Nivel14';
import Nivel15 from './screens/Niveles/Primer grado/Nivel15';

import Nivel1_2 from './screens/Niveles/Segundo grado/Nivel1_2';
import Nivel2_2 from './screens/Niveles/Segundo grado/Nivel2_2';
import Nivel3_2 from './screens/Niveles/Segundo grado/Nivel3_2';
import Nivel4_2 from './screens/Niveles/Segundo grado/Nivel4_2';
import Nivel5_2 from './screens/Niveles/Segundo grado/Nivel5_2';
// import Nivel6_2 from './screens/Niveles/Segundo grado/Nivel6_2';
// import Nivel7_2 from './screens/Niveles/Segundo grado/Nivel7_2';
// import Nivel8_2 from './screens/Niveles/Segundo grado/Nivel8_2';
// import Nivel9_2 from './screens/Niveles/Segundo grado/Nivel9_2';
// import Nivel10_2 from './screens/Niveles/Segundo grado/Nivel10_2';
// import Nivel11_2 from './screens/Niveles/Segundo grado/Nivel11_2';
// import Nivel12_2 from './screens/Niveles/Segundo grado/Nivel12_2';
// import Nivel13_2 from './screens/Niveles/Segundo grado/Nivel13_2';
// import Nivel14_2 from './screens/Niveles/Segundo grado/Nivel14_2';
// import Nivel15_2 from './screens/Niveles/Segundo grado/Nivel15_2';

// Creacion del navegador entre pantallas
const Stack = createStackNavigator();

// Navegador entre pantallas
export const Navegator = () => {

  // Estado de usuario
  const {status}=useContext(AuthContext);
  
  // Muestra un indicador de canga en lo que se define el estado del usuario
  if(status==='checking')return<LoadingScreen/>

  return (
    <Stack.Navigator
      screenOptions={{headerShown:false}}
    >
      {/* <Stack.Screen name="Nivel3" component={Nivel3} /> */}
      {/* <Stack.Screen name="Nivel3" component={App} /> */}


      {
        (status !== 'authenticated') 
          ? (
            
            <>
              {/* Menu de inicio de sesion y registro (no autenticado)*/}
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Registro" component={RegistroScreen} />
            </>
          )
          : (
            <>
              {/* Menu de inicio (autenticado)*/}
                  {/* <Drawer.Navigator>
                    <Drawer.Screen name="Inicio" component={InicioScreen} />
                    <Drawer.Screen name="Configuracion" component={Configuracion } />
                  </Drawer.Navigator> */}
                  {/* <MenuLateralBasico/> */}
              <Stack.Screen name="Inicio" component={InicioScreen} />
              <Stack.Screen name="Menu" component={MenuScreen} />
              <Stack.Screen name="Primer" component={PrimerGrado} />
              <Stack.Group>
                <Stack.Screen name="Nivel1" component={Nivel1} />
                <Stack.Screen name="Nivel2" component={Nivel2} />
                <Stack.Screen name="Nivel3" component={Nivel3} />
                <Stack.Screen name="Nivel4" component={Nivel4} />
                <Stack.Screen name="Nivel5" component={Nivel5} />
                <Stack.Screen name="Nivel6" component={Nivel6} />
                <Stack.Screen name="Nivel7" component={Nivel7} />
                <Stack.Screen name="Nivel8" component={Nivel8} />
                <Stack.Screen name="Nivel9" component={Nivel9} />
                <Stack.Screen name="Nivel10" component={Nivel10} />
                <Stack.Screen name="Nivel11" component={Nivel11} />
                <Stack.Screen name="Nivel12" component={Nivel12} /> 
                <Stack.Screen name="Nivel13" component={Nivel13} />
                <Stack.Screen name="Nivel14" component={Nivel14} />
                <Stack.Screen name="Nivel15" component={Nivel15} />
              </Stack.Group>
              <Stack.Screen name="Seg" component={SegGrado} />
              <Stack.Group>
                <Stack.Screen name="Nivel1_2" component={Nivel1_2} />
                <Stack.Screen name="Nivel2_2" component={Nivel2_2} />
                <Stack.Screen name="Nivel3_2" component={Nivel3_2} />
                <Stack.Screen name="Nivel4_2" component={Nivel4_2} />
                <Stack.Screen name="Nivel5_2" component={Nivel5_2} />
                {/* <Stack.Screen name="Nivel6_2" component={Nivel6_2} />
                <Stack.Screen name="Nivel7_2" component={Nivel7_2} />
                <Stack.Screen name="Nivel8_2" component={Nivel8_2} />
                <Stack.Screen name="Nivel9_2" component={Nivel9_2} />
                <Stack.Screen name="Nivel10_2" component={Nivel10_2} />
                <Stack.Screen name="Nivel11_2" component={Nivel11_2} />
                <Stack.Screen name="Nivel12_2" component={Nivel12_2} />
                <Stack.Screen name="Nivel13_2" component={Nivel13_2} />
                <Stack.Screen name="Nivel14_2" component={Nivel14_2} />
                <Stack.Screen name="Nivel15_2" component={Nivel15_2} /> */}
              </Stack.Group>
            </>
          )
      }
    </Stack.Navigator>
  );
}