import * as tweetRepository from '../data/data.js'
import { body, param, validationResult } from 'express-validator';

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array()[0].msg });
};

export async function getTweets(req,res)
{
    const username = req.query.username;
    const data = await (username
      ? tweetRepository.getAllTweetByUsername(username)
      : tweetRepository.getAllTweets());
    res.status(200).json(data);
  
}

export async function getByid(req,res,next)
{
 
    const id = req.params.id;
    const tweet = await tweetRepository.getTweetById(id);
    if (tweet) {
      res.status(200).json(tweet);
    } else {
      res.status(404).json({ message: `Tweet id(${id}) not found` });
    }
  
}

export async function postTweet(req,res,next)
{
 
    const { text, name, username } = req.body;
   const tweet = await tweetRepository.createTweet(text,name,username);
    res.status(201).json(tweet);
  
}

export async function updated(req,res,next)
{

    const id = req.params.id;
    const text = req.body.text;
    const tweet = await tweetRepository.updateTweet(text,id);
    if (tweet) {
      res.status(200).json(tweet);
    } else {
      res.status(404).json({ message: `Tweet id(${id}) not found` });
    }
  
}

export async function remove(req,res,next)
{
  
    const id = req.params.id;
    await tweetRepository.deleteTweet(id);
    res.sendStatus(204);
  
}