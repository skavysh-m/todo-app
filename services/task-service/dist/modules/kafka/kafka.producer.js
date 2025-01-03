"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var KafkaProducer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaProducer = void 0;
const common_1 = require("@nestjs/common");
const kafkajs_1 = require("kafkajs");
const config_1 = require("@nestjs/config");
let KafkaProducer = KafkaProducer_1 = class KafkaProducer {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(KafkaProducer_1.name);
        const brokers = [this.configService.get('KAFKA_BROKER') || 'localhost:9092'];
        const clientId = this.configService.get('CLIENT_ID') || 'default-client';
        this.kafka = new kafkajs_1.Kafka({
            clientId,
            brokers,
        });
        this.producer = this.kafka.producer();
    }
    async onModuleInit() {
        await this.connectProducer();
    }
    async connectProducer() {
        try {
            await this.producer.connect();
            this.logger.log('Kafka producer connected');
        }
        catch (error) {
            this.logger.error('Error connecting Kafka producer', error);
        }
    }
    async emit(topic, message) {
        try {
            await this.producer.send({
                topic,
                messages: [{ value: JSON.stringify(message) }],
            });
            this.logger.log(`Message sent to topic ${topic}`);
        }
        catch (error) {
            this.logger.error('Error sending message to Kafka', error);
        }
    }
    async onModuleDestroy() {
        try {
            await this.producer.disconnect();
            this.logger.log('Kafka producer disconnected');
        }
        catch (error) {
            this.logger.error('Error disconnecting Kafka producer', error);
        }
    }
};
exports.KafkaProducer = KafkaProducer;
exports.KafkaProducer = KafkaProducer = KafkaProducer_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], KafkaProducer);
//# sourceMappingURL=kafka.producer.js.map