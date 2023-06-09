import { Test, TestingModule } from '@nestjs/testing';
import { ScService } from './sc.service';

describe('ScService', () => {
  let service: ScService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScService],
    }).compile();

    service = module.get<ScService>(ScService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get BytesCode ', async () => {
    const code = await service.getErc20Template({name:'abc',symbol:'abc',totalSupply:'1000',owner:'abc'});
    console.log('bytesCode : ',code);
  })
});
