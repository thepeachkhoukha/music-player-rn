import React, {useState, useEffect} from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Audio } from 'expo-av';

import Morph from '../components/Morph';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import defaultStyles from "../config/styles";
import colors from '../config/colors';


const BACKGROUND = colors.background;

export default function BookScreen({book, handlePreviousTrack, handleNextTrack, currentIndex = 0}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackInstance, setPlaybackInstance] = useState(null);

    const [volume, setVolume] = useState(1.0);
    const [isBuffering, setIsBuffering] = useState(false);

    async function componentDidMount() {
        try {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            shouldDuckAndroid: true,
            staysActiveInBackground: true,
            playThroughEarpieceAndroid: true
          });
          loadAudio();
        } catch (e) {
          console.log(e)
        }
      }

    useEffect(() => {
        componentDidMount()
    }, []);

    const loadAudio = async () => {
        console.log(book.uri);
        
        try {
          const playbackInstance = new Audio.Sound();
          const source = {
            uri: book.uri,
          };
    
          const status = {
            shouldPlay: isPlaying,
            volume,
          };
    
          playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
          await playbackInstance.loadAsync(source, status, false);
          setPlaybackInstance(playbackInstance);
        } catch (e) {
          console.log(e)
        }
    }

    const onPlaybackStatusUpdate = status => {
        setIsBuffering(status.isBuffering);
      }
    
    const handlePlayPause = async () => {
        console.log('handlePlayPause');
        isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync();
        setIsPlaying(!isPlaying);
    };
    
    const handleAudioPreviousTrack = async () => {
        if(playbackInstance) {
          await playbackInstance.unloadAsync();
          await handlePreviousTrack();
          loadAudio();
        }
    }

    const handleAudioNextTrack = async () => {
        console.log('handleAudioNextTrack');
        if(playbackInstance) {
            console.log('boii')
          await playbackInstance.unloadAsync();
          await handleNextTrack();
        }
    }

    useEffect(() => {
        const reloadAudio = async () => {
            if(playbackInstance) {
                console.log('inside useEffect');
              loadAudio();
            }
        }
        reloadAudio();

    }, [book])

    const renderFileInfo = () => {
        return playbackInstance? (
          <View style={styles.bookDetailsContainer}>
            <AppText style={styles.bookWriter}>
              {book.author}
            </AppText>
            <View style={{width: "80%"}}>
                <AppText style={styles.bookTitle}>{book.title}</AppText>
            </View>
          </View>
        ) : null
    }

    return (
        <Screen style={[defaultStyles.flexColumnContainer, styles.container]}>
            <View style={[defaultStyles.flexRowContainer, styles.header]}>
                <TouchableOpacity onPress={() => {console.log('pressed')}}>
                    <Morph borderless radius={25} style={styles.actionButtons}>
                        <MaterialCommunityIcons
                            name="arrow-left"
                            size={30}
                            color={colors.blue}
                        />
                    </Morph>
                </TouchableOpacity>

                <AppText style={styles.title}>Enjoy</AppText>
                <TouchableOpacity>
                    <Morph borderless radius={25} style={styles.actionButtons}>
                        <MaterialCommunityIcons
                            name="basket"
                            size={30}
                            color={colors.blue}
                        />
                    </Morph>
                </TouchableOpacity>
            </View>
            <View style={[defaultStyles.flexColumnContainer, {marginTop: '15%'}]}>
                <Morph borderless>
                    <Image style={styles.bookImage} source={{uri: book.imageSource}}/>
                </Morph>
            </View>
            {renderFileInfo()}
            <View style={[defaultStyles.flexRowContainer, defaultStyles.flexCenter, 
                        {justifyContent: 'space-between', width: "80%", marginTop: 40}]}>
                <TouchableOpacity onPress={handleAudioPreviousTrack}>
                    <Morph borderless radius={40} style={styles.control}>
                        <MaterialCommunityIcons
                            name="chevron-left"
                            size={30}
                            color={colors.white}
                        />
                    </Morph>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePlayPause}>
                    {isPlaying ? (
                        <Morph borderless radius={40} style={styles.playControl}>
                            <MaterialCommunityIcons
                                name="pause"
                                size={30}
                                color={colors.white}
                            />
                        </Morph>
                            ) : (
                            <Morph borderless radius={40} style={styles.playControl}>
                                <MaterialCommunityIcons
                                    name="play"
                                    size={30}
                                    color={colors.white}
                                />
                            </Morph>
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {handleAudioNextTrack()}}>
                    <Morph borderless radius={30} style={styles.control}>
                        <MaterialCommunityIcons
                            name="chevron-right"
                            size={30}
                            color={colors.white}
                        />
                    </Morph>
                </TouchableOpacity>
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    actionButtons: {
        alignItems: 'center',
        height: 50, 
        justifyContent: 'center',
        width: 50, 
    },
    bookDetailsContainer: {
        alignItems: 'center',
        marginTop: 30,
        width: "100%",
    },
    bookImage: {
        height: 300,
        width: 300
    },
    bookTitle: {
        color: colors.white,
        fontSize: 26,
        fontWeight: '600',
        textAlign: 'center',
    },
    bookWriter: {
        color: colors.white,
        textAlign: 'center'
    },
    container: {
        alignItems: 'center',
        backgroundColor: BACKGROUND,
    },
    control: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        width: 60,
    },
    header: {
        alignItems: "center",
        justifyContent: "space-between", 
        padding: 20,
        width: "100%",
    },
    playControl: {
        alignItems: 'center',
        backgroundColor: colors.blue,
        justifyContent: 'center',
        height: 80,
        width: 80,
    },
    title: {
        color: colors.white,
    },
})
