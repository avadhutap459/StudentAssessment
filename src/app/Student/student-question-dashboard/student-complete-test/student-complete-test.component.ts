import { Component, OnInit, Input } from '@angular/core';
import { StudentQuestionBM } from '../../StudentModel/StudentQuestionModel';


@Component({
  selector: 'app-student-complete-test',
  templateUrl: './student-complete-test.component.html',
  styleUrls: ['./student-complete-test.component.css']
})
export class StudentCompleteTestComponent implements OnInit {

  @Input() Question: StudentQuestionBM;
  CurrentTestId: number;
  constructor() { }

  ngOnInit() {
    this.CurrentTestId = this.Question.TestId;
  }

}
