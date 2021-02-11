import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminComponent } from 'src/app/admin/admin.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin();
  }
  private checkLogin() : boolean{
    const admin = JSON.parse(localStorage.getItem('admin'));
     if (admin != null && admin.role === 'admin'){
       return true;
     }
     else{
       return false;
     }
  }
  
}
