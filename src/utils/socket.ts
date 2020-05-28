import io from 'socket.io-client';

export interface Messages {
  message: string;
  author: string;
  date: Date;
  from: 'other' | 'me' | 'info';
}

interface SocketStatus {
  messages: Messages[];
  connected: boolean;
  username: string;
}

const SERVER_HOST = process.env.SOCKET_SERVER_HOST || 'http://localhost:3003';

export default class SocketManager {
  private static instance: SocketManager | null = null;

  private socket: SocketIOClient.Socket;
  private listeners: Array<() => void> = [];
  private status: SocketStatus = {
    messages: [],
    connected: false,
    username: ''
  };

  constructor() {
    this.socket = io(SERVER_HOST);

    this.socket.on('disconnect', () => {
      this.status.connected = false;
      this.propagate();
    });

    this.socket.on('ready', (json: string) => {
      const data = JSON.parse(json);
      this.status.username = data.username;
      this.status.connected = true;
      this.propagate();
    });

    this.socket.on('join', (json: string) => {
      const data = JSON.parse(json);
      this.status.messages.push({
        message: '$t[justConnected]',
        author: data.username,
        date: new Date(data.date),
        from: 'info'
      });
      this.propagate();
    });

    this.socket.on('leave', (json: string) => {
      const data = JSON.parse(json);
      this.status.messages.push({
        message: '$t[hasLeft]',
        author: data.username,
        date: new Date(data.date),
        from: 'info'
      });
      this.propagate();
    });

    this.socket.on('username', (json: string) => {
      const data = JSON.parse(json);
      this.status.messages.push({
        message: '$t[aka]' + ' ' + data.new,
        author: data.previous,
        date: new Date(data.date),
        from: 'info'
      });
      this.propagate();
    });

    this.socket.on('write', (json: string) => {
      const data = JSON.parse(json);
      this.status.messages.push({
        message: data.message,
        author: data.username,
        date: new Date(data.date),
        from: 'other'
      });
      this.propagate();
    });
  }

  public static getInstance() {
    if (SocketManager.instance === null) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  public init(username: string) {
    this.send('init', username);
  }

  public send(type: string, data: string) {
    if (type === 'write') {
      this.status.messages.push({
        message: data,
        author: this.status.username,
        date: new Date(),
        from: 'me'
      });
      this.propagate();
    } else if (type === 'username') {
      this.status.messages.push({
        message: '$t[yaka]' + ' ' + data,
        author: this.status.username,
        date: new Date(),
        from: 'info'
      });
      this.status.username = data;
      this.propagate();
    }
    this.socket.emit(type, data);
  }

  public getMessages() {
    return this.status.messages;
  }

  public isConnected() {
    return this.status.connected;
  }

  public getUsername() {
    return this.status.username;
  }

  private propagate() {
    this.listeners.forEach((listener) => listener());
  }

  public addListener(listener: () => void) {
    this.listeners.push(listener);
  }

  public removeListener(listener: () => void) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }
}
