import { Component, Input, OnInit, inject } from '@angular/core';
import { ToDo } from 'src/app/todo/interfaces/todo.interface';
import { TodoService } from 'src/app/todo/services/todo.service';
import { CoreService } from '../services/core.service';
import { reload } from 'src/app/utils/utils';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {
  private todoService = inject(TodoService);
  private coreService = inject(CoreService);

  @Input() todo:ToDo = {};


  ngOnInit(): void {
    if(!this.todo){
      throw new Error('ToDo data not found');
    }    
  }

  finishToDo(id?:number):void{
    if(!id){
      throw new Error('Id  not found');
    }
    this.todoService.updateWithToFinish(id).subscribe({
      next:(res)=>{
        this.coreService.openSnackBar('La tarea ha sido finalizada')
        reload()
      },
      error: (error) => {
        this.coreService.openSnackBar(error?.error?.message)
      }
    })
  }
  
  deleteFromTrash(id?:number):void{
    if(!id){
      throw new Error('Id  not found');
    }
    this.todoService.deleteFromTrash(id).subscribe({
      next:(res)=>{
        this.coreService.openSnackBar('La tarea ha sido eliminada')
        reload();     
      },
      error: (error) => { this.coreService.openSnackBar(error?.error.message)}
    })
  }
  deleteToDo(id?:number):void{
    if(!id){
      throw new Error('Id  not found');
    }
    this.todoService.deleteToDo(id).subscribe({
      next:(res)=>{
        this.coreService.openSnackBar('La tarea ha sido eliminada')
        reload();     
      },
      error: (error) => { this.coreService.openSnackBar(error?.error.message)}
    })
  }

  restoreToDo(id?:number):void{
    if(!id){
      throw new Error('Id  not found');
    }
    this.todoService.restoreToDo(id).subscribe({
      next:(res)=> {        
        this.coreService.openSnackBar('La tarea ha sido restaurada')
      },
      error: (error) => { this.coreService.openSnackBar(error?.error.message)}
    })
  }


}
