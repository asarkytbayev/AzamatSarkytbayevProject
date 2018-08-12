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

  constructor(private playerDataService: PlayerDataService) { }

  ngOnInit() {
  }

}
