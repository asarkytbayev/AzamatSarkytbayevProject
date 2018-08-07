# AzamatSarkytbayevProject
Personal project for CS5610 Web Development class

# <a name="iter1"></a>Iteration 1: Front + Back Ends Working. Angular Components Created. Routing, Links, CRUD Schema Established. 3rd Party Libraries/Boilerplates Selected.

link to the [Heroku app](https://cryptic-waters-21711.herokuapp.com/)!

Notes:

* Created a default express app (express --view=pug --git)
* Pushed the app to Heroku (heroku create)
* Created default Angular app in app_public folder (ng new hoope-public --sg --st --dir app_public)
* Added routing for Express to serve app_public/build folder statically (ng build -prod -op build)
* Added stylesheets - Bootstrap & FontAwesome
* Created components - framework (ng generate component componentName)
* Homepage component = { Search-Bar & News subcomponents }
* Created routing module (ng generate module app-routing) and established routing
* Added bootstrap & JQuery libraries
* Created a simple navbar using a bootstrap example
* Pitches component = { Summary and List subcomponents }
* Details-Page component = { Summary and Pitch-Details and Interested subcomponents }
* About component added
* Player-Profile component = { Player-Data subcomponent }
* Starting working on API: Pitches and Player models
* Extra feature selected - user authentication:  https://www.sitepoint.com/user-authentication-mean-stack/