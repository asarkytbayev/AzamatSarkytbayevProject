import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ShareCoordinatesService } from '../share-coordinates.service';


@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css']
})
export class FrameworkComponent implements OnInit {

  constructor(public auth: AuthenticationService,
    private shareCoordinatesService: ShareCoordinatesService) { }

  ngOnInit() {
  }

}
