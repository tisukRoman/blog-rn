import React from 'react'
import { View, StyleSheet, FlatList, Platform, Text, ActivityIndicator} from 'react-native'
import { COLORS } from '../styles/colors'
import { Post } from '../Components/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '../redux/reducers/postReducer'


export const MainScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const allPosts = useSelector(state => state.postReducer.allPosts);
    const loading = useSelector(state => state.postReducer.loading);

    React.useEffect(() => {
        dispatch(getData())
    }, [dispatch])

    if(loading){
        return <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.WHITE}/>
    </View>
    }

    if(!allPosts.length){
        return  <View style={styles.container}>
            <Text style={styles.text}>Постов пока нет</Text>
        </View>
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={allPosts}
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
        padding: Platform.OS === 'web' ? 0 : 20,
        paddingHorizontal: Platform.OS === 'web' ? 100 : 0,
    },
    text: {
        color: COLORS.WHITE,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'sans-serif'
    }
});