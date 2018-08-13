import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { Address } from "ngx-google-places-autocomplete/objects/address";
import { ShareCoordinatesService } from '../share-coordinates.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  /** stores coords */
  public coords: number[];

  /**
   * Injects dependencies
   * 
   * @param shareCoordinatesService for inserting values from google search
   */
  constructor(private shareCoordinatesService: ShareCoordinatesService) {
  }

  ngOnInit() {
  }

  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  
  /**
   * Gets coordinates from entered location and stores them in the
   * service
   * 
   * @param address the address from google search
   */
  public handleAddressChange(address: Address): void {
    this.coords = [];
    this.coords.push(address.geometry.location.lng());
    this.coords.push(address.geometry.location.lat());

    this.shareCoordinatesService.redirect = true;
    this.shareCoordinatesService.coords = this.coords;
  }
}
