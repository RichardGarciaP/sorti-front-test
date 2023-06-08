import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ToDo } from '../../interfaces/todo.interface';
import { Subject, interval, switchMap, takeUntil } from 'rxjs';
import { CoreService } from 'src/app/shared/services/core.service';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit, OnDestroy{
  private toDoService = inject(TodoService);
  private coreServices = inject(CoreService);
  private destroy$ = new Subject<void>();
  private cdr = inject(ChangeDetectorRef);

  todoList: ToDo[] = []


  ngOnInit(): void {
    this.toDoService.getToDos().subscribe({
      next: (res) => {
        this.todoList = res.data;  
      },
      error: (err) => {this.coreServices.openSnackBar(err?.error?.message)}
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
