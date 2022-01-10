import { useVirtualId } from '../db/database.js';
import Mongoose from'mongoose';


const userSchema = new Mongoose.Schema({
  username: {type:String, required:true},
  name: {type:String, required:true},
  email: {type:String, required:true},
  password: {type:String, required:true},
  url: String,
})
//_id -> id
//user에서만 사용됨

useVirtualId(userSchema);
const User = Mongoose.model('User', userSchema);

export async function findByUsername(username) {
  return User.findOne({username})
 
}
export async function findById(id) {
    return User.findById(id);

    
}


export async function createUser(user) {

  return new User(user).save().then((data) => data.id);
}
