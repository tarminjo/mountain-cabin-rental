import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'login-admin', component: LoginAdminComponent},
    {path: '', component: HomePageComponent},
    {path: 'register', component: RegisterComponent}
];
