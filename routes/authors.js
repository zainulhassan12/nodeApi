import express from 'express';
import {
    createAuthor,
    getAuthors,
    getAuthor,
    createAuthorEmbeded,
    listAuthorEmbeded,
    createAuthorListEmbeded,
    updateAuthorEmbeded,
    deleteAuthorEmbeded,
    addAuthorListEmbeded,
    removeAuthorListEmbeded
} from '../contollers/authors.js';

const router = express.Router();

router.get('/', getAuthors);
router.get('/:id', getAuthor)
router.post('/', createAuthor)
router.post('/embed', createAuthorEmbeded) //Embedding document approach
router.get('/embed/withauthor', listAuthorEmbeded)
router.put('/embed/withauthor/:id', updateAuthorEmbeded)
router.delete('/embed/withauthor/:id', deleteAuthorEmbeded)

router.post('/embed/list', createAuthorListEmbeded) //Embedding document list approach 
router.put('/embed/list/:id', addAuthorListEmbeded)
router.delete('/embed/list/:id/:ida', removeAuthorListEmbeded)

export default router;