import {Global, Module} from '@nestjs/common';
import {KafkaProducer} from './kafka.producer';
import {ConfigModule, ConfigService} from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule.forRoot()], // Import ConfigModule for accessing environment variables
  providers: [
    KafkaProducer, // Register KafkaProducer as a provider
    {
      provide: 'KAFKA_BROKER',
      useFactory: (configService: ConfigService) => configService.get<string>('KAFKA_BROKER'),
      inject: [ConfigService],
    },
  ],
  exports: [KafkaProducer], // Export KafkaProducer so it can be injected elsewhere
})
export class KafkaModule {
}