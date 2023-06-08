import { Component, Input, inject } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToDo } from 'src/app/todo/interfaces/todo.interface';
import { TodoService } from 'src/app/todo/services/todo.service';
import { CoreService } from '../services/core.service';
import { Router } from '@angular/router';
import { reload } from 'src/app/utils/utils';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  private fb = inject(FormBuilder);
  private todoService = inject( TodoService )
  private coreServices = inject(CoreService);
  private router = inject(Router);


  @Input() todoList?: ToDo[] = [];


  public todoForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(20)]],
    description: ['', [Validators.required]],
    
  })
  public errorMessage:string = '';


  createToDo():void{
    const {title, description} = this.todoForm.value;
    if(!title || !description){
      return;
    }

    this.todoService.createToDo(title, description).subscribe({
      next:(res)=> {
        this.todoList = res.data;
        this.coreServices.openSnackBar('Tarea creada')
        this.todoForm.markAsPristine();
        this.todoForm.markAsUntouched();
        this.todoForm.reset()
        reload()
      },
      error: (err)=> console.log(err)
    })
  }
}
