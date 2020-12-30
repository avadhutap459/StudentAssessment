import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './Global/page-not-found/page-not-found.component';
import { BrowserNotSupportComponent } from './Global/browser-not-support/browser-not-support.component';
import { StudentModule } from './Student/student.module';
import { StudentErrorLogComponent } from './Student/StudentErrorLog/student-error-log/student-error-log.component';

const routes: Routes = [

  { path: '', pathMatch: 'full', component: PageNotFoundComponent },
  { path: 'Student', loadChildren: () => StudentModule },
  { path: 'BrowserNotSupport', component: BrowserNotSupportComponent },
  { path: 'PageNotFound', component: PageNotFoundComponent },
  { path: 'Error', component: StudentErrorLogComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponent = [
  BrowserNotSupportComponent,
  PageNotFoundComponent,
  StudentErrorLogComponent
]