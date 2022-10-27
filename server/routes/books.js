import { Router } from 'express';

import {
  displayAddPage,
  displayBookList,
  displayEditPage,
  processAddPage,
  processDelete,
  processEditPage,
} from '../controllers/books.js';

const router = Router();

router.get('/books/list', displayBookList);

router.get('/books/add', displayAddPage);

router.post('/books/add', processAddPage);

router.get('/books/edit/:id', displayEditPage);

router.post('/books/edit/:id', processEditPage);

router.get('/books/delete/:id', processDelete);

export default router;
