import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  @Input() task: any = {};
  @Output() saveEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();

  _id: string = null;
  description: string = '';
  type: string = 'MEDIUM';
  notes: '';

  constructor() {}

  ngOnInit() {
    this._id = this.task._id || null;
    this.description = this.task.description || '';
    this.type = this.task.type || 'MEDIUM';
    this.notes = this.task.notes ||'';
  }

  saveChanges(){
    this.saveEvent.emit({
      _id: this._id,
      description: this.description,
      type: this.type,
      notes: this.notes
    });
  }

  priorityChange(value: any){
    this.type = value;
  }

  delete(){
    this.deleteEvent.emit(this._id);
  }

}
