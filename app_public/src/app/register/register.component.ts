import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  /** user credentials */
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  /**
   * Injects dependencies
   */
  constructor(private auth: AuthenticationService, private router: Router) { }

  /** error message */
  public formError: string;

  /**
   * Checks if user entered email, name & password
   * 
   * @return {boolean} false if either of fields
   *                  is empty
   */
  private formIsValid(): boolean {
    if (this.credentials.email &&
        this.credentials.password &&
        this.credentials.name) {
      return true;
    }
    else {
      return false;
    }
  }
  
  /**
   * Resets the registration form
   */
  private resetAndHideReviewForm(): void {
    this.credentials.email = '';
    this.credentials.password = '';
    this.credentials.name = '';
  }

  /**
   * Registers the user
   */
  register() {
    if (this.formIsValid()) {
      this.auth.register(this.credentials).subscribe(() => {
        this.router.navigateByUrl('/profile');
      }, (err) => {
        console.error(err);
      });
    }
    else {
      this.formError = 'All fields required, please try again';
    }
  }

  ngOnInit() {
  }
}
