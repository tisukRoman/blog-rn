import React from 'react'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { Button, View, Image, Alert, StyleSheet } from 'react-native'
import { COLORS } from '../styles/colors';

async function askforPerm() {
    const { status } = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL
    );
    if (status !== 'granted') {
        Alert.alert('Ошибка', 'Вы не дали разрешения на использование камеры');
        return false;
    }
    return true;
}

export const PhotoPicker = ({imgHandler}) => {

    const [image, setImage] = React.useState(null)

    const TakePhoto = async () => {
        const hasPerm = await askforPerm();
        if (!hasPerm) return;
        const img = await ImagePicker.launchCameraAsync({
            quality: 0.7,
            allowsEditing: true,
            aspect: [16, 9]
        });
        setImage(img.uri);
        imgHandler(img.uri);
    }

    return (
        <View>
            <Button onPress={TakePhoto} title='Сделать фото' />
            {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 250,
    }
})