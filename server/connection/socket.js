import { Server } from 'socket.io';
import jwt from'jsonwebtoken';
import { config } from '../config.js';


class Socket {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: '*',
      },
    });

    this.io.use((socket,next) =>{
      const token = socket.handshake.auth.token;
      if(!token) {
          return next(new Error('Authentication error'));
            //로그인한 상대에게만 알려주고 싶음
      }
      jwt.verify(token, config.jwt.secretKey, (error,decoded)=>{
        if(error) {
          return next(new Error('Authentication error'));
          //해독 못한다면
        }
        next();
      });

    })
    this.io.on('connection', (socket) => {
        console.log('socket client connection')
    });
  }


}

let socket;

export function initSocket(server)
{
  if(!socket) {
    socket = new Socket(server);
  }
}
export function getSocketIo()
{
  if(!socket)
  {
    throw new Error('please call init first')
  }
  return socket.io;
}