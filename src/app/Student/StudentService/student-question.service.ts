import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig, APP_CONFIG } from 'src/app/app-config.module';
import { StudentQuestionBM } from '../StudentModel/StudentQuestionModel';


@Injectable({
  providedIn: 'root'
})
export class StudentQuestionService {

  constructor(private _http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig) { }

  LoadStudentQuestionModel(TestId, SetId): Observable<any> {
     return this._http.get<any>(this.config.apiEndpoint + '/api/StudentQuestion/LoadQuestionModel'+'/'+TestId+'/'+SetId);
  }

  GetStudentExamStatusCode(TestId): Observable<any> {
     return this._http.get<any>(this.config.apiEndpoint + '/api/StudentQuestion/GetQuestionSetStatusCode'+'/'+TestId); 
  }

  SaveStudentLoadNextQuestionModel(QuestionData: StudentQuestionBM): Observable<any> {

    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = Object.assign({}, QuestionData)
    let options = {
      headers: headers
    }
    return this._http.post<any>(this.config.apiEndpoint + '/api/StudentQuestion/SaveLoadNextQuestionModel', body, options);
  }

  SubmitStudentCurrentQuestionModule(QuestionData: StudentQuestionBM): Observable<any> {

    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = Object.assign({}, QuestionData)
    let options = {
      headers: headers
    }
    return this._http.post<any>(this.config.apiEndpoint + '/api/StudentQuestion/SubmitCurrentQuestionModule', body, options);
  }



  GenerateNextQuestionModule(data : any): Observable<any> {

    let body = JSON.stringify(data)
    const headers = new HttpHeaders().set('content-type', 'application/json');
    let options = {
      headers: headers
    }
    return this._http.post<any>(this.config.apiEndpoint + '/api/StudentQuestion/GenerateNextQuestionModule', body, options);
  }

  CompleteStudentAssessment(data : any): Observable<any> {
    let body = JSON.stringify(data)
    const headers = new HttpHeaders().set('content-type', 'application/json');
    let options = {
      headers: headers
    }
    return this._http.post<any>(this.config.apiEndpoint + '/api/StudentQuestion/CompleteStudentAssessment', body, options);

   //  return this._http.get<any>(this.config.apiEndpoint + '/api/StudentQuestion/CompleteUserTest'+'/'+TestId+'/'+UserId);
  }




}
