import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig, APP_CONFIG } from 'src/app/app-config.module';

@Injectable({
  providedIn: 'root'
})
export class StudentMasterService {

  constructor(private _http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig) { }

  GetStudentMasterData(): Observable<any> {
    return this._http.get<any>(this.config.apiEndpoint + '/api/StudentUser/GetMasterData');
  }

  GetStudentStateData(CountryId): Observable<any> {
    return this._http.get<any>(this.config.apiEndpoint + '/api/StudentUser/GetState' + '/' + CountryId);
  }

}
