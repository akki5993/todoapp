// this app contain todo app where user can register and add,delete there tasks.

Note:-this is note proper node.js app.i will definitely try to make this fix.Pagination & search Query feaature not there, i'm working on it.

Mistakes : - 
1) this is not folollow proper REST Apis structure
2) i should have to maintain proper foldet structure

* i assure you give me a day i will definitely make proper REST Apis.
* iam also working on graphql base apis.



Frontend - ejs
backend - node js
packages - express (create routes,server and more),ejs (client-side),cookie-parser (Handling Cookies),mongoose (connection with mongodb),jwt (secure data),bcrypt (hashing password)

APIs

1) (GET REQUEST)    "/"       -   User Registration Page 
2) (POST REQUEST)   "/create" -   USer Creartion  , Password Hasing & set JWT in Cookies 
3) (GET REQUEST)    "/login"  -   User Login Page 
4) (POST REQUEST)   "/login"  -   User Login , Authenticate with email & password if valid then redirect to there Tasks. 
5) (GET REQUEST)    "/tasks"  -   Authenticate User can see there Tasks
6) (POST REQUEST)   "/createtask" - user can add tasks
7) (GET REQUEST)    "/deletetask/:id"  - delete that perticular task
8) (GET REQUEST)    "/logout"  -  set tocken to empty and rediret login page
9) (GET REQUEST)    "/users"   -   Get All Registered User




