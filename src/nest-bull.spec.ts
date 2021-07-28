import { BullModule, getQueueToken } from "@nestjs/bull";
import { Test, TestingModule } from "@nestjs/testing";
import { Queue } from "bull";

describe('InboundEventService', () => {
  let moduleFixture: TestingModule;
  let queue: Queue;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [
        BullModule.forRoot({
            // This fails.
            redis: 'redis://@foo:6379'
            // This works.
            //redis: { host: 'foo' }
        }),
        BullModule.registerQueue({
          name: 'testQueue',
        }),
      ],
      providers: [],
    }).compile();

    queue = moduleFixture.get<Queue>(getQueueToken('testQueue'));
  });

  it('should use the right redis host for queue', () => {
    expect(queue.client.options.host).toBe('foo');
  });
});
