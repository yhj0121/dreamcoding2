import { config } from '../config.js'
import mongoose from 'mongoose';

const uri = config.db.host;
export async function connectDb()
{
return mongoose.connect(config.db.host)
}



export function useVirtualId(schema)
{
  schema.virtual('id').get(function(){
    return this._id.toString();
  })
  schema.set('toJSON',{virtuals: true});
  schema.set('toObject',{virtuals:true});
}