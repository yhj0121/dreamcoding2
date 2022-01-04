import socket from 'socket.io-client';

export default class Socket {
  constructor(baseURL,getAccessToken)
  {
    this.io = socket(baseURL, {
      auth: (cb) => cb({token: getAccessToken()}),
      //getAccessToken으로 토근 받기
      //auth를 통해 
    });

    this.io.on('connect error',(err) =>{
      console.log('socket error',err.message);
    });
  }

  onSync(event,callback)
  {
    if (!this.io.connected){
      this.io.connect();
      //연결되어도 연결할러는거 막기
    }
    this.io.on(event, (message)=> callback(message));
    return () => this.io.off(event);
    //io에 대해 해당 이벤트를 끌수 있게함
  }
}