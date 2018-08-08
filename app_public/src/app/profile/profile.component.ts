import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  /** stores user details */
  details: UserDetails;

  /**
   * Injects dependencies
   */
  constructor(private auth: AuthenticationService) { }

  /**
   * Populates the details object
   */
  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }

}
