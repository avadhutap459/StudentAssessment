import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { StudentQuestion, StudentQuestionBM } from '../../StudentModel/StudentQuestionModel';
import { StudentQuestionService } from '../../StudentService/student-question.service';


@Component({
  selector: 'app-student-question-table-template',
  templateUrl: './student-question-table-template.component.html',
  styleUrls: ['./student-question-table-template.component.css']
})
export class StudentQuestionTableTemplateComponent implements OnInit {

  @Input() Question: StudentQuestionBM;
  loading = false;
  CurrentTestId: number;
  error : string;
  ErrorLog: HttpErrorResponse;
  TxnQuestionResponseText : string;
  TxnQuestionResponseId : number;
  constructor(private QuesSVC: StudentQuestionService,
              private _router: Router) { }

  ngOnInit() {
    this.CurrentTestId = this.Question.TestId;
  }

  RetrunQuestionResponseText(lstQuestion: StudentQuestion,Index : number) : string{
    let lstQuestionResponse = lstQuestion.lstQuestionRes;
    this.TxnQuestionResponseText = lstQuestionResponse[Index].ResponseText;
    return this.TxnQuestionResponseText;
  }
  RetrunQuestionResponseId(lstQuestion: StudentQuestion,Index : number) : number{
    let lstQuestionResponse = lstQuestion.lstQuestionRes;
    this.TxnQuestionResponseId = lstQuestionResponse[Index].ResponseId;
    return this.TxnQuestionResponseId;
  }
  SaveQuestion(QuestionForm: NgForm): void {
    let IsSuccess;
    this.loading = true;
    this.QuesSVC.SubmitStudentCurrentQuestionModule(this.Question).subscribe(
      data => {
        IsSuccess = data.isSuccess;
        if (IsSuccess) {
          this.Question = Object.assign({}, data.QuestionModel)
          this._router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          }
          this._router.onSameUrlNavigation = 'reload';
          this._router.navigate(['/Student/QuestionSeries', this.Question.TestId]);

          this.loading = false;
        }
      }
    );
  }
}
