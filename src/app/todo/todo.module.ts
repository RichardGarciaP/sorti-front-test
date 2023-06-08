import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TrashPageComponent } from './pages/trash-page/trash-page.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header.component';
import { MaterialModule } from '../material/material.module';
import { TodoListComponent } from '../shared/todo-list/todo-list.component';
import { TodoCardComponent } from '../shared/todo-card/todo-card.component';
import { TodoFormComponent } from '../shared/todo-form/todo-form.component';


@NgModule({
  declarations: [
    TrashPageComponent,
    LayoutComponent,
    TodoPageComponent,
    HeaderComponent,
    TodoListComponent,
    TodoCardComponent,
    TodoFormComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class TodoModule { }
