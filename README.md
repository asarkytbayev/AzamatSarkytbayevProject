# Hoope
Personal project by Azamat Sarkytbayev for CS5610 Web Development class  

link to the [Heroku app](https://cryptic-waters-21711.herokuapp.com/)!  
Note: Mlab extension was removed from Heroku and as a result the app doesn't contain any data.  

Important links:

* [Summary](#summary)
* [Iteration 3](#iter3)
* [Iteration 2](#iter2)
* [Iteration 1](#iter1)

## <a name="summary"></a>Summary

* Hoope means "Redwood" in Ohlone language, native to the San Francisco Bay Area. The website is for people interested in football!

* Features: This website allows users to register and create player profiles. They can search for football pitches using Google Maps API, rate them and read reviews. CRUD requests

* Technologies used: HTML, CSS, Javascript, Express, Typescript, Angular, MongoDB, Mongoose.- MEAN stack

* Future work: In the future, this website would add the functionality for people to create events and have people sign up for matches at pitches. Furthermore, users would be able to directly message others, rate them as players and organize into teams. 

## <a name="iter3"></a>Iteration 3: Application is done!

link to the [Heroku app](https://cryptic-waters-21711.herokuapp.com/)!

Notes:

* Added error handling logic - previously registered email & clear the form
* Set up Angular environment variables - development & production modes
* Changed configuration for local development
* Created pitch class: ng generate class pitch
* Create service to get the pitch data: ng generate service pitch-data
* Created service to get user's location: ng generate service geolocation
* Created a pipe to format the distance
* Set up details page & configured the add review functionality
* Added show/hide reviews functionality
* Added pipe to sort reviews: ng generate pipe most-recent-first
* Created player class & corresponding service for API requests/reponses: ng generate player-data
* Started working on logic to create player profiles - implemented
* Added google search box
* Created data sharing service - to pass coordinates
* Modified user interface
* Populated database with entries


![iter3](/readme_images/final_00_homepage.jpg)
![iter3](/readme_images/final_01_about.jpg)
![iter3](/readme_images/final_02_register.jpg)
![iter3](/readme_images/final_03_register_error.jpg)
![iter3](/readme_images/final_04_profile.jpg)
![iter3](/readme_images/final_05_player_profile.jpg)
![iter3](/readme_images/final_06_login_error.jpg)
![iter3](/readme_images/final_07_list.jpg)
![iter3](/readme_images/final_08_pitch_details.jpg)

## <a name="iter2"></a>Iteration 2: Developing CRUD. GET & POST. Not Broken! Incomplete functionality - only user registration and login/logout functionalities are implemented.

link to the [Heroku app](https://cryptic-waters-21711.herokuapp.com/)!

Notes:

* Added API user authorization logic:
    * /api/register (POST) & /api/login (POST) & /api/profile/userid (GET) - index.js
    * setPassword, checkPassword & generateJwt to player schema
    * set up passport node module to handle authentication npm install passport --save / npm install passport-local --save
    * configured controllers s.t. only authenticated users can access /api/profile
    * npm install express-jwt --save - to use JSON Web Token for maintaining the session state

* Applied authentication to Angular:
    * Created registration component which has a submit form: ng generate component register
    * Created a login component which has a submit form
    * Created profile component which only logged in users can see
    * Changed content based on user status - logged in or loggen out
    * Created authentication service: ng generate service authentication
    * Created a service to protect the path for logged in users: ng generate service auth-guard
    * Add canActivate property to routes
* Pushing DB live: heroku addons:create mongolab & heroku addons:open mongolab & heroku config:get MONGODB_URI
* Set heroku to be in production mode: heroku config:set NODE_ENV=production & heroku config:get NODE_ENV
* Set heroku's MY_SECRET environment variable for JWT

![iter2](/readme_images/iter2_0.jpg)
![iter2](/readme_images/iter2_1.jpg)
![iter2](/readme_images/iter2_2.jpg)
![iter2](/readme_images/iter2_3.jpg)

## <a name="iter1"></a>Iteration 1: Front + Back Ends Working. Angular Components Created. Routing, Links, CRUD Schema Established. 3rd Party Libraries/Boilerplates Selected.

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

![iter1](/readme_images/iter1_0.jpg)
![iter1](/readme_images/iter1_1.jpg)
![iter1](/readme_images/iter1_2.jpg)
![iter1](/readme_images/iter1_3.jpg)
![iter1](/readme_images/iter1_4.jpg)
