import { Injectable } from '@angular/core';

@Injectable()
export class GeolocationService {
  
  /**
   * Takes in callback function for 3
   * cases: when location is obtained, 
   * when there's an error, and when geolocation
   * functionality is not supported
   * 
   * @param cbSuccess function to call upon success
   * @param cbError function to call upon error
   * @param cbNoGeo function to call geolocation is not supported
   */
  public getPosition(cbSuccess, cbError, cbNoGeo): void {
    // if geolocation is supported, call the method
    if (navigator.geolocation) {
      // cbSuccess (position: any) - takes in position object parameter
      // cbError (positionError: any) - takes in position error object as parameter
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
    }
    else { // if geolocation is not supported
      cbNoGeo();
    }
  }

  constructor() { }

}
