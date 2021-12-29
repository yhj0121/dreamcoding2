import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import * as tweetController from '../controller/tweet.js';
import { isAuth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validator.js';

const router = express.Router();

const validateTweet = [
  body('text')
    .trim()
    .isLength({ min: 3 })
    .withMessage('text should be at least 3 characters'),
  validate,
];

// GET /tweet
// GET /tweets?username=:username
router.get('/',isAuth, tweetController.getTweets);

// GET /tweets/:id
router.get('/:id',isAuth, tweetController.getTweet);

// POST /tweeets
router.post('/', isAuth, validateTweet, tweetController.createTweet);

// PUT /tweets/:id
router.put('/:id',  isAuth,validateTweet, tweetController.updateTweet);

// DELETE /tweets/:id
router.delete('/:id',  tweetController.deleteTweet);

export default router;
