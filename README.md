# TazweedTestApi
Booking System API, secured using jwt token for authentication
  A node js, mongoDB API which has been made for Tazweed for testing purposes. 

# Working demo
http://tazweed.ay-legend.com:8000/api/(routes defined at router)

# Application Structure

/models (mongoDB schemas)
 - appointment.model
 - buyer.model
 - seller.model
 - user.model
 
/repos (repos that is standing between the models, and services)
 - base-repo (has the functions of the application which is related to booking)
 - user-repo (has the functions of the application which is related to the user)
 
/routers
 - base-router (has the expossed routes to puplic)
 
/services
 - base-service (takes the request from the router and communicate with the repo/s related booking functions)
 - user-service (takes the request from the router and communicate with the repo/s related user functions)
 

Global.js
 - has the important variables for i.e jwt token
