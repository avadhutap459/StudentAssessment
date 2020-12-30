import { Component, OnInit, Input } from '@angular/core';
import { CountUpOptions } from 'countup.js';
import { HttpErrorResponse } from '@angular/common/http';
import { StudentQuestionSetStatusCode } from '../../StudentModel/StudentQuestionModel';
import { StudentQuestionService } from '../../StudentService/student-question.service';


@Component({
  selector: 'app-student-question-set',
  templateUrl: './student-question-set.component.html',
  styleUrls: ['./student-question-set.component.css']
})
export class StudentQuestionSetComponent implements OnInit {

  opts: CountUpOptions;
  @Input() CurrentTestId: number;
  LoadExamStatusCode : StudentQuestionSetStatusCode[];
  TotalQuestion : number;
  NoOfQuestionComplete : number;
  ProgressSetId : number;
  constructor(private QuesSVC: StudentQuestionService) { }

  ngOnInit() {
    this.opts = {
      duration: 5,
      useEasing: false,
      useGrouping: false
    };
    this.loadExamStatusCode(this.CurrentTestId);
  }


  loadExamStatusCode(TestId) {
    this.QuesSVC.GetStudentExamStatusCode(TestId).subscribe(
      data => {
        this.LoadExamStatusCode = Object.assign([], data.ExamStatusCode)
        this.TotalQuestion =data.NoOfQuestion;
        this.NoOfQuestionComplete =data.NoOfQuestionComplete;
        this.ProgressSetId = data.ProgressSetId;
      });
  }

}
