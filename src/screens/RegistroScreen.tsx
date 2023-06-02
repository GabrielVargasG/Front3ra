import React, { useContext } from 'react';
import { Text, View, useColorScheme, KeyboardAvoidingView, Keyboard, Image, Platform, TouchableWithoutFeedback, StatusBar } from 'react-native';
import { Button, Checkbox, IconButton, Modal, Portal, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { useForm } from '../hooks/useForm';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../context/AuthContex';
import { useState } from 'react';
import { AppDark, theme } from '../../App';

interface Props extends StackScreenProps<any, any> { }

export const RegistroScreen = ({ navigation }: Props) => {

    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const [checked, setChecked] = React.useState(true);

    const { email, password, name, onChange } = useForm({
        email: '',
        password: '',
        name: ''
    });
    const { signUp } = useContext(AuthContext);

    const onRegistro = () => {
        if (checked === true) {
            console.log({ email, password, name });
            Keyboard.dismiss();
            signUp({ correo: email, nombre: name, password });
        } else {
            showModalT();
        }
    }

    const scheme = useColorScheme();

    const [visible, setVisible] = React.useState(false);
    const [modal, setModal] = React.useState(false);

    const showModalT = () => setModal(true);
    const hideModalT = () => setModal(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const containerStyle = {
        backgroundColor: (scheme === 'dark' ? '#424242' : 'white'),
        padding: 25, marginHorizontal: 20, borderRadius: 15, maxHeight: 500
    };

    return (
        <>
            <StatusBar
                backgroundColor={(scheme === 'dark') ? '#121212' : '#f6f6f6'}
                barStyle={(scheme === 'dark') ? 'light-content' : 'dark-content'}
            />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <KeyboardAvoidingView
                    style={{ flex: 1, }}
                    behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
                >
                    <SafeAreaView
                        style={{ flex: 1 }}
                    >

                        

                        <View style={{ flex: 1, paddingHorizontal: 30, justifyContent: 'center', }}>
                            <View style={{ alignItems: 'center', marginBottom: -60, top: -80 }}>
                                <Image source={require('../assets/Recurso3.png')}
                                    style={{
                                        width: 130,
                                        height: 170,
                                        aspectRatio: 100 / 100
                                    }}
                                />
                            </View>

                                    <Text style={{color: (scheme === 'dark') ? 'white' : 'black',textAlign:'center', fontWeight:'bold', fontSize:18}}>Regístrarse</Text>
                            

                            <TextInput
                                theme={scheme === 'dark' ? AppDark : theme}
                                style={{ marginVertical: 10, }}
                                label={'Nombre'}
                                mode={'outlined'}
                                // activeOutlineColor={'#FF8F00'}
                                placeholder='Nombre'
                                autoCapitalize='words'
                                onSubmitEditing={onRegistro}
                                onChangeText={(value) => onChange(value, 'name')}
                            >
                            </TextInput>
                            <TextInput
                                theme={scheme === 'dark' ? AppDark : theme}
                                style={{ marginVertical: 10, }}
                                label={'Email'}
                                autoCapitalize='none'
                                mode={'outlined'}
                                // activeOutlineColor={'#FF8F00'}
                                placeholder='Email'
                                onSubmitEditing={onRegistro}
                                onChangeText={(value) => onChange(value, 'email')}
                            >
                            </TextInput>
                            <TextInput
                                theme={scheme === 'dark' ? AppDark : theme}
                                style={{ marginVertical: 10, }}
                                label={'Contraseña'}
                                mode={'outlined'}
                                // activeOutlineColor={'#FF8F00'}
                                placeholder='**********'
                                autoCapitalize='none'
                                onSubmitEditing={onRegistro}
                                onChangeText={(value) => onChange(value, 'password')}
                                secureTextEntry={secureTextEntry}
                                right={
                                    <TextInput.Icon name="eye" theme={scheme === 'dark' ? AppDark : theme} onPress={() => {
                                        setSecureTextEntry(!secureTextEntry);
                                        return false;
                                    }} />}
                            >
                            </TextInput>

                            <Button
                                theme={scheme === 'dark' ? AppDark : theme}
                                onPress={onRegistro}
                                style={{ marginTop: 20, paddingBottom: 30, borderRadius: 10, width: '50%', alignSelf: 'center' }}
                            >Crear Cuenta</Button>

                            <IconButton
                                style={{ position: 'absolute', top: 0, left: 0 }}
                                icon="arrow-left"
                                theme={scheme === 'dark' ? AppDark : theme}
                                // color={scheme === 'dark' ? 'white': 'black'}
                                size={28}
                                onPress={() => navigation.navigate('Login')}
                            />
                        </View>

                        <Portal theme={scheme === 'dark' ? AppDark : theme}>
                            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                                <ScrollView>
                                    <Text
                                        style={{ color: (scheme === 'dark' ? 'white' : 'black'), textAlign: 'center' }}
                                    ><Text style={{ fontWeight: 'bold' }}>Términos y condiciones de uso de la aplicación móvil:</Text>
                                        {'\n'}{'\n'}Bienvenido/a a nuestra aplicación móvil, por favor lee cuidadosamente estos términos y condiciones antes de utilizar nuestra plataforma. Al registrarte y utilizar nuestra aplicación, estás aceptando los siguientes términos y condiciones:


                                        {'\n'}{'\n'}Protección de datos personales: La información que se recopila en nuestra aplicación, como tu nombre y correo electrónico, será utilizada exclusivamente para el registro y autenticación de tu cuenta. Garantizamos que toda la información que proporciones será manejada de forma confidencial y protegida bajo las leyes de protección de datos de México.
                                        Uso de internet: La aplicación requiere acceso a internet para su correcto funcionamiento. Toda la información que se transmita a través de la aplicación se realiza de forma segura y se protege contra posibles ataques o intrusiones externas.


                                        {'\n'}{'\n'}Propiedad intelectual: Todos los derechos de propiedad intelectual relacionados con la aplicación son propiedad exclusiva del titular de la aplicación. Queda prohibido el uso o reproducción de cualquier contenido o funcionalidad de la aplicación sin la autorización expresa del titular.


                                        {'\n'}{'\n'}Modificaciones: El titular de la aplicación se reserva el derecho de modificar estos términos y condiciones en cualquier momento, sin previo aviso. La utilización continua de la aplicación después de cualquier modificación se considerará como una aceptación de los nuevos términos y condiciones.


                                        {'\n'}{'\n'}Responsabilidad: El titular de la aplicación no será responsable de ningún daño o perjuicio que se pueda derivar del uso de la aplicación o de cualquier información o contenido que se proporcione en ella. La utilización de la aplicación es bajo su propio riesgo.


                                        {'\n'}{'\n'}Resolución de conflictos: Cualquier conflicto que surja de la interpretación o aplicación de estos términos y condiciones será resuelto en los tribunales competentes de acuerdo con las leyes de protección de datos de México.


                                        {'\n'}{'\n'}Al registrarte y utilizar nuestra aplicación móvil, aceptas los términos y condiciones mencionados anteriormente. Si no estás de acuerdo con estos términos y condiciones, te recomendamos que no utilices nuestra aplicación.

                                    </Text>
                                </ScrollView>
                            </Modal>

                            <Modal visible={modal} onDismiss={hideModalT} contentContainerStyle={containerStyle}>
                                <ScrollView >
                                    <Text style={{ color: (scheme === 'dark' ? 'white' : 'black') }} > Es necesario aceptar los terminos y condiciones.</Text>
                                </ScrollView>
                            </Modal>
                        </Portal>

                    </SafeAreaView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', alignSelf: 'center', bottom: 30 }} >
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    theme={scheme === 'dark' ? AppDark : theme}
                    // color='#FF8F00'
                    onPress={() => {
                        setChecked(!checked);
                    }}
                />
                <Button labelStyle={{ fontSize: 12 }}

                    theme={scheme === 'dark' ? AppDark : theme}
                    style={{}} onPress={showModal}
                >Terminos y condiciones</Button>
            </View>
        </>
    );
}