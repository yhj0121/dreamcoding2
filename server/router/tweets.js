import express from 'express';
import * as tweetController from '../controller/tweet.js'
import 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middlewares/validator.js';

const router = express.Router();
const validaterTweet = [body('text').trim().isLength({min:3}).withMessage("show me the money"),validate];
// GET /tweets
// GET /tweets?username=:username
router.get('/', tweetController.getTweets);

// GET /tweets/:id
router.get('/:id', tweetController.getByid);

// POST /tweeets
router.post('/',validaterTweet,tweetController.postTweet,);

// PUT /tweets/:id
router.put('/:id',validaterTweet,tweetController.updated );

// DELETE /tweets/:id
router.delete('/:id',tweetController.remove );

export default router;
