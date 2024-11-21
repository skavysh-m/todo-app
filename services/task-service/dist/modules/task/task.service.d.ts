import { Model } from "mongoose";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { KafkaProducer } from "../kafka/kafka.producer";
export declare class TaskService {
    private readonly taskModel;
    private readonly kafkaProducer;
    constructor(taskModel: Model<Task>, kafkaProducer: KafkaProducer);
    create(createTaskDto: CreateTaskDto): Promise<Task>;
    getAll(): Promise<Task[]>;
    getOne(id: string): Promise<Task>;
    update(id: string, updateTaskDto: CreateTaskDto): Promise<Task>;
    delete(id: string): Promise<void>;
}
