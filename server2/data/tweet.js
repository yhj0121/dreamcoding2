import {  useVirtualId  } from '../db/database.js';
import * as userRepository from './auth.js';
import Mongoose from'mongoose';


const tweetSchema = new Mongoose.Schema({
  text: {type:String, required:true},
  userId: {type:String, required:true},
  name: {type:String, required:true},
  username: {type:String, required:true},
  url: String,
  
},
{timestamps:true});

useVirtualId(tweetSchema);

const Tweet = Mongoose.model('Tweet',tweetSchema);

export async function getAll() {
  return  Tweet.find().sort({ createAt: -1});
}

export async function getAllByUsername(username) {
  return Tweet.find({ username }).sort({createAt: -1});

}

export async function getById(id) {
  return Tweet.findById(id);
}

export async function create(text, userId) {
  return userRepository.findById(userId)
  .then((user) =>
    new Tweet({text,
      userId,
      name:user.name,
      username:user.username}).save()
  );

}

export async function update(id, text) {
  return Tweet.findByIdAndUpdate(id,{text}, {returnOriginal: false})
}
export async function remove(id) {
  return Tweet.findByIdAndDelete(id);
}

