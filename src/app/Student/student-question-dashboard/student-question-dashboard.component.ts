import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { StudentDialogService } from '../StudentService/Student-dialog.service';
import { StudentService } from '../StudentService/student-user.service';

@Component({
  selector: 'app-student-question-dashboard',
  templateUrl: './student-question-dashboard.component.html',
  styleUrls: ['./student-question-dashboard.component.css']
})
export class StudentQuestionDashboardComponent implements OnInit {

  userClaim: any;
  UserName: string;
  TestId: number;
  Name: string;
  AssessmentId: string;
  IsSubmenuOpen: boolean;
  @ViewChild('mySubMenu') mySubMenu: ElementRef;

  destroy = new Subject();
  timeLeft: number = 300;
  interval;


  IsLooseFocus: boolean;

  constructor(private _route: ActivatedRoute,
    private dialogService: StudentDialogService,
    private _router: Router,
    private _userSvc: StudentService) { }

  ngOnInit() {

    this.userClaim = Object.assign({}, this._route.snapshot.data['list']);
    this.UserName = this.userClaim.userAuth.Username;
    this.TestId = this.userClaim.userAuth.TestId;
    this.Name = this.userClaim.userAuth.Name;
    this.AssessmentId = this.userClaim.userAuth.AssessmentId;

    this.IsSubmenuOpen = false;
    this.IsLooseFocus = false;

  }

  OpenSubmenu() {
    if (this.mySubMenu.nativeElement.classList.value === 'dropdown-menu dropdown-user animated fadeIn') {
      this.IsSubmenuOpen = true;
    } else {
      this.IsSubmenuOpen = false;
    }
  }
  openDialog() {
    this.IsSubmenuOpen = false;

    const options = {
      title: 'Hi ' + this.Name + ',',
      message: 'Do you want to logout of the assessment?',
      cancelText: 'Log out',
      confirmText: 'Keep me logged in',
      IsInstrucation: false
    };
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(confirmed => {
      if (!confirmed) {
        localStorage.removeItem('userToken');
        this._router.navigate(['/Student/StudentRegister', this.TestId]);
      }
    });
  }


  @HostListener('window:focus', ['$event'])
  onFocus(event) {
    this.pauseTimer();
    this.timeLeft = 300;
    if (this.IsLooseFocus) {
      const options = {
        title: 'Hi ' + this.Name + ',',
        message: 'Do you want to logout of the assessment?',
        cancelText: 'Log out',
        confirmText: 'Keep me logged in',
        IsInstrucation: false
      };
      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe(confirmed => {
        if (confirmed) {
          this.IsLooseFocus = false;
        } else {
          this._userSvc.UpdateStudentIsLogin(this.TestId, false).
            subscribe((res: any) => {
              if (res.isSuccess) {
                localStorage.removeItem("TestId");
                localStorage.removeItem("userToken");
                this._router.navigate(['/Student/StudentRegister', this.TestId]);
              }
            }, (err: HttpErrorResponse) => {
            })
         
        }
      });
    }
  }

  @HostListener('window:blur', ['$event'])
  onBlur(event) {
    if (this.IsLooseFocus === false) {
      this.startTimer();
    } else {
      this.IsLooseFocus = true;
    }
  }



  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.IsLooseFocus = true;
      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

}
