import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';
import { TrashPageComponent } from './pages/trash-page/trash-page.component';

const routes: Routes = [
  {
    path:'',
    component: LayoutComponent,
    children: [
      {
          path:'',
          component:TodoPageComponent
      },
      {
          path:'trash',
          component:TrashPageComponent
      }
  ]
}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
