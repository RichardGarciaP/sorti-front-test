import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToDo, ToDoResponse } from '../interfaces/todo.interface';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = enviroment.API_URL;
  private _http = inject( HttpClient );
  todoList:ToDo[] = [];

  private dataSubject = new BehaviorSubject<any>(null);
  public data$ = this.dataSubject.asObservable();


  updateData(data:ToDo[]){
    this.dataSubject.next(data);

  }


  getToDos():Observable<ToDoResponse>{
    return this._http.post<ToDoResponse>(`${this.baseUrl}/todo`, {});
  }

  createToDo(title: string, description:string):Observable<ToDoResponse> {
    return this._http.post<ToDoResponse>(`${this.baseUrl}/todo/create`, {title, description});
  }

  updateWithToFinish(id:number): Observable<ToDoResponse> {
    return this._http.patch<ToDoResponse>(`${this.baseUrl}/todo/${id}`, {status: 'finished'});
  } 

  restoreToDo(id:number): Observable<ToDoResponse> {
    return this._http.patch<ToDoResponse>(`${this.baseUrl}/todo/${id}`, {status: 'pending'});
  } 

  deleteToDo(id:number):Observable<ToDoResponse>{
    return this._http.patch<ToDoResponse>(`${this.baseUrl}/todo/${id}`, {status: 'deleted'});
  }

  deleteFromTrash(id:number):Observable<any>{
    return this._http.delete<ToDoResponse>(`${this.baseUrl}/todo/${id}`);
  }
}
