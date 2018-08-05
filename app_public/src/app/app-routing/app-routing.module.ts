import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** import router module and route type definition */
import { RouterModule, Routes } from '@angular/router';

/** import components for routes */
import { HomepageComponent } from '../homepage/homepage.component';
import { PitchesComponent } from '../pitches/pitches.component';
import { DetailsPageComponent } from '../details-page/details-page.component';
import { AboutComponent } from '../about/about.component';

/** routes as an array of Routes */
const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'pitches',
    component: PitchesComponent
  },
  {
    path: 'pitches/:pitchId',
    component: DetailsPageComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    /** imports routes */
    RouterModule.forRoot(routes)
  ],
  /** exports router module */
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
