import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentQuestionDashboardComponent } from './student-question-dashboard/student-question-dashboard.component';
import { StudentQuestionWizardComponent } from './student-question-dashboard/student-question-wizard/student-question-wizard.component';
import { StudentRegisterLayoutComponent } from './student-register-layout/student-register-layout.component';
import { StudentRegisterComponent } from './student-register-layout/student-register/student-register.component';
import { StudentAuthGuard } from './StudentService/Guard/student-auth.guard';
import { StudentResolverService } from './StudentService/Resolver/student.resolver.service';


const routes: Routes = [
  {
    path: 'StudentRegister/:Testid',
    component: StudentRegisterLayoutComponent,
    children: [
      { path: '', component: StudentRegisterComponent }
    ]
  },
  {
    path: 'QuestionDashboard', 
    component: StudentQuestionDashboardComponent,
    resolve : {list : StudentResolverService},
    runGuardsAndResolvers : 'always',
    canActivate :[StudentAuthGuard]
  },
  {
    path: 'QuestionSeries/:Testid',
    component: StudentQuestionDashboardComponent,
    children: [
      { path: '', component: StudentQuestionWizardComponent}
    ],
    resolve : {list : StudentResolverService},
    canActivate :[StudentAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
