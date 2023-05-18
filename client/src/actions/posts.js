import { CREATE, FETCH_BY_SEARCH, FETCH_POST, FETCH_ALL, UPDATE, DELETE, START_LOADING, END_LOADING } from '../constants/actionsTypes';
import * as api from '../api'; //* means import everthing...

//Actions Creators [functions that returns function ] //payload is the data where we store posts..

export const getPost = (id) => async (dispatch) => {
    try { //in try we are going to fetch all the data...
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);
        console.log(data);
        dispatch({ type: FETCH_POST, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);

    }
}

export const getposts = (page) => async (dispatch) => {
    try { //in try we are going to fetch all the data...
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);
        console.log(data);
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);

    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        console.log(searchQuery);
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING });
        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
}

export const creatPost = (post, Navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.creatPost(post);
        Navigate(`/posts/${data._id}`);
        dispatch({ type: CREATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.updatePost(id, post);           // returning updated memory...
        dispatch({ type: UPDATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);           // returning updated memory...
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}