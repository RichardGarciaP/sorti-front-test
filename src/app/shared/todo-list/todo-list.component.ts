import { Component, EventEmitter, Input, OnChanges, OnInit, Output, inject } from '@angular/core';
import { ToDo, ToDoStatus } from 'src/app/todo/interfaces/todo.interface';
import { TodoService } from 'src/app/todo/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  private toDoService = inject(TodoService);

  @Input() status:ToDoStatus = 'pending';
  @Input() todoList?: ToDo[] = [];
  @Output() updateToDo = new EventEmitter<any>();


  public toDos?: ToDo[] = []

  public errorMessage:string = '';


  ngOnInit(): void {
    this.toDos = this.todoList?.filter(todo => todo.status === this.status)
  }

}
