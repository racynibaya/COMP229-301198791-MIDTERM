import createError from 'http-errors';
import express from 'express';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import logger from 'morgan';

import mongoose from 'mongoose';

import indexRouter from '../routes/index.js';
import booksRouter from '../routes/books.js';

const app = new express();

import { MongoURI, Secret } from '../config/config.js';
import cookieParser from 'cookie-parser';

mongoose.connect(MongoURI);
const db = mongoose.connection;

db.on('open', () => console.log(`Connected to MongoDB at Localhost`));
db.on('error', () => console.error('Connection Error'));

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../client')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use('/', indexRouter);
app.use('/', booksRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

export default app;
