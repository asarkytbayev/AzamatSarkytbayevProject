import { Component, OnInit, Input } from '@angular/core';
import { PlayerDataService } from '../player-data.service';
import { Player } from '../player';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.css'],
  providers: [ PlayerDataService ]
})
export class PlayerProfileComponent implements OnInit {

  @Input() email: string;
  @Input() id: string;

  /**
   * Injects dependencies
   * 
   * @param playerDataService for getting player data
   * @param route gets value of the current route from router
   */
  constructor(
    private playerDataService: PlayerDataService,
    private route: ActivatedRoute
  ) { }

  /** stores return player object */
  public newPlayer: Player;


  /**
   * Executes on initialization of the component
   */
  ngOnInit(): void {
    // console.log(this.email);
    // console.log(this.id);
    // check for both null & undefined
    if (this.id != null) {
      // console.log("getPlayerById");
      this.route.paramMap
        .switchMap( (params: ParamMap) => {
          let id = params.get('playerId');
          return this.playerDataService.getPlayerById(id);
        })
        .subscribe( (newPlayer: Player) => {
          this.newPlayer = newPlayer;
        })
    }
    else if (this.email != null) {
      // console.log("getPlayerByEmail", this.email);
      this.playerDataService
        .getPlayerByEmail(this.email)
        .then( (newPlayer: Player) => {
          this.newPlayer = newPlayer;
        });
    }
  }
}
