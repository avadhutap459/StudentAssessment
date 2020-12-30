import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentRegisterLayoutComponent } from './student-register-layout/student-register-layout.component';
import { StudentQuestionDashboardComponent } from './student-question-dashboard/student-question-dashboard.component';
import { StudentRegisterComponent } from './student-register-layout/student-register/student-register.component';
import { StudentScoreComponent } from './student-question-dashboard/student-score/student-score.component';
import { StudentCompleteTestComponent } from './student-question-dashboard/student-complete-test/student-complete-test.component';
import { StudentQuestionSetComponent } from './student-question-dashboard/student-question-set/student-question-set.component';
import { StudentQuestionTableTemplateComponent } from './student-question-dashboard/student-question-table-template/student-question-table-template.component';
import { StudentQuestionTemplateComponent } from './student-question-dashboard/student-question-template/student-question-template.component';
import { StudentQuestionWizardComponent } from './student-question-dashboard/student-question-wizard/student-question-wizard.component';
import { StudentDialogComponent } from './StudentDialog/student-dialog.component';
import { StudentAuthGuard } from './StudentService/Guard/student-auth.guard';
import { StudentResolverService } from './StudentService/Resolver/student.resolver.service';
import { StudentQuestionService } from './StudentService/student-question.service';
import { StudentService } from './StudentService/student-user.service';
import { StudentDialogService } from './StudentService/Student-dialog.service';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { StudentErrorService } from './StudentService/student-error.service';
import { MaterialModule } from './material/material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CountUpModule } from 'ngx-countup';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgxSliderModule } from '@m0t0r/ngx-slider';
import { NgOtpInputModule } from 'ng-otp-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpStudentErrorInterceptor } from './StudentErrorLog/Interceptor/http-student-error.interceptor';



@NgModule({
  declarations: [
    StudentQuestionDashboardComponent,
    StudentCompleteTestComponent,
    StudentQuestionSetComponent,
    StudentQuestionTableTemplateComponent,
    StudentQuestionTemplateComponent,
    StudentQuestionWizardComponent,
    StudentScoreComponent,
    StudentRegisterLayoutComponent, 
    StudentRegisterComponent, 
    StudentDialogComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CommonModule,
    StudentRoutingModule,
    HttpClientModule,
    MaterialModule,
    MatButtonModule,
    MatDialogModule,
    CountUpModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    }),
    NgxSliderModule,
    NgOtpInputModule
  ],
  providers: [
    StudentQuestionService,
    StudentResolverService,
    StudentService,
    StudentAuthGuard,
    StudentDialogService,
    StudentErrorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpStudentErrorInterceptor,
      multi: true
    }
  ],
  entryComponents:[
    StudentDialogComponent
  ]
})
export class StudentModule { }
