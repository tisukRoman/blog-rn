import React from 'react'
import { View, StyleSheet, FlatList, Platform, Text} from 'react-native'
import { COLORS } from '../styles/colors'
import { Post } from '../Components/Post'
import { useSelector } from 'react-redux'


export const SavedScreen = ({ navigation }) => {

    const bookedPosts = useSelector(state => state.postReducer.bookedPosts);

    if(!bookedPosts.length){
        return  <View style={styles.container}>
            <Text style={styles.text}>Сохранённых постов нет</Text>
        </View>
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={bookedPosts}
                keyExtractor={post => post.id.toString()}
                renderItem={({ item }) => (
                    <Post
                        img={item.img}
                        date={item.date}
                        postId={item.id}
                        navigation={navigation}
                        title={item.title}
                    />)}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.DARK,
        justifyContent: 'center',
        textAlign: 'center',
        padding: Platform.OS ==='web'? 0 : 20,
        paddingHorizontal:  Platform.OS ==='web'? 100 : 0,
    },
    text: {
        color: COLORS.WHITE,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'sans-serif',
        lineHeight: 30
    }
});