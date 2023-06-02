import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, useColorScheme, StatusBar, TouchableOpacity, Image } from 'react-native';
import { theme, AppDark } from '../../App';
import { IconButton, Provider, Portal, Modal, Button } from 'react-native-paper';
import { DrawerActions } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NivelContext } from '../context/NivelesContext';
import { Niveles } from '../interfaces/appInterfaces';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { log } from 'react-native-reanimated';

interface Props extends StackScreenProps<any, any> {}

interface Logro {
  titulo: string;
  descripcion: string;
  puntaje?: number;
  cantidad?: number;
}

//Estructura de logros
const logros: Logro[] = [
  {
    titulo: 'Primer nivel contestado',
    descripcion: 'Has contestado el primer nivel',
    cantidad: 1,
  },
  {
    titulo: 'Primera recompensa',
    descripcion: 'Has conseguido 5 puntos en total',
    puntaje: 5,
  },
  {
    titulo: 'Hasta 5 y más allá',
    descripcion: 'Has contestado 5 niveles',
    cantidad: 5,
  },
  {
    titulo: 'Conseguiste 10 puntos',
    descripcion: 'Has conseguido 10 puntos en total',
    puntaje: 10,
  },
  {
    titulo: 'Conseguiste 20 puntos',
    descripcion: 'Has conseguido 20 puntos en total',
    puntaje: 10,
  },
  {
    titulo: 'Maestro de la estrategia',
    descripcion: 'Has alcanzado un puntaje estratégico de 50',
    puntaje: 50,
  },
  {
    titulo: 'Conseguiste 80 puntos',
    descripcion: 'Has conseguido 80 puntos en total',
    puntaje: 80,
  },
  {
    titulo: 'Estudiante valiente',
    descripcion: 'Has explorado 10 niveles',
    cantidad: 10,
  },
  {
    titulo: 'Primer grado',
    descripcion: 'Has completado todos los niveles del primer grado',
    cantidad: 15,
  },
  {
    titulo: 'Dominador de desafíos',
    descripcion: 'Has superado 30 desafíos',
    cantidad: 30,
  },
  {
    titulo: 'Segundo grado',
    descripcion: 'Has completado todos los niveles del Segundo grado',
    cantidad: 30,
  },
  {
    titulo: 'Experto en puntos',
    descripcion: 'Has conseguido 100 puntos en total',
    puntaje: 100,
  },
  {
    titulo: 'Conseguiste 120 puntos',
    descripcion: 'Has conseguido 120 puntos en total',
    puntaje: 120,
  },
  {
    titulo: 'Campeón supremo',
    descripcion: 'Has ganado el juego con un puntaje perfecto',
    puntaje: 150,
  },
];

//Componente de logros
export const Logro = ({ navigation }: Props) => {
  const { niveles, loadNiveles,  } = useContext( NivelContext );
  const { nivelesT } = useContext(NivelContext);
  useEffect(() => {
    loadProductsFromBackend();
    calculateScore();
  }, [nivelesT]);
  const loadProductsFromBackend = async() => {
    await loadNiveles();
  }
  
  const [visible, setVisible] = React.useState(false);
  const [logroSeleccionado, setLogroSeleccionado] = useState<Logro | null>(null);
  const showModal = (logro: Logro) => {
    setVisible(true);
    setLogroSeleccionado(logro);
  };
  const hideModal = () => {
    setVisible(false);
    setLogroSeleccionado(null);
  };
  const scheme = useColorScheme();
  const containerStyle = {
    backgroundColor: scheme === 'dark' ? '#424242' : 'white',
    padding: 25,
    marginHorizontal: 20,
    borderRadius: 15,
    maxHeight: 500,
  };

  
  const [first, setFirst] = useState(0);
  // var first=0;
  const [first2, setFirst2] = useState(0);

  
  // Función para calcular el puntaje y la cantidad de niveles completados
  const calculateScore = () => {
    var score = 0;
    var completados = 0;

    for (let i = 0; i < nivelesT.length; i++) {
      score += nivelesT[i].valor;

      if (nivelesT[i].completo=="true") {
        completados++;
      }
    }

    setFirst(score);
    setFirst2(completados);
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={scheme === 'dark' ? '#121212' : '#f6f6f6'}
          barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <View style={styles.container}>
          <IconButton
            icon="menu"
            size={30}
            style={{ marginLeft: -10, marginBottom: 20 }}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
          <Text style={{ color: scheme === 'dark' ? 'white' : 'black', fontSize: 25, marginBottom: 40 }}>
            Logros
          </Text>
          <Text style={{ color: scheme === 'dark' ? 'white' : 'black', fontSize: 20, marginBottom: 40 }}>
          <Text style={{ fontWeight: 'bold' }}>Puntaje:</Text> {first}    <Text style={{ fontWeight: 'bold' }}>Niveles completados:</Text> {first2}
          </Text>
            {/* <ScrollView> */}
            <FlatList
            data={logros}
            renderItem={({ item}) =>(
            <TouchableOpacity
              key={item.titulo}
              disabled={first < (item.puntaje || 0) || first2 < (item.cantidad || 0)}
              style={{
                ...styles.botonGrande,
                backgroundColor:
                  first < (item.puntaje || 0) || first2 < (item.cantidad || 0) ? '#9B9B9B' : '#3498db',
                overflow: 'hidden',
              }}
              onPress={() => showModal(item)}
            >
              <Text style={styles.botonGrandeTexto}>🏆   {item.titulo}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.titulo}
          />
            {/* </ScrollView> */}
          <Portal theme={scheme === 'dark' ? AppDark : theme}>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
              {logroSeleccionado && (
                <View style={{ alignItems: 'center', marginVertical: 30 }}>
                  <Image
                    source={require('../assets/trophy.png')}
                    style={{
                      width: 130,
                      height: 170,
                      aspectRatio: 100 / 100,
                      marginBottom: 30,
                    }}
                  />
                  <Text style={{ color: scheme === 'dark' ? 'white' : 'black' }}>{logroSeleccionado.descripcion}</Text>
                </View>
              )}
            </Modal>
          </Portal>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    paddingHorizontal: 20,
  },
  fondo: {
    backgroundColor: '#A6D8F0',
  },
  botonGrande: {
    width: '100%',
    height: 100,
    borderRadius: 20,
    padding: 20,
    marginRight: 10,
    marginBottom: 20,
  },
  botonGrandeTexto: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
