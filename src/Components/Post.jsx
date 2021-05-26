import React from 'react'
import { COLORS } from '../styles/colors'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Platform } from 'react-native';

export const Post = ({ title, img, date, postId, navigation }) => {

    const openPostHandle = post => {
        navigation.navigate('About', { postId, date}); // Open AboutScreen
    }

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={openPostHandle}>
            <View style={{ marginVertical: 10 }}>
                <ImageBackground source={{ uri: img }} style={styles.image}>
                    <View style={styles.date}>
                        <Text style={{ textAlign: 'center' }}>{new Date(date).toLocaleString()}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.postText}>
                    <Text style={{ marginBottom: 10, textAlign: 'center', color: COLORS.DARK }}>{title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: Platform.OS ==='web'? 500 : 250
    },
    date: {
        width: '100%',
        backgroundColor: COLORS.WHITE,
        opacity: 0.7,
        padding: 5
    },
    postText: {
        backgroundColor: COLORS.WHITE,
        padding: 10,
    }
});