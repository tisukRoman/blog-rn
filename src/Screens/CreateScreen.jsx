import React from 'react'
import { View, StyleSheet, ScrollView, TextInput, Image, Button, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { PhotoPicker } from '../Components/PhotoPicker';
import { COLORS } from '../styles/colors'
import { addPost } from '../redux/reducers/postReducer'
import { useDispatch } from 'react-redux'

export const CreateScreen = ({ navigation }) => {

    const [titleText, setTitleText] = React.useState('');
    const [postText, setPostText] = React.useState('');
    const imgRef = React.useRef();
    const dispatch = useDispatch();

    const saveHandler = () => {
        const post = {
            title: titleText,
            img: imgRef.current,
            text: postText,
            date: new Date().toJSON(),
            booked: false
        }
        dispatch(addPost(post));
        navigation.navigate('MainScreen');
    }

    const imgHandler = uri => {
        imgRef.current = uri;
    }

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <TextInput onChangeText={setTitleText} style={styles.textInput} placeholder='Заголовок...' value={titleText} />
                    <TextInput onChangeText={setPostText} style={styles.textArea} placeholder='Введите текст поста...' value={postText} multiline />
                    <View style={styles.image}>
                        <PhotoPicker imgHandler={imgHandler} />
                    </View>
                    <View style={styles.buttonW}>
                        <Button
                            title='Создать Пост'
                            color={COLORS.PURPLE}
                            onPress={saveHandler}
                            disabled={!titleText || !postText} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    textArea: {
        padding: 10,
        width: '100%',
        height: 300,
        borderColor: COLORS.DARK,
        marginVertical: 10,
        borderWidth: 2
    },
    textInput: {
        padding: 10,
        width: '100%',
        height: 50,
        borderColor: COLORS.DARK,
        marginVertical: 10,
        borderWidth: 2
    },
    image: {
        height: 300,
        width: '100%',
        marginVertical: 10,
        borderColor: COLORS.DARK,
        borderWidth: 2,
        overflow: 'hidden'
    },
    buttonW: {
        marginVertical: 30,
        marginBottom: 100,
        overflow: 'hidden'
    }
});