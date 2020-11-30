import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Morph from '../components/Morph';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import defaultStyles from "../config/styles";
import colors from '../config/colors';

import BookLover from '../assets/bookLover.svg'

const BACKGROUND = colors.background;

export default function ExploreScreen() {
    return (
        <Screen style={[defaultStyles.flexColumnContainer, styles.container]}>
            <View style={[defaultStyles.flexRowContainer, styles.header]}>
                <Morph borderless radius={25} style={styles.actionButtons}>
                    <MaterialCommunityIcons
                        name="format-align-justify"
                        size={30}
                        color={colors.blue}
                    />
                </Morph>
                <AppText style={styles.title}>Bookshelf</AppText>
                <Morph borderless radius={25} style={styles.actionButtons}>
                    <MaterialCommunityIcons
                        name="basket"
                        size={30}
                        color={colors.blue}
                    />
                </Morph>
            </View>
            <View style={styles.bookLoverContainer}>
                <BookLover />
            </View>
            <View style={styles.indicatorContainer}>
                <AppText style={styles.indicator}>
                    Your Bookshelf is empty
                </AppText>
                <View style={{width: "80%"}}>
                    <AppText style={styles.indicatorExp}>
                        This is your bookshelf. You will be able to see you purchased books here.
                    </AppText>
                </View>
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
    bookLoverContainer: {
        height: "60%",
        width: "100%"
    },
    container: {
        alignItems: 'center',
        backgroundColor: BACKGROUND,
    },
    header: {
        alignItems: "center",
        justifyContent: "space-between", 
        padding: 20,
        width: "100%",
    },
    indicatorContainer: {
        alignItems: 'center',
        marginTop: "10%",
        width: "100%",
    },
    indicator: {
        color: colors.white,
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 20
    },
    indicatorExp: {
        color: colors.grey,
        textAlign: 'center',
    },
    neumorphism: {
        margin: 24,
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        color: "white"
    },
    title: {
        color: colors.white,
    },
})

