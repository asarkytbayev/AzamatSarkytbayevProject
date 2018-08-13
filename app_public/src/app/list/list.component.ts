import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PitchDataService } from '../pitch-data.service';
import { Pitch } from '../pitch';
import { GeolocationService } from '../geolocation.service';
import { ShareCoordinatesService } from '../share-coordinates.service';

@Component({
  moduleId: module.id,
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [PitchDataService, GeolocationService]
})
export class ListComponent implements OnInit {

  /** array of pitches */
  public pitches: Pitch[];

  /** message to display */
  public message: string;

  /** if redirected using search */
  private redirect: boolean;

  /** lng & lat from search */
  private coords: number[];

  /**
   * Injects dependencies
   * 
   * @param pitchDataService pitch data service service
   * @param geolocationService for getting user's current location
   * @param shareCoordinatesService for getting values from google search
   */
  constructor(private pitchDataService: PitchDataService, 
    private geolocationService: GeolocationService, 
    private shareCoordinatesService: ShareCoordinatesService) { }

  /**
   * Gets position based on user's position.
   * cbSuccess - called if geolocation is successful
   * 
   * @param position current location of the user, or one he/she chooses
   */
  private getPitches(position: any): void {
    // default message
    this.message = 'Searching for nearby places';
    
    const lat: number = position.coords.latitude;
    const lng: number = position.coords.longitude;
    
    this.pitchDataService
      .getLocations(lat, lng)
      .then( (foundPitches) => {
        this.message = foundPitches.length > 0 ? 'Pitches found!' : 'No pitches found';
        this.pitches = foundPitches;
      });
  }

  /**
   * Sets the error message
   * cbError - Runs if geolocation is 
   * supported, but is not successful
   * 
   * @param error error object
   */
  private showError(error: any): void {
    this.message = error.message;
  }

  /**
   * Sets the message to say that geolocation
   * is not supported
   * cbNoGeo
   */
  private noGeo(): void {
    this.message = 'Geolocation not supported by this browser';
  }

  /**
   * Calls the geolocation function to retrieve user's current position
   */
  private getPosition(): boolean {
    this.message = 'Getting your pitches...';

    return this.geolocationService.getPosition(
      // passes position object to the callback functions
      this.getPitches.bind(this),
      this.showError.bind(this),
      this.noGeo.bind(this)
    )
  }

  /**
   * Gets pitches for location selected through
   * Google search box
   * 
   */
  private searchGetPitches(): void {
    const lng: number = this.coords[0];
    const lat: number = this.coords[1];
    
    this.pitchDataService
      .getLocations(lat, lng)
      .then( (foundPitches) => {
        this.message = foundPitches.length > 0 ? 'Pitches found!' : 'No pitches found';
        this.pitches = foundPitches;
      });
    
    // resets values
    this.redirect = false;
    this.coords = [];
    this.shareCoordinatesService.reset();
  }


  ngOnInit() {
    // get data from the service
    this.coords = this.shareCoordinatesService.coords;
    this.redirect = this.shareCoordinatesService.redirect;

    // if landed here by pressing 'near me' - find pitches by using geolocation
    if (this.redirect === false) {
      this.getPosition();
    }
    else { // if redirect === true - landed through using Google search
      this.searchGetPitches();
    }
  }
}
