import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { SubmitFormComponent } from './submit-form/submit-form.component';
import { TableComponent } from './table/table.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './services/session.guard';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch:'full'},   
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard]  },
  { path: 'submit-form', component: SubmitFormComponent },
  { path: 'user', component: TableComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ChangePasswordComponent },
  { path: 'navigation-bar', component: NavigationBarComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }     
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
