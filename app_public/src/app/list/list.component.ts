import { Component, OnInit } from '@angular/core';
import { PitchDataService } from '../pitch-data.service';
import { Pitch } from '../pitch';
import { GeolocationService } from '../geolocation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [PitchDataService, GeolocationService]
})
export class ListComponent implements OnInit {

  /**
   * Inject dependencies
   * 
   * @param {Object} pitchDataService pitch data service service
   */
  constructor(private pitchDataService: PitchDataService, private geolocationService: GeolocationService) { }

  /** array of pitches */
  public pitches: Pitch[];

  /** message to display */
  public message: string;

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
  private getPosition(): void {
    this.message = 'Getting your pitches...';

    this.geolocationService.getPosition(
      // passes position object to the callback functions
      this.getPitches.bind(this),
      this.showError.bind(this),
      this.noGeo.bind(this)
    )
  }


  ngOnInit() {
    this.getPosition();
  }

}
