import React, { useState, useEffect } from "react";
import { Container, Grow, Grid, Paper, TextField, AppBar, Button } from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from 'material-ui-chip-input';
import Pagination from "../Pagination";
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from "react-redux";  //allows to dispatch an action
import { getposts, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();  //from where we are getting page info....
    const Navigate = useNavigate();
    const page = query.get('page') || 1;  // by default we should be in page 1...
    const searchQuery = query.get('search Query');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const searchPost = () => {
        if (search.trim() || tags) {
            console.log("search : " + search);
            console.log("tags : " + tags);
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));   //join(',') is used to convert : for example [europe,usa] -> 'europe,usa'...
            Navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            Navigate('/')
        }
    }


    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {    //key code 13 means enter key
            searchPost();
        }
    };

    const handleAdd = (tag) => setTags([...tags, tag]);
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid
                    className={classes.mainConatiner}
                    container
                    justifyContent="space-between"
                    alignItems="stretch"
                    spacing={3}
                    classes={classes.gridContainer}
                >
                    <Grid item xs={12} sm={6} md={8}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search Memories"
                                onKeyPress={handleKeyPress}
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary"> Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home