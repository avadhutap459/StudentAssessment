import { PlatformLocation } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { StudentService } from './Student/StudentService/student-user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Assessment';

  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];

  connectionStatusMessage: string;
  connectionStatus: string;
  public href: string = "";

  BrowserName: string;
  constructor(private _router: Router,
    private _userSvc: StudentService) {
  }
  ngOnInit(): void {
    this.BrowserName = this.getBrowserName();
    if (this.BrowserName === '') {
      this._router.navigate(['/BrowserNotSupport']);
    }

  }

  public getBrowserName(): string {

    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return '';
    }
  }



  @HostListener('window:unload', ['$event'])
  unloadHandler(event) {
    let url = this._router.url.split('/')

    if (url[1] === 'Student') {
      var TestId = localStorage.getItem("TestId");

      this._userSvc.UpdateStudentIsLogin(TestId, false).
        subscribe((res: any) => {
          if (res.isSuccess) {
            localStorage.removeItem("TestId");
            localStorage.removeItem("userToken");
          }
        })
    }

  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event) {
  }

}

