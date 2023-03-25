import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GoogleApiService } from '../google-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private router: Router, private googleService:GoogleApiService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
      let isLoggedIn = this.googleService.isLoggedIn();
    if (isLoggedIn){
      return true
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
