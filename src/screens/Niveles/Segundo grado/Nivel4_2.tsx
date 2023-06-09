import React, { useContext, useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Modal, Animated, Dimensions, useColorScheme } from 'react-native';
import { nivelA } from '../../SegGrado';
import { dataN4_2 } from '../../../data/BasePreguntas';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackScreenProps } from '@react-navigation/stack';
import { NivelContext } from '../../../context/NivelesContext';

import Tts from 'react-native-tts';
Tts.setDefaultLanguage('es-MX'); // Establece el idioma por defecto en español
Tts.setDefaultRate(0.4); // Establece la velocidad de habla
Tts.setDefaultPitch(1.0); // Establece el tono de voz
import { IconButton } from 'react-native-paper';


const { width, height } = Dimensions.get('window');
export const COLORS = {
    primary: "#252c4a",
    secondary: '#1E90FF',
    accent: '#3498db',

    success: '#00C851',
    error: '#ff4444',

    black: "#171717",
    white: "#FFFFFF",
    background: "#252C4A"
}
export const SIZES = {
    base: 10,
    width,
    height
}

import { shuffle,orden } from '../Primer grado/Nivel1';

var Images = [
    require('../images1/image42.png'),
    require('../images2/image5.png'),
    require('../images1/image19.png'),
    require('../images1/image19.png'),
    require('../images1/image19.png'),
];

interface Props extends StackScreenProps<any, any> { }

const Nivel4_2 = ({ navigation }: Props) => {
    
    const { updateNivel } = useContext(NivelContext);
    const ira = () => {
        // console.log(nivelA)
        updateNivel(score, nivelA);
        navigation.reset({
            index: 0,
            routes: [{ name: "Menu" }],
        });

        // navigation.replace(accion)
    }

    const allQuestions = dataN4_2;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState('');
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0)
    const [showNextButton, setShowNextButton] = useState(false)
    const [showScoreModal, setShowScoreModal] = useState(false)

    const validateAnswer = (selectedOption: any) => {
        let correct_option = allQuestions[orden[currentQuestionIndex]]['correct_option'];
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsOptionsDisabled(true);
        if (selectedOption == correct_option) {
            // Set Score
            setScore(score + 1)
        }
        // Show Next Button
        setShowNextButton(true)
    }
    const handleNext = () => {
        
        if (currentQuestionIndex == orden.length - 1) {
            // Last Question
            // Show Score Modal
            setShowScoreModal(true)
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentOptionSelected(null);
            setCorrectOption('');
            setIsOptionsDisabled(false);
            setShowNextButton(false);
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex + 1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }
    const restartQuiz = () => {

        shuffle(orden);
        
        setShowScoreModal(false);

        setCurrentQuestionIndex(0);
        setScore(0);

        setCurrentOptionSelected(null);
        setCorrectOption('');
        setIsOptionsDisabled(false);
        setShowNextButton(false);
        Animated.timing(progress, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }



    const renderQuestion = () => {
        return (
            <View style={{
                marginVertical: 40
            }}>
                {/* Question Counter */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}>
                    <Text style={{ color: (scheme === 'dark') ? 'white' : 'black', fontSize: 20, opacity: 0.6, marginRight: 2 }}>{currentQuestionIndex + 1}</Text>
                    <Text style={{ color: (scheme === 'dark') ? 'white' : 'black', fontSize: 18, opacity: 0.6 }}>/ {allQuestions.length}</Text>
                </View>

                {/* Question */}
                <Text style={{
                    color: (scheme === 'dark') ? 'white' : 'black',
                    fontSize: 30
                }}>{allQuestions[orden[currentQuestionIndex]]?.question}</Text>
            </View>
        )
    }
    const renderOptions = () => {
        return (
            <View>
                {
                    allQuestions[orden[currentQuestionIndex]]?.options.map(option => (
                        <TouchableOpacity
                            onPress={() => validateAnswer(option)}
                            disabled={isOptionsDisabled}
                            key={option}
                            style={{
                                borderWidth: 3,
                                borderColor: option == correctOption
                                    ? COLORS.success
                                    : option == currentOptionSelected
                                        ? COLORS.error
                                        : COLORS.secondary + '40',
                                backgroundColor: option == correctOption
                                    ? COLORS.success + '20'
                                    : option == currentOptionSelected
                                        ? COLORS.error + '20'
                                        : COLORS.secondary + '20',
                                height: 60, borderRadius: 20,
                                flexDirection: 'row',
                                alignItems: 'center', justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                marginVertical: 10
                            }}
                        >
                            <Text style={{ fontSize: 20, color: (scheme === 'dark') ? 'white' : 'black' }}>{option}</Text>

                            {/* Show Check Or Cross Icon based on correct answer*/}
                            {
                                option == correctOption ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30 / 2,
                                        backgroundColor: COLORS.success,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <MaterialCommunityIcons name="check" style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }} />
                                    </View>
                                ) : option == currentOptionSelected ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30 / 2,
                                        backgroundColor: COLORS.error,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <MaterialCommunityIcons name="close" style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }} />
                                    </View>
                                ) : null
                            }

                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
    const renderNextButton = () => {
        if (showNextButton) {
            return (
                <TouchableOpacity
                    onPress={handleNext}
                    style={{
                        marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 20
                    }}>
                    <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}>Siguiente</Text>
                </TouchableOpacity>
            )
        } else {
            return null
        }
    }


    const [progress, setProgress] = useState(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, allQuestions.length],
        outputRange: ['0%', '100%']
    })

    const renderImage = () => {
        return (
            <View style={{
                marginBottom: 40
            }}>
                {/* Image */}

                <Image source={Images[orden[currentQuestionIndex]]}
                    style={{
                        width: undefined,
                        height: 150,
                        resizeMode: 'contain'

                    }} />
            </View>
        )
    }
    const renderProgressBar = () => {
        return (
            <View style={{
                width: '100%',
                height: 20,
                borderRadius: 20,
                backgroundColor: '#00000020',

            }}>
                <Animated.View style={[{
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: COLORS.accent
                }, {
                    width: progressAnim
                }]}>

                </Animated.View>

            </View>
        )
    }
    const scheme = useColorScheme();



    const readText = (text: string) => {
        Tts.speak(text);
        Tts.stop;
    }

    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <StatusBar
                backgroundColor={(scheme === 'dark') ? '#121212' : '#f6f6f6'}
                barStyle={(scheme === 'dark') ? 'light-content' : 'dark-content'}
            />
            <View style={{
                flex: 1,
                paddingHorizontal: 16,
                position: 'relative'
            }}>


                {/* ProgressBar */}
                {renderProgressBar()}

                {/* Question */}
                {renderQuestion()}

                <View style={{ zIndex: 2, alignItems: 'flex-end' }}>
                    <IconButton
                        icon="volume-high"
                        size={20}
                        onPress={() => readText(allQuestions[orden[currentQuestionIndex]].question)}
                    />
                </View>

                {/* Image */}
                {renderImage()}

                {/* Options */}
                {renderOptions()}

                {/* Next Button */}
                {renderNextButton()}

                {/* Score Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showScoreModal}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: COLORS.primary,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            backgroundColor: COLORS.white,
                            width: '90%',
                            borderRadius: 20,
                            padding: 20,
                            alignItems: 'center'
                        }}>
                            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{score > (allQuestions.length / 2) ? 'Felicidades!' : 'Oops!'}</Text>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                marginVertical: 20
                            }}>
                                <Text style={{
                                    fontSize: 30,
                                    color: score > (allQuestions.length / 2) ? COLORS.success : COLORS.error
                                }}>{score}</Text>
                                <Text style={{
                                    fontSize: 20, color: COLORS.black
                                }}>/ {allQuestions.length}</Text>
                            </View>
                            {/* Retry Quiz button */}
                            <TouchableOpacity
                                onPress={restartQuiz}
                                style={{
                                    backgroundColor: COLORS.accent,
                                    padding: 20, width: '100%', borderRadius: 20
                                }}>
                                <Text style={{
                                    textAlign: 'center', color: COLORS.white, fontSize: 20
                                }}>Reintentar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={ira}
                                style={{
                                    backgroundColor: COLORS.accent,
                                    padding: 20, width: '100%', borderRadius: 20, marginTop: 20
                                }}>
                                <Text style={{
                                    textAlign: 'center', color: COLORS.white, fontSize: 20
                                }}>Regresar al menu</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </Modal>

                

            </View>
        </SafeAreaView>
    )
}

export default Nivel4_2
