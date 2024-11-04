import { Injectable, MessageEvent } from '@nestjs/common';
import { interval, map, Observable } from 'rxjs';

@Injectable()
export class StreamingService {
  private generateRandomStock() {
    return {
      symbol: `STK${Math.floor(Math.random() * 1000)}`,
      price: (Math.random() * 1000).toFixed(2),
      timestamp: new Date(),
    };
  }

  streamStocks(): Observable<MessageEvent> {
    return interval(1000).pipe(map((_) => ({ data: this.generateRandomStock() })));
  }
}
