import { DELETE, UPDATE, LIKE, FETCH_ALL, FETCH_POST, CREATE, FETCH_BY_SEARCH, START_LOADING, END_LOADING } from "../constants/actionsTypes";

export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {

        case START_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case END_LOADING:
            return {
                ...state,
                isLoading: false,
            }
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberofPages,
            };
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload }; //action.payload is our actual posts..
        case FETCH_POST:
            return { ...state, post: action.payload }; //action.payload is our actual posts..
        case DELETE:
            // we will return filter out the deleted one...;        
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) }
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) }; //action.payload is the updated post
        case LIKE:        //update and like works same ....
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) }; //action.payload is the updated post
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };

        default:
            return state;
    }
}