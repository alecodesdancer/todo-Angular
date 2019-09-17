import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  @Input() task: any;
  @Input() key: string;
  @Output() doneEvent = new EventEmitter<any>();
  @Output() editEvent = new EventEmitter<any>();
  @Output() startEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  handleDone(){
    this.doneEvent.emit(this.task);
  }

  handleEdit(){
    this.editEvent.emit(this.task);
  }

  handleStart(){
    this.startEvent.emit(this.task);
  }

}
