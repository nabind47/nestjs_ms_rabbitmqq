import { Controller, MessageEvent, Sse } from '@nestjs/common';

import { StreamingService } from './streaming.service';
import { Observable } from 'rxjs';

@Controller('streaming')
export class StreamingController {
  constructor(private readonly streamingService: StreamingService) { }

  @Sse("live-stocks")
  stocks(): Observable<MessageEvent> {
    return this.streamingService.streamStocks();
  }
}
