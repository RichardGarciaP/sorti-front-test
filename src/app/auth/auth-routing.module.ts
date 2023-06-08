import { NgModule } from "@angular/core";
import { Routes , RouterModule} from "@angular/router";
import { LayoutComponent } from "./pages/layout/layout.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";
import { isAuthenticatedGuard } from "./guards/is-authenticated.guard";

const routes: Routes = [
    {
        path:'',
        component: LayoutComponent,
        children: [
            {
                path:'login',
                component:LoginPageComponent
            },
            {
                path:'register',
                component:RegisterPageComponent
            }
        ] 
    }
]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class AuthRoutingModule {}