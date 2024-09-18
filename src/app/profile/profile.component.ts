import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, ToastModule,FileUploadModule, InputTextModule, FloatLabelModule, PasswordModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers: [MessageService]

})
export class ProfileComponent implements OnInit, OnDestroy{
  
  subscription: any;
  user?: User;
  userUpdateEndpoint: string;
  @ViewChild('fileUploader') fileUploader!: FileUpload;
  updateNameForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
  });

  changePasswordForm = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
  });

  passwordError?: string;


  constructor(private _ProfileService: ProfileService, private _AuthService: AuthService, private _MessageService: MessageService){
    this.userUpdateEndpoint = `${_ProfileService.hostname}${_ProfileService.routePath}/me`
  }

  loadUserData(){
    this.subscription = this._ProfileService.loadCurrentUserData().subscribe(
      (res) => {
        this.user = res.data;
      }
    )
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  showMessage(message: string, severity: string){
    this._MessageService.add({
      severity: severity,
      detail: message,
      life: 1000,
    });
  }


  changePhoto(event: any){
    const formData = new FormData();
    const image = event.files[0];
    formData.append('image', image)
    this.subscription = this._ProfileService.updateCurrentUser(formData).subscribe(
      (res) => {
        this.loadUserData();
        this.fileUploader.clear();
        this.showMessage("Profile Photo Changed Successfully", "success");
      }
    )
  }

  updateName(){
    this.subscription = this._ProfileService.updateCurrentUser(this.updateNameForm.value).subscribe(
      (res) => {
        this.loadUserData();
        this.showMessage("Name Changed Successfully", "success");
      }
    )
  }

  changePassword(){
    this.subscription = this._ProfileService.changePassword(this.changePasswordForm.value).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        this._AuthService.saveCurrentUser();
        this.changePasswordForm.reset();
        this.passwordError = undefined;
        this.showMessage("Password Changed Successfully", "success");
      },
      (err) => {
        err.error.errors.map((error: any) => {
          if (error.path === 'password') { this.passwordError = error.msg }
        })
      }
    )
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
