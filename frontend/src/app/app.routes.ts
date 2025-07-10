import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "login-admin", component: LoginAdminComponent},
    {path: "", component: HomePageComponent}
];
