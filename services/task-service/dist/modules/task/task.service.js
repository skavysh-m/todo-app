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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const task_entity_1 = require("./task.entity");
const kafka_producer_1 = require("../kafka/kafka.producer");
let TaskService = class TaskService {
    constructor(taskModel, kafkaProducer) {
        this.taskModel = taskModel;
        this.kafkaProducer = kafkaProducer;
    }
    async create(createTaskDto) {
        const createdTask = new this.taskModel(createTaskDto);
        await createdTask.save();
        await this.kafkaProducer.emit('task-created', createdTask);
        return createdTask;
    }
    async getAll() {
        return this.taskModel.find().exec();
    }
    async getOne(id) {
        return this.taskModel.findById(id);
    }
    async update(id, updateTaskDto) {
        const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
        await this.kafkaProducer.emit('task-updated', updatedTask);
        return updatedTask;
    }
    async delete(id) {
        await this.taskModel.findByIdAndDelete(id);
        await this.kafkaProducer.emit('task-deleted', { id });
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(task_entity_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        kafka_producer_1.KafkaProducer])
], TaskService);
//# sourceMappingURL=task.service.js.map