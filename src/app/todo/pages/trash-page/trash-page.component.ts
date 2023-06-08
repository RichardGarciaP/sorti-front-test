import { Component, OnInit, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { CoreService } from 'src/app/shared/services/core.service';
import { ToDo } from '../../interfaces/todo.interface';

@Component({
  selector: 'app-trash-page',
  templateUrl: './trash-page.component.html',
  styleUrls: ['./trash-page.component.scss']
})
export class TrashPageComponent implements OnInit {
  private toDoService = inject(TodoService);
  private coreServices = inject(CoreService);

  todoList: ToDo[] = []


  ngOnInit(): void {
    this.toDoService.getToDos().subscribe({
      next: (res) => {
        console.log(res.data)
        this.todoList = res.data.filter(todo => todo.status === 'deleted');  
      },
      error: (err) => {this.coreServices.openSnackBar(err?.error?.message)}
    })
  }
}
