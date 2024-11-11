import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import {  TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Logger } from '@nestjs/common';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');
    constructor(private tasksService: TasksService) {}

     


    @Get()
     GetTasks(@Query() filterDto: GetTasksFilterDto,@GetUser() user: User): Promise<Task[]> {
      this.logger.verbose(`user "${user.username}" retriving all tasks`);
        return this.tasksService.getTasks(filterDto,user);
     }

     @Post()
     createTask(@Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,): Promise<Task> {
     
         return this.tasksService.createTask(createTaskDto,user);
     }
     

     @Get('/:id')
     async getTaskById(@Param('id') id: string, user: User): Promise<Task> {
         return this.tasksService.getTaskById(id,user);
     }



     @Delete('/:id')
  deleteTask(@Param('id') id: string, user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}



