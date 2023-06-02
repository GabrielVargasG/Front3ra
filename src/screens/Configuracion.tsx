import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, useColorScheme, StatusBar, Alert } from 'react-native';
import { AppDark, theme } from '../../App';
import { Button, IconButton, TextInput } from 'react-native-paper';
import { DrawerActions } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from '../hooks/useForm';
import { AuthContext } from '../context/AuthContex';
import { Image } from 'react-native';

interface Props extends StackScreenProps<any, any> { }

export const Configuracion = ({ navigation }: Props) => {
    
    const scheme = useColorScheme();

    const { name, onChange } = useForm({
        name: ''
    });

    const {rename,user,logOut}=useContext(AuthContext);

    //Funcion de renombrar
    const onRename = () => {
        //console.log(name);
        //console.log(user?.uid);
        rename({
            uid: (user?.uid) ? user?.uid : "",
            nombre: (name) ? name : "",
        })
        Alert.alert('Info', 'Es necesario reiniciar sesion, para actualiazar tu nombre', [{
            text: 'Ok',
            onPress: logOut
        }]);
    }
    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor={(scheme === 'dark') ? '#121212' : '#f6f6f6'}
                    barStyle={(scheme === 'dark') ? 'light-content' : 'dark-content'}
                />
                <View style={styles.container}>
                    <IconButton
                        icon="menu"
                        size={30}
                        style={{ marginLeft: -10, marginBottom: 20 }}
                        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    />
                    <Text style={{ color: (scheme === 'dark') ? 'white' : 'black', fontSize: 25, marginBottom: 40 }}>Configuración</Text>

                    <Text style={{ color: (scheme === 'dark') ? 'white' : 'black', fontWeight:'bold', fontSize:18,marginBottom:15 }}>Cambiar de nombre:</Text>

                    

                    <TextInput
                        theme={scheme === 'dark' ? AppDark : theme}
                        label={'Nombre'}
                        mode={'outlined'}
                        // activeOutlineColor={'#FF8F00'}
                        numberOfLines={1}
                        keyboardType="default"
                        autoCapitalize='words'
                        maxLength={80}
                        autoCorrect={false}
                        //onSubmitEditing={}

                        onChangeText={(value) => onChange(value, 'name')}
                        clearTextOnFocus={false}
                    ></TextInput>

<Button
                    mode='text'
                                    theme={scheme === 'dark' ? AppDark : theme}
                                    style={{ marginTop: 40, borderRadius: 10, alignSelf:'center', width:'50%'}}
                                    onPress={() => onRename()}
                                // ()=>navigation.navigate('Inicio')
                                >Guardar</Button>

                </View>
                <View style={{flex:1,marginRight:30,marginTop:-150,justifyContent:'flex-end',alignContent:'flex-end',flexDirection:'row',}}>
            <Image source={ require('../assets/images/Conf.png') }
                style={{
                    width:undefined,
                height: 300,
                resizeMode:'contain',
                aspectRatio:1/2,
                top:200,
                
                }}
                />
            </View>
            </SafeAreaView>
            
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
        paddingHorizontal: 20
    },
    fondo: {
        backgroundColor: '#A6D8F0'
    },
    botonGrande: {
        width: '100%',
        height: 100,
        borderRadius: 20,
        padding: 20,
        marginRight: 10,
        marginBottom: 20
    },
    botonGrandeTexto: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
});