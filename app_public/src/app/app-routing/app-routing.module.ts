import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** import router module and route type definition */
import { RouterModule, Routes } from '@angular/router';

/** import components for routes */
import { HomepageComponent } from '../homepage/homepage.component';
import { PitchesComponent } from '../pitches/pitches.component';
import { DetailsPageComponent } from '../details-page/details-page.component';
import { AboutComponent } from '../about/about.component';
import { PlayerProfileComponent } from '../player-profile/player-profile.component';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { ProfileComponent } from '../profile/profile.component';
import { AuthGuardService } from '../auth-guard.service';

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
  },
  {
    path: 'players/:playerId',
    component: PlayerProfileComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
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
