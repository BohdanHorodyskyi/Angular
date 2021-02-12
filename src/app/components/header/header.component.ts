import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  modalRef: BsModalRef;
  switch: boolean;

  userEmail: string;
  userPassword: string;
  firstName: string;
  lastName: string;

  loginStatus: boolean;
  loginUrl: string;
  loginName: string;
  constructor(
    private modalService: BsModalService,
    private authService: AuthService){ }

  ngOnInit(): void {
    this.checkLogin();
    this.updateCheckLogin();
  }
  loginModal(template: TemplateRef<any>): void{
    this.modalRef = this.modalService.show(template, {class: 'modal-dialog-centered'});
  }
  switchForm(): void{
    this.switch = !this.switch;
  }
  loginUser(): void{
    this.authService.login(this.userEmail, this.userPassword);
    this.resetForm();
    this.modalRef.hide();
  }
  registerUser(): void{
    this.authService.signUp(this.userEmail, this.userPassword, this.firstName, this.lastName);
    this.resetForm();
    this.switch = !this.switch;
    this.modalRef.hide();
  }
  private resetForm(): void {
    this.userEmail = '';
    this.userPassword = '';
    this.firstName = '';
    this.lastName = '';
  }
  private updateCheckLogin(): void {
    this.authService.userStatusChanges.subscribe(
      () => {
        this.checkLogin();
      }
    );
  }
  private checkLogin(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (admin != null && admin.role === 'admin' && admin.access) {
      this.loginStatus = true;
      this.loginName = 'Admin';
      this.loginUrl = 'admin';
    }
    else if (user != null && user.role === 'user') {
      this.loginStatus = true;
      this.loginName = 'Account';
      this.loginUrl = 'profile';
    }
    else {
      this.loginStatus = false;
      this.loginName = '';
      this.loginUrl = '';
    }
  }

}
