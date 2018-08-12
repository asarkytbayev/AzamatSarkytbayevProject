import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Player } from './player';
import { environment } from '../environments/environment';

@Injectable()
export class PlayerDataService {

  /** the base url */
  private apiBaseUrl: string = environment.apiUrl;

  /**
   * Injects dependencies
   * 
   * @param http allows to make HTTP requests
   */
  constructor(private http: Http) { }

  /**
   * Handles errors
   * 
   * @param error error of any type
   * @return promise that is rejected with the given reason
   */
  private handleError(error: any): Promise<any> {
    console.log('Something\'s gone wrong in player-data.service.', error);
    return Promise.reject(error.message || error);
  }

  /**
   * Gets a single player by its id
   * 
   * @param playerId the player id
   * @return the player as a promise
   */
  public getPlayerById(playerId: string): Promise<Player> {
    const url: string = `${this.apiBaseUrl}players/${playerId}`;

    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as Player)
      .catch(this.handleError);
  }

  /**
   * Gets a single player by email
   * 
   * @param playerEmail the player email
   * @return the player as a promise
   */
  public getPlayerByEmail(playerEmail: string): Promise<Player> {
    const url: string = `${this.apiBaseUrl}playersEmail/${playerEmail}`;

    // console.log(url);

    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as Player)
      .catch(this.handleError);
  }

  /**
   * Creates a player profile associated with a user
   * 
   * @param formData submitted form data
   * @return submitted review as a promise
   */
  public addPlayer(formData: Player): Promise<Player> {
    const url: string = `${this.apiBaseUrl}players`;
    // console.log(url);
    // console.log(formData);
    return this.http
      .post(url, formData)
      .toPromise()
      .then( response => response.json() as Player)
      .catch(this.handleError);
  }
}
