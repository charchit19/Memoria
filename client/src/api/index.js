import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' }) // url pointing to our backend;  'https://memoria-backend.onrender.com' [backend url]

API.interceptors.request.use((req) => {       // a function which is going to happen on each one of our request {our middleware does not work without this} 
    // this is going to happen before all of our requests.
    // we need this to send our token back to our backend so that backend can verify that we are actually logged in.
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

// console.log("fetch" + fetchPostsBySearch);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
// export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery = ${searchQuery.search || 'none'} &tags=${searchQuery.tags}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const creatPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);