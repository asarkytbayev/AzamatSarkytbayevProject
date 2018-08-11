import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/** imports router file */
import { AppRoutingModule } from './app-routing/app-routing.module';


// import { AppComponent } from './app.component';
import { FrameworkComponent } from './framework/framework.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NewsComponent } from './news/news.component';
import { PitchesComponent } from './pitches/pitches.component';
import { SummaryComponent } from './summary/summary.component';
import { ListComponent } from './list/list.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { PitchDetailsComponent } from './pitch-details/pitch-details.component';
import { InterestedComponent } from './interested/interested.component';
import { AboutComponent } from './about/about.component';
import { PlayerProfileComponent } from './player-profile/player-profile.component';
import { PlayerDataComponent } from './player-data/player-data.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { DistancePipe } from './distance.pipe';
import { MostRecentFirstPipe } from './most-recent-first.pipe';


@NgModule({
  declarations: [
    FrameworkComponent,
    HomepageComponent,
    SearchBarComponent,
    NewsComponent,
    PitchesComponent,
    SummaryComponent,
    ListComponent,
    DetailsPageComponent,
    PitchDetailsComponent,
    InterestedComponent,
    AboutComponent,
    PlayerProfileComponent,
    PlayerDataComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    DistancePipe,
    MostRecentFirstPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthenticationService,
    AuthGuardService
  ],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
