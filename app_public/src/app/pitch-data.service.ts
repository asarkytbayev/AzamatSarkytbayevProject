import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Pitch, Review } from './pitch';
import { environment } from '../environments/environment';

@Injectable()
export class PitchDataService {
  /** the base url */
  private apiBaseUrl: string = environment.apiUrl;

  /**
   * Injects the dependency
   * 
   * @param http the Http class 
   */
  constructor(private http: Http) { }

  /**
   * Handles errors
   * 
   * @param error error of any type
   * @return promise that is rejected with the given reason
   */
  private handleError(error: any): Promise<any> {
    console.log('Something\'s gone wrong in pitch-data.service.', error);
    return Promise.reject(error.message || error);
  }

  /**
   * Returns Promise containing array of pitches
   * 
   * @param lat latitude
   * @param lng longitude
   * @return returns array of pitches as a promise
   */
  public getLocations(lat: number, lng: number) : Promise<Pitch[]> {
    const maxDistance: number = 63710000;
    const url: string = `${this.apiBaseUrl}pitches?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;
    console.log(url);
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as Pitch[])
      .catch(this.handleError);
  }

  /**
   * Gets a single pitch by its id
   * 
   * @param {string} pitchId the pitch id
   * @return {Promise} the pitch as a promise
   */
  public getPitchById(pitchId: string): Promise<Pitch> {
    const url: string = `${this.apiBaseUrl}pitches/${pitchId}`;

    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as Pitch)
      .catch(this.handleError);
  }

  /**
   * Adds review for a pitch
   * 
   * @param {string} pitchId the pitch id
   * @param {Review} formData submitted form data
   * @return {Promise} submitted review as a promise
   */
  public addReviewByPitchId(pitchId: string, formData: Review): Promise<Review> {
    const url: string = `${this.apiBaseUrl}pitches/${pitchId}/reviews`;
    
    return this.http
      .post(url, formData)
      .toPromise()
      .then( response => response.json() as Review)
      .catch(this.handleError);
  }

}
