import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
export declare class KafkaProducer implements OnModuleInit, OnModuleDestroy {
    private readonly configService;
    private producer;
    private kafka;
    private readonly logger;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    private connectProducer;
    emit(topic: string, message: any): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
