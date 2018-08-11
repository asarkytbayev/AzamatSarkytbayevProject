import { Component, OnInit } from '@angular/core';
import { PitchDataService } from '../pitch-data.service';
import { Pitch } from '../pitch';
// activatedroute - gets value of current route from router
// parammap - gets url parameters of active route as an observable
import { ActivatedRoute, ParamMap } from '@angular/router';
// gets values from parammap observable & uses them to call api - creating 2nd observable
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css'],
  providers: [ PitchDataService ]
})
export class DetailsPageComponent implements OnInit {

  /**
   * Injects dependencies
   * 
   * @param pitchDataService service which retrieves pitch data
   * @param route gets value of the current route from router
   */
  constructor(
    private pitchDataService: PitchDataService,
    private route: ActivatedRoute
  ) { }

  /** stores return pitch object */
  public newPitch: Pitch;

  /**
   * Executes on initialization of the component
   */
  ngOnInit(): void {
    this.route.paramMap
      .switchMap( (params: ParamMap) => {
        let id = params.get('pitchId');
        return this.pitchDataService.getPitchById(id);
      })
      .subscribe( (newPitch: Pitch) => {
        this.newPitch = newPitch;
      })
  }

}
