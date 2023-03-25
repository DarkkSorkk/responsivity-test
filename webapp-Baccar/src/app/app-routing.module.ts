import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ExamsComponent } from './exams/exams.component';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { ResultComponent } from './result/result.component';
import { StartExamComponent } from './start-exam/start-exam.component';
import { TestComponent } from './test/test.component';
import { UsernameComponent } from './username/username.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilComponent,
    pathMatch: 'full'},
  { path:'login', component:LoginComponent},
  { path:'profil', component:ProfilComponent , canActivate:[AuthGuard] },
  { path:'test/:id', component:TestComponent , canActivate:[AuthGuard] },
  { path:'username', component:UsernameComponent , canActivate:[AuthGuard] },
  { path:'startExam/:title/:id', component:StartExamComponent , canActivate:[AuthGuard] },
  { path:'result/:id', component:ResultComponent, canActivate:[AuthGuard] },
  { path:'exams', component:ExamsComponent, canActivate:[AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
