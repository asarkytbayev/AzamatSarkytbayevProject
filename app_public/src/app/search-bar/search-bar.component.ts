import { Component, OnInit } from '@angular/core';
import { ShareCoordinatesService } from '../share-coordinates.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  /**
   * Injects dependencies
   * 
   * @param shareCoordinatesService for inserting values from google search
   */
  constructor(public shareCoordinatesService: ShareCoordinatesService) {
  }

  ngOnInit() {
  }
}
