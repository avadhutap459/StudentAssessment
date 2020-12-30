import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { StudentQuestionBM } from '../../StudentModel/StudentQuestionModel';
import { StudentQuestionService } from '../../StudentService/student-question.service';

@Component({
  selector: 'app-student-question-wizard',
  templateUrl: './student-question-wizard.component.html',
  styleUrls: ['./student-question-wizard.component.css']
})
export class StudentQuestionWizardComponent implements OnInit,OnDestroy {
  userClaim: any;
  SessionTestId: number;
  CurrentTestId: number;
  CurrentSetId: number;
  Question: StudentQuestionBM;
  IsQuestionDisplay: boolean;
  IsTestComplete: boolean;
  IsScordBoardDisplay: boolean;
  error: string;
  ErrorLog: HttpErrorResponse;

  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];

  connectionStatusMessage: string;
  connectionStatus: string;


  constructor(private _route: ActivatedRoute,
    private QuesSVC: StudentQuestionService,
    private _router: Router) { }

  ngOnInit() {
    this.userClaim = Object.assign({}, this._route.snapshot.data['list']);
    this.SessionTestId = this.userClaim.userAuth.TestId;

    this._route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('Testid'));
      this.CurrentTestId = id;
      if (this.CurrentTestId !== this.SessionTestId) {
        this._router.navigate(['/Student/QuestionSeries', this.SessionTestId]);
      }
      this.CurrentTestId = this.SessionTestId;
      this.CurrentSetId = this.userClaim.userAuth.SetId;
    });
    this.loadQuestionModel(this.CurrentTestId, this.CurrentSetId);

    this.onlineEvent = fromEvent(window, "online");
    this.offlineEvent = fromEvent(window, "offline");

    this.subscriptions.push(
      this.onlineEvent.subscribe(e => {
        this.connectionStatusMessage = "Back to online";
        this.connectionStatus = "online";
        alert(this.connectionStatusMessage)
        console.log("Online...");
      })
    );

    this.subscriptions.push(
      this.offlineEvent.subscribe(e => {
        this.connectionStatusMessage =
          "Connection lost! You are not connected to internet";
        this.connectionStatus = "offline";
        alert(this.connectionStatusMessage)
        console.log("Offline...");
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  

  loadQuestionModel(TestId, SetId) {

    this.QuesSVC.LoadStudentQuestionModel(TestId, SetId).subscribe(
      data => {
        this.Question = Object.assign({}, data.QuestionModel)
        this.IsQuestionDisplay = this.Question.IsQuestionDisplay;
        this.IsTestComplete = this.Question.IsTestComplete;
        this.IsScordBoardDisplay = this.Question.IsScordBoardDisplay
      }
    );

  }


}
