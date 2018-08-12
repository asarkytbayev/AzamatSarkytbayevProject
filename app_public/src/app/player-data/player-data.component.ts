import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../player';
import { PlayerDataService } from '../player-data.service';

@Component({
  selector: 'app-player-data',
  templateUrl: './player-data.component.html',
  styleUrls: ['./player-data.component.css'],
  providers: [ PlayerDataService ]
})
export class PlayerDataComponent implements OnInit {
  
  @Input() player: Player;
  @Input() emailAddress: string;

  constructor(private playerDataService: PlayerDataService) { }

  public newPlayer: Player = {
    email: this.emailAddress,
    name: '',
    dob: '',
    height: 175,
    position: '',
    attack: 60,
    defense: 60,
    passing: 60
  };

  /** error message */
  public formError: string;

  /** state of review form */
  public formVisible: boolean = false;

  /**
   * Validates the form
   * 
   * @return true if all form fields are filled,
   * false otherwise
   */
  private formIsValid(): boolean {
    if (this.newPlayer.name && 
        this.newPlayer.dob && this.newPlayer.height &&
        this.newPlayer.position && this.newPlayer.attack &&
        this.newPlayer.defense && this.newPlayer.passing) {
      return true;
    }
    else {
      return false;
    }
  }

  /**
   * Hides data & resets the form
   */
  private resetAndHideReviewForm(): void {
    this.formVisible = false;
    this.formError = '';
    this.newPlayer.name = '',
    this.newPlayer.dob = '',
    this.newPlayer.height = 175,
    this.newPlayer.position = '',
    this.newPlayer.attack = 60,
    this.newPlayer.defense = 60,
    this.newPlayer.passing = 60
  }


  /**
   * Submits the form and saves the review
   */
  public createProfile(): void {
    this.formError = '';
    this.newPlayer.email = this.emailAddress;
    // console.log(this.newPlayer);
    if (this.formIsValid()) {
      // console.log(this.newReview);
      this.playerDataService
        .addPlayer(this.newPlayer)
        .then( (player: Player) => {
          // console.log('Review saved', review);
          this.player = player;
          this.resetAndHideReviewForm();
        });
    }
    else {
      this.formError = 'All fields required, please try again';
    }
  }

  ngOnInit() {
    
  }

}
