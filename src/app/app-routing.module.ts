import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './JWT Login/components/login/login.component';
import { RegisterComponent } from './JWT Login/components/register/register.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  //----------for jwt login--------------------
  // { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  // { path: '', pathMatch: 'full', redirectTo: 'login' },
  // { path: 'login', component: LoginComponent },
  //------for - dynamic overlay-------------------
  { path: '', pathMatch: 'full', redirectTo: 'employee' },
  { path: 'employee', loadChildren: () => import('./Dynamic Component/employee/employee.module').then(m => m.EmployeeModule) },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
