import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginAdminComponent } from './admin-login/admin-login.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Admin } from './models/admin';
import { AdminComponent } from './admin/admin.component';
import { OwnerComponent } from './owner/owner.component';
import { TouristComponent } from './tourist/tourist.component';
import { AdminUsersDashboardComponent } from './admin-users-dashboard/admin-users-dashboard.component';
import { AdminCabinsDashboardComponent } from './admin-cabins-dashboard/admin-cabins-dashboard.component';
import { OwnerRentalsComponent } from './owner-rentals/owner-rentals.component';
import { OwnerCabinsComponent } from './owner-cabins/owner-cabins.component';
import { OwnerStatisticsComponent } from './owner-statistics/owner-statistics.component';
import { TouristCabinsComponent } from './tourist-cabins/tourist-cabins.component';
import { TouristRentalsComponent } from './tourist-rentals/tourist-rentals.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'admin-login', component: LoginAdminComponent},
    {path: '', component: HomePageComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'owner', component: OwnerComponent},
    {path: 'tourist', component: TouristComponent},
    {path: 'admin-users-dashboard', component: AdminUsersDashboardComponent},
    {path: 'admin-cabins-dashboard', component: AdminCabinsDashboardComponent},
    {path: 'owner-rentals', component: OwnerRentalsComponent},
    {path: 'owner-cabins', component: OwnerCabinsComponent},
    {path: 'owner-statistics', component: OwnerStatisticsComponent},
    {path: 'tourist-cabins', component: TouristCabinsComponent},
    {path: 'tourist-rentals', component: TouristRentalsComponent}
];
