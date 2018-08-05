import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

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


@NgModule({
  declarations: [
    // AppComponent,
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
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
