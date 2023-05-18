import express from 'express';
import { getPostsBySearch, getPost, createPost, getposts, updatePost, deletePost, likePost } from '../controllers/posts.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/', getposts);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost)                       //patch is used for updating existed documents...
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);    // we use patch because like count is something updating ...

export default router;

// all this routes are begin with posts...