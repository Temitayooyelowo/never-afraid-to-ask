import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray, FormGroupDirective, NgForm} from '@angular/forms';

import { AuthService } from '../auth.service';
import { ErrorStateMatcher } from '@angular/material';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  chooseRoles = ['Student', 'Professor', 'Admin'];
  status: string;
  matcher: MyErrorStateMatcher;


  constructor(private authService: AuthService) { }

  private initForm() {
    this.matcher = new MyErrorStateMatcher();
    const schoolsArray = new FormArray([]);

    this.signUpForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'role': new FormArray([
        new FormGroup({
          'index': new FormControl('', Validators.required)
        }),
      ]),
      'school': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.initForm();
    this.test();
  }

  getControls() {
    return (<FormArray>this.signUpForm.get('role')).controls;
  }

  toggleStatus() {
    this.authService.toggleStatus();
  }

  test() {
    console.log(this.signUpForm);
  }


  onSignUp() {
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    const role = this.signUpForm.value.role;
    const school = this.signUpForm.value.school;

    this.authService.signupUserWithEmail(email, password, role, school);
  }


}
