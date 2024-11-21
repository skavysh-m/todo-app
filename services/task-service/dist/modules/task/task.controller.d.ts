import { TaskService } from "./task.service";
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(createTaskDto: any): Promise<import("./task.entity").Task>;
    getAll(): Promise<import("./task.entity").Task[]>;
    getOne(id: string): Promise<import("./task.entity").Task>;
    update(id: string, updateTaskDto: any): Promise<import("./task.entity").Task>;
    delete(id: string): Promise<void>;
}
