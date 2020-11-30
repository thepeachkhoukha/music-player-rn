import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import color from 'color';

const RADIUS = 10;
const BACKGROUND = "#383e46";
var Color = require('color');

export default function Morph({radius, style, revert, borderless, pressed, children}) {
    const topStyles = StyleSheet.flatten([
        styles.morphTop,
        revert && {
          shadowColor: color(BACKGROUND)
            .darken(0.3)
            .alpha(0.5),
        },
        { borderRadius: radius || RADIUS },
      ]);
    
      const bottomStyles = StyleSheet.flatten([
        styles.morphBottom,
        revert && {
          shadowColor: color(BACKGROUND)
          .lighten(0.5)
          .alpha(0.5),
        },
        { borderRadius: radius || RADIUS },
        
      ]);
    
      const morphStyles = StyleSheet.flatten([
        styles.morph,
        borderless && { borderWidth: 0 },
        { borderRadius: radius || RADIUS },
        style
      ]);
    return (
        <View style={[topStyles]}>
            <View style={bottomStyles}>
                <View style={morphStyles}>
                   {children}
                </View>
            </View>
      </View>
    )
}

const styles = StyleSheet.create({
    neumorphism: {
        margin: 24,
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        color: "white"
      },
      morph: {
        borderRadius: RADIUS,
        borderWidth: 1,
        backgroundColor: BACKGROUND,
        borderColor: Color(BACKGROUND).lighten(0.1).alpha(0.8).hex(),
      },
      morphTop: {
        borderRadius: RADIUS,
        shadowOffset: {
          width: -4,
          height: -4,
        },
        shadowOpacity: 1,
        shadowRadius: 3,
        shadowColor: color(BACKGROUND)
            .lighten(0.5)
            .alpha(0.5).hex(),
      },
      morphBottom: {
        borderRadius: RADIUS,
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        shadowColor: color(BACKGROUND)
            .darken(0.4)
            .alpha(0.5).hex(),
      }
})
