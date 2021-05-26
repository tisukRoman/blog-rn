import { DB } from "../../db"
import * as FileSystem from 'expo-file-system';


//----------------------\ CONSTANTS
const GET_DATA = 'GET_DATA'
const TOGGLE_BOOKED = 'TOGGLE_BOOKED'
const DELETE_POST = 'DELETE_POST'
const ADD_POST = 'ADD_POST'
//----------------------/


//-----------------------\ INITIAL STATE
const initialState = {
    allPosts: [],
    bookedPosts: [],
    loading: true
}
//-----------------------/


//------------------------\ REDUCER
export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA:
            return {
                ...state,
                allPosts: [...action.payload],
                bookedPosts: [...action.payload.filter(p => p.booked)],
                loading: false
            }
        case TOGGLE_BOOKED:
            const allPosts = state.allPosts.map(p => {
                if (p.id === action.id) p.booked = !p.booked;
                return p;
            });
            return {
                ...state,
                allPosts: [...allPosts],
                bookedPosts: [...allPosts.filter(p => p.booked)]
            }
        case DELETE_POST:
            return {
                ...state,
                allPosts: [...state.allPosts.filter(p => p.id !== action.id)],
                bookedPosts: [...state.bookedPosts.filter(p => p.id !== action.id)]
            }
        case ADD_POST:
            return {
                ...state,
                allPosts: [{ ...action.payload }, ...state.allPosts]
            }
        default:
            return state;
    }
}
//-------------------------/


//--------------------------\ THUNKS
export const getData = () => async (dispatch) => {
    const posts = await DB.getPosts();

    posts && dispatch({
        type: GET_DATA,
        payload: posts
    })
}
export const toggleBooked = (post) => async (dispatch) => {
    await DB.updatePost(post);
    dispatch({
        type: TOGGLE_BOOKED,
        id: post.id
    })
}
export const deletePost = (id) => async (dispatch) => {
    DB.deletePost(id)
    dispatch({
        type: DELETE_POST,
        id
    })
}
export const addPost = (post) => async (dispatch) => {
    const fileName = null;  
    const newPath = null;

    if(post.img){
        fileName = post.img.split('/').pop(); // image name
        newPath = FileSystem.documentDirectory + fileName; // location in fileSystem
        try {
            await FileSystem.moveAsync({
                to: newPath,
                from: post.img
            })
        } catch (e) {
            console.log(e)
        }
    }
    const payload = { ...post, img: newPath ? newPath : 'https://img.icons8.com/plasticine/2x/no-image.png' };
    const id = await DB.createPost(payload);
    payload.id = id;
    dispatch({
        type: ADD_POST,
        payload
    })
}
//---------------------------/