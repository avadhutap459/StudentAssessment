import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {  StudentQuestionSetComponent } from '../student-question-set/student-question-set.component';
import { StudentQuestionBM } from '../../StudentModel/StudentQuestionModel';
import { StudentQuestionService } from '../../StudentService/student-question.service';

@Component({
  selector: 'app-student-question-template',
  templateUrl: './student-question-template.component.html',
  styleUrls: ['./student-question-template.component.css']
})
export class StudentQuestionTemplateComponent implements OnInit {

  @Input() Question: StudentQuestionBM;
  loading = false;
  CurrentTestId: number;
  @ViewChild(StudentQuestionSetComponent, { static: false }) childC: StudentQuestionSetComponent;
  error : string;
  ErrorLog: HttpErrorResponse;
  constructor(private QuesSVC: StudentQuestionService,
    private _router: Router) { }
                                  
  ngOnInit() {
    this.CurrentTestId = this.Question.TestId;
  }

  NextAndSaveQuestion() {
    let IsSuccess;
    this.loading = true;
    this.QuesSVC.SaveStudentLoadNextQuestionModel(this.Question).subscribe(
      data => {
        IsSuccess = data.isSucess;
        if (IsSuccess) {
          this.Question = Object.assign({}, data.QuestionModel)
          this.CurrentTestId = this.Question.TestId;
          this.childC.ngOnInit();
          this.loading = false;
        }
      });
  }

  saveQuestion() {
    let IsSuccess;
    this.loading = true;
    this.QuesSVC.SubmitStudentCurrentQuestionModule(this.Question).subscribe(
      data => {
        IsSuccess = data.isSuccess;
        if (IsSuccess) {
          this.Question = Object.assign({}, data.QuestionModel)
          // this.CurrentTestId = this.Question.TestId;
          this._router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          }
          this._router.onSameUrlNavigation = 'reload';
          this._router.navigate(['/Student/QuestionSeries', this.Question.TestId]);

          this.loading = false;
        }
      });
  }

}
