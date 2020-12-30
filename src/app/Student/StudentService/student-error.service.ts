import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig, APP_CONFIG } from 'src/app/app-config.module';


@Injectable({
  providedIn: 'root'
})
export class StudentErrorService {

  public rooturl = this.config.apiEndpoint;
  constructor(private _http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig) { }



    SaveStudentErrorLog(Error: any): Observable<any> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
        ErrorMessage: Error.ErrorMessage,
        ErrorCode: Error.ErrorCode,
        RequestMethod: Error.RequestMethod,
        Message: Error.Message,
        ExceptionType:Error.ExceptionType,
        StackTrace : Error.StackTrace
    }
    let options = {
      headers: headers
    }
    return this._http.post<any>(this.rooturl + '/api/StudentErrorHandler/SaveStudentErrorLog', body, options)
  }



}
