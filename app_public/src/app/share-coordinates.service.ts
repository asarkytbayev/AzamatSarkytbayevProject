import { Injectable, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { Address } from "ngx-google-places-autocomplete/objects/address";

@Injectable()
export class ShareCoordinatesService {

  constructor() { }

  /** redirect flag: true if search used, false if 'near me' */
  private _redirect: boolean = false;

  /** stores coordinates from search */
  private _coords: number[] = [];

  /**
   * Sets redirect
   * 
   * @param flag boolean true if search is used, false otherwise
   */
  set redirect(flag: boolean) {
    this._redirect = flag;
  }

  /**
   * Gets redirect value
   * 
   * @return redirect flag
   */
  get redirect() {
    return this._redirect;
  }

  /**
   * Sets coordinates
   * 
   * @param coords [lng, lat] array
   */
  set coords(coords: number[]) {
    this._coords = coords;
  }

  /**
   * Gets coordinates
   * 
   * @return [lng, lat] array 
   */
  get coords() {
    return this._coords;
  }

  /**
   * Resets variables
   */
  public reset() {
    this.coords.length = 0;
    this.redirect = false;
  }

  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  /**
   * Gets coordinates from entered location and stores them in the
   * service
   * 
   * @param address the address from google search
   */
  public handleAddressChange(address: Address): void {
    this.coords.length = 0;
    this.coords.push(address.geometry.location.lng());
    this.coords.push(address.geometry.location.lat());

    this.redirect = true;
    this.coords = this.coords;
  }
  
}
