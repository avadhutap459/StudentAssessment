import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentAuthGuard implements CanActivate {
  constructor(private _router :Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(localStorage.getItem('userToken') != null){
        return true;
      } else {
        this._router.navigate(['/PageNotFound']);
        return false;
      }
  }
}
