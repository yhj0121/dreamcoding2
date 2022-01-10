import dotenv from'dotenv';
dotenv.config();

function required(key, defaultValue = undefined)
{
  const value = process.env[key] || defaultValue;
  if(value == null)
  {
    throw new Error(`key ${key} is undifined`);
  }
  return value;
}

export const config = {
  jwt: {
    secretKey: required('JWT_SECRET'),
    expireInSec: parseInt(required('JWT_EXPIRES',86400)),

  },
  bcrypt: {
    saltRounds:parseInt(required('BCRYPT_SALT_ROUNDS',12)),
  },
  host: {
    port:parseInt(required('HOST_PORT',8080)),
  },
  db: {
    host: required('DB_HOST'),


  },
 
}