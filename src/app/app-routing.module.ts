import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {Error404PageComponent} from './shared/error404-page/error404-page.component'
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';

const routes: Routes = [
  {
    path:'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'todo',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule)

  },
  {
    path:'404',
    redirectTo:'todo',
    // component: Error404PageComponent
  },
  {
    path:'',
    redirectTo: 'todo',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:'404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
