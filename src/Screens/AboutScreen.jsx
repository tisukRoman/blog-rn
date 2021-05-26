import React from 'react'
import { View, StyleSheet, Text, ScrollView, Image, Platform, Button } from 'react-native'
import { COLORS } from '../styles/colors'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { HeaderIcon } from '../../src/Components/HeaderIcon'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, toggleBooked } from '../redux/reducers/postReducer'



export const AboutScreen = ({ navigation, route }) => {

    const { postId, date } = route.params;
    (() => {
        navigation.setOptions({
            title: 'Создано - ' + new Date(date).toLocaleDateString(),
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderIcon}>
                    <Item
                        title='save'
                        iconName={route.params.isBooked ? 'star' : 'star-outline'}
                        onPress={route.params.bookHandler}
                        color={COLORS.WHITE}
                    />
                </HeaderButtons>
            )
        })
    })();

    const dispatch = useDispatch();
    const post = useSelector(state => state.postReducer.allPosts.find(p => p.id === postId));
    const isBooked = useSelector(state => state.postReducer.bookedPosts.some(b => b.id === postId));

    React.useEffect(() => {
        navigation.setParams({ bookHandler })
    }, [bookHandler]);

    const bookHandler = React.useCallback(() => {
        dispatch(toggleBooked(post))
    }, [dispatch, post]);

    const deleteItem = React.useCallback(() => {
        navigation.navigate('MainScreen');
        dispatch(deletePost(postId));
    }, [dispatch]);

    React.useEffect(() => {
        navigation.setParams({ isBooked })
    }, [isBooked]);


    if(!post){
        return null
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <Image style={styles.image} source={{ uri: post.img }} />
            </View>
            <View style={styles.textW}>
                <Text style={styles.titleText}>{post.title}</Text>
                <Text style={styles.text}>{post.text}</Text>
            </View>
            <View style={styles.button}>
                <Button title='удалить' color={COLORS.PURPLE} onPress={deleteItem}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.DARK,
    },
    image: {
        width: '100%',
        height: Platform.OS === 'web' ? 500 : 300
    },
    textW: {
        padding: 10,
        paddingHorizontal: Platform.OS === 'web' ? 50 : 30
    },
    text: {
        color: COLORS.WHITE,
    },
    titleText: {
        color: COLORS.WHITE,
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 20
    },
    button:{
        marginVertical: 30,
        padding: 30,
    }
});
