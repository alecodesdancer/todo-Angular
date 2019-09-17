import { Component, OnInit } from '@angular/core';
import { zip } from "rxjs";
import { TaskService } from "../../core/task.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  edit: boolean = false;
  taskEdit: any = {};
  todoTasks: any = [];
  inProcessTasks: any = [];
  doneTasks: any = [];


  constructor(public _taskService: TaskService) { }

  ngOnInit() {
    this.listAllTasks();
  }

  listAllTasks(){
    let promises = zip(this._taskService.listTask('TODO'), this._taskService.listTask('INPROCESS'), this._taskService.listTask('DONE'));
    promises.subscribe(  ([todo, inprocess, done])=>  {
      this.todoTasks = todo;
      this.inProcessTasks= inprocess;
      this.doneTasks = done;
    }) 
  }

  handleNewTask(event : string){
    this._taskService.createTask({description: event}).subscribe(json => {
      this.listAllTasks();
    }, error => console.error(error));
  }

  handleDone(task: any){
    this._taskService.updateTask(task._id, {status: 'DONE'}).subscribe(json => {
      this.listAllTasks();
    }, error => console.error(error));
  }

  handleStart(task: any){
    this._taskService.updateTask(task._id, {status: 'INPROCESS'}).subscribe(json=>{
      this.listAllTasks();
    }, error => console.error(error));
  }

  handleEdit(task: any){
    this.edit = false;
    setTimeout( ()=> {
      this.edit = true;
      this.taskEdit = task;
    })
  }

  handleSaveChanges(event: any){
    this._taskService.updateTask(event._id, event).subscribe(json => {
      this.edit = false;
      this.listAllTasks();
    },error => console.error(error));
  }

  handleDelete(id: string){
    this._taskService.deleteTask(id).subscribe(json => {
      this.edit = false;
      this.listAllTasks();
    },error => console.error(error));
  }


}
