import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { interval, map, Subject, takeUntil } from 'rxjs';


@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private stop$ = new Subject<void>();

  constructor(private readonly chatService: ChatService) { }


  handleConnection(client: Socket) {
    client.broadcast.emit("user-joined", {
      message: `${client.id} joined...`
    })
    this.startStreaming();

    // client.to("room").emit("")
  }
  handleDisconnect(client: Socket) {
    this.server.emit("user-left", {
      message: `${client.id} left...`
    })
  }
  private startStreaming() {
    interval(5000)
      .pipe(
        takeUntil(this.stop$), // Stop the interval when a client disconnects
        map(() => this.generateRandomStock())
      )
      .subscribe(stockData => {
        this.server.emit('stream', stockData);
      });
  }

  private generateRandomStock() {
    return {
      symbol: `STK${Math.floor(Math.random() * 1000)}`,
      price: (Math.random() * 1000).toFixed(2),
      timestamp: new Date(),
    };
  }

  @SubscribeMessage('send-message')
  create(@MessageBody() createChatDto: CreateChatDto) {
    this.server.emit('receive-message', createChatDto)

    return this.chatService.create(createChatDto);
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    // handleEvent(client: Socket, data: string): string {
    return this.chatService.findAll();
  }

  @SubscribeMessage('stream')
  streamStocks() {
    return {}
  }
}
