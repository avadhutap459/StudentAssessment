import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { zip } from 'rxjs';
import { GooleChart2Service } from 'src/app/Global/goole-chart.service';
import { StudentQuestionBM, StudentTypeModel } from '../../StudentModel/StudentQuestionModel';
import { StudentQuestionService } from '../../StudentService/student-question.service';

declare var google: any;

@Component({
  selector: 'app-student-score',
  templateUrl: './student-score.component.html',
  styleUrls: ['./student-score.component.css']
})
export class StudentScoreComponent implements OnInit {

  ScoreDetail: StudentTypeModel[];

  height: number;
  weight: number;
  private gLib: any;
  loading = false;
  CurrentTestId: number;
  @Input() Question: StudentQuestionBM;
  error: string;
  ImgSrc: string;
  constructor(private gChartService: GooleChart2Service,
    private QuesSVC: StudentQuestionService,
    private _router: Router) { }

  ngOnInit() {

    this.CurrentTestId = this.Question.TestId;
    this.ScoreDetail = Object.assign([], this.Question.ScoreBoard);
    if (this.Question.CurrentSetId === 1) {
      this.height = 650;
      this.weight = 750;
    } else if (this.Question.CurrentSetId === 2) {
      this.height = 150;
      this.weight = 700;
    } else if (this.Question.CurrentSetId === 3) {
      this.height = 470;
      this.weight = 750;
    }

    this.gLib = this.gChartService.getGoogle();
    this.gLib.charts.load("current", { packages: ["corechart"] });
    this.gLib.charts.setOnLoadCallback(this.drawBarChart.bind(this));

  }

  public drawBarChart() {
    var data = [];
    var Header = ['TypeName', 'Score', { role: 'style' }];
    data.push(Header);
    this.ScoreDetail.forEach(item => {
      var temp = [];
      temp.push(item.TypeName);
      temp.push(item.Score);
      temp.push(item.ColorCode);
      data.push(temp);
    });
    var Chartdata = google.visualization.arrayToDataTable(data);

    var view = new google.visualization.DataView(Chartdata);
    view.setColumns([0, 1,
      {
        calc: "stringify",
        sourceColumn: 1,
        type: "string",
        role: "annotation"
      },
      2]);


    var options = {
      title: 'Typewise Scorecard',
      width: this.weight,
      height: this.height,
      titleTextStyle: {
        color: '#3D414D',
        fontName: "Roboto",
        fontSize: 15,
        bold: false
      },
      fontName: "Roboto",
      legend: {
        position: 'none'
      },
      chart: { title: 'Typewise Scorecard' },
      fontSize: 11,
      bars: 'horizontal', // Required for Material Bar Charts.
      tooltip: { textStyle: { fontName: 'Roboto', fontSize: 12, bold: false } },
      axes: {
        x: {
          0: { side: 'top', label: 'Score' }// Top x-axis.
        }
      },
      hAxis: {
        viewWindow: {
          min: 0,
          max: 100
        },
        ticks: [0, 25, 50, 75, 100]
      },
      bar: { groupWidth: "65%" },

    };


    var barchart = new google.visualization.BarChart(document.getElementById('barchart'));
    barchart.draw(view, options);


    google.visualization.events.addListener(barchart, 'ready', function () {
      document.getElementById('png').outerHTML = '<a href="' + barchart.getImageURI() + '">Printable version</a>';
      // do something with the image URI, like:

    });

    google.visualization.events.addListener(barchart, 'ready', function () {
      var canvas;
      var domURL;
      var imageNode;
      var imageURL;
      var svgParent;

      // add svg namespace to chart
      domURL = window.URL || window.webkitURL || window;
      svgParent = document.getElementById('barchart').getElementsByTagName('svg')[0];
      svgParent.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      imageNode = document.getElementById('barchart').cloneNode(true);
      imageURL = domURL.createObjectURL(new Blob([svgParent.outerHTML], { type: 'image/svg+xml' }));
      var image = new Image();
      image.onload = () => {
        canvas = document.getElementById('canvas');
        canvas.setAttribute('width', parseFloat(svgParent.getAttribute('width')));
        canvas.setAttribute('height', parseFloat(svgParent.getAttribute('height')));
        canvas.getContext('2d').drawImage(image, 0, 0);
       // console.log(canvas.toDataURL('image/png'));
        // container.style.display = 'none';
      }
      image.src = imageURL;
    });
  }



  GoToNextSet(UserId, SetId, TestId, TypeId) {
    let IsSuccess;
    this.loading = true;

    var canvas;
    canvas = document.getElementById('canvas');
    var ImgByte = canvas.toDataURL('image/png');


    let ScoreModel = {
      "UserId": UserId,
      "setId": SetId,
      "TestId": TestId,
      "TypeId": TypeId,
      "ImgByte": ImgByte,
      "currentSetId": this.Question.CurrentSetId
    };

    this.QuesSVC.GenerateNextQuestionModule(ScoreModel).subscribe((data) => {
      IsSuccess = data.isSuccess;
      if (IsSuccess) {
        this._router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        }
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate(['/Student/QuestionSeries', TestId]);

        this.loading = false;
      }
    })


  }

  CompleteTest(UserId, TestId) {
    let IsSuccess;
    this.loading = true;
    var canvas;
    canvas = document.getElementById('canvas');
    var ImgByte = canvas.toDataURL('image/png');


    let ScoreModel = {
      "UserId": UserId,
      "setId": this.Question.CurrentSetId,
      "TestId": TestId,
      "TypeId": '',
      "ImgByte": ImgByte,
      "currentSetId": this.Question.CurrentSetId
    };

    this.QuesSVC.CompleteStudentAssessment(ScoreModel).subscribe((data) => {
      IsSuccess = data.isSuccess;
      if (IsSuccess) {
        this._router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        }
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate(['/Student/QuestionSeries', TestId]);

        this.loading = false;
      }
    },(error) =>{

    });

  }

}
