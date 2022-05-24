import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckAuthenticationGuard } from './guards/check-authentication.guard';
import { LandingViewComponent } from './landing-view/landing-view.component';
import { LogInComponent } from './log-in/log-in.component';
import { NewAccountDialogComponent } from './new-account-dialog/new-account-dialog.component';
import { RegisterComponent } from './register/register.component';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [{
    path:"",
    children:[
    {path:"accounts",
    component:LandingViewComponent,
    children:[{
      path:"login",
      component:LogInComponent
    },
    {
      path:"register",
      component:RegisterComponent
    },
    {
      path:"",
      component:LogInComponent
    }]
  },
  {
    path:"",
    canActivate:[CheckAuthenticationGuard],
    component:ScheduleComponent
    
  }]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
