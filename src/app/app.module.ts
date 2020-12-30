import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service'


import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppConfigModule } from './app-config.module';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GooleChart2Service } from './Global/goole-chart.service';
import { UniversalDeviceDetectorService } from './Global/universal-device-detector.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpStudentErrorInterceptor } from './Student/StudentErrorLog/Interceptor/http-student-error.interceptor';
import { HttpGlobalErrorInterceptor } from './Global/Interceptor/http-student-error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    routingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    AppConfigModule,
    HttpClientModule
  ],
  providers: [GooleChart2Service,
              CookieService,
              {
                provide: DeviceDetectorService,
                useClass: UniversalDeviceDetectorService
              },
              {
                provide: HTTP_INTERCEPTORS,
                useClass: HttpGlobalErrorInterceptor,
                multi: true
              }],
  bootstrap: [AppComponent]
})
export class AppModule { }
