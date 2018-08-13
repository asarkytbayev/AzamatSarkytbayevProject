import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { Address } from "ngx-google-places-autocomplete/objects/address";
import { Router } from '@angular/router';



@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  /** redirects to pitches page */
  // public redirect: boolean;

  /** stores coords */
  public coords: [number];

  constructor(private router: Router) { }

  ngOnInit() {
  }
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
    
  public handleAddressChange(address: Address): void {
  // Do some stuff
    // console.log("hello");
    // console.log(address);
    // console.log(address.geometry.location.lat());
    this.coords[0] = address.geometry.location.lng();
    this.coords[1] = address.geometry.location.lat();
    // this.redirect = true;
    // this.router.navigateByUrl('/pitches', { coordinates: this.coords} );
    // return this.coords;
  }

  public redirectTo(route: string, data: number[]): void {
    this.router.navigateByUrl(`${route}`);
  }

}
