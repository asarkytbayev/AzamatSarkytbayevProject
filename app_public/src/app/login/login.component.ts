import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /** user credentials */
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) { }

  // error 
  public formError: string;

  /**
   * Checks if user entered email & password
   * 
   * @return {boolean} false if either of fields
   *                  is empty
   */
  private formIsValid(): boolean {
    if (this.credentials.email &&
        this.credentials.password) {
      return true;
    }
    else {
      return false;
    }
  }
  
  /**
   * Resets the login form
   */
  private resetAndHideReviewForm(): void {
    this.credentials.email = '';
    this.credentials.password = '';
  }

  /**
   * Logs the user in
   * 
   */
  login(): void {
    if (this.formIsValid()) {
      this.auth.login(this.credentials).subscribe(() => {
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
