import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { StudentService } from '../student-user.service';

@Injectable()
export class StudentResolverService implements Resolve<any>{
    constructor(private _userSvc : StudentService){

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
        return this._userSvc.GetStudentClaims().pipe(
            take(1),
            map((profile: any) => profile));
    }
}


