import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { ToDo, ToDoStatus } from 'src/app/todo/interfaces/todo.interface';
import { TodoService } from 'src/app/todo/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  private toDoService = inject(TodoService);

  @Input() status: ToDoStatus = 'pending';
  @Input() todoList?: ToDo[] = [];
  @Output() updateToDo = new EventEmitter<any>();

  private todoService = inject(TodoService);

  public errorMessage: string = '';

  get toDos(): ToDo[] {
    console.log(this.todoService.todoList);
    return this.todoService.todoList?.filter(
      (todo) => todo.status === this.status
    )!;
  }

  ngOnInit(): void {}

  onDropEntry(event: DragEvent): void {
    console.log('soltado', event);
    const id = event.dataTransfer?.getData('todo');
    this.todoService.updateWithToFinish(parseInt(id!)).subscribe({
      next: (res) => {
        this.todoService.getToDos().subscribe({
          next: (res) => {
            this.todoService.setTodosList = res.data;
          },
          error: (err) => {},
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }
}
