import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig, APP_CONFIG } from 'src/app/app-config.module';
import { StudentRegisterModel } from '../StudentModel/StudentRegisterModel';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public rooturl = this.config.apiEndpoint;
  constructor(private _http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig) { }


  GetStudentCandiateData(TestId): Observable<any> {
    return this._http.get<any>(this.config.apiEndpoint + '/api/StudentUser/GetCandiateData' + '/' + TestId);
  }

  StudentAuthencation(username, password) {
    var data = "username=" + username + "&password=" + password + "&grant_type=password";
    var reqheader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded' });
    return this._http.post(this.config.apiEndpoint + '/token', data, { headers: reqheader });
  }

  SaveStudentDetails(User: StudentRegisterModel): Observable<any> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
      UserId: User.UserId,
      TestId: User.TestId,
      Title: User.Title,
      FirstName: User.FirstName,
      LastName: User.LastName,
      UserEmail: User.UserEmail,
      PhoneNumber: User.PhoneNumber,
      UserGender: User.UserGender,
      UserAge: User.UserAge,
      State: User.State,
      Country: User.Country,
      Qualification: User.Qualification,
      Professional: User.Professional,
      GenderTxt: User.GenderTxt,
      MaritalStatus: User.MaritalStatus,
      Industry: User.Industry,
      QualificationTxt: User.QualificationTxt,
      EmployeeStatus: User.EmployeeStatus,
      IsActive: User.IsActive,
      AssessmentId: User.AssessmentId,
      IsMobileDevice: User.IsMobileDevice,
      IsDesktopDevice: User.IsDesktopDevice,
      IsTabDevice: User.IsTabDevice,
      BrowserName: User.BrowserName
    }
    let options = {
      headers: headers
    }
    return this._http.post<any>(this.rooturl + '/api/StudentUser/SaveCandidateDetails', body, options);
  }


  GetStudentClaims(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('userToken')
      })
    };
    return this._http
      .get<any>(this.rooturl + "/api/StudentUser/GetUserClaim", httpOptions);
  }


  UpdateStudentIsLogin(TestId, IsLogin): Observable<any> {
    return this._http.get<any>(this.config.apiEndpoint + '/api/StudentUser/UpdateIsLogin' + '/' + IsLogin + '/' + TestId);
  }


}
