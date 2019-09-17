import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  @Output() newTask = new EventEmitter<string>();

  task : string = ''
  constructor() { }

  ngOnInit() {
  }

  handlerNewTask(){
    if(this.task === '') return;

    this.newTask.emit(this.task);
    this.task = '';
  }

}
