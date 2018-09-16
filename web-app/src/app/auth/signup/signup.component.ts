import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray} from '@angular/forms';

import { AuthService } from '../auth.service';


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


  constructor(private authService: AuthService) { }

  private initForm() {
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
  }

  getControls() {
    return (<FormArray>this.signUpForm.get('role')).controls;
  }


  onSignUp() {
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    const role = this.signUpForm.value.role;
    const school = this.signUpForm.value.school;

    this.authService.signupUserWithEmail(email, password, role, school);
  }


}
