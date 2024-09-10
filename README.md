## Concept

The website "Des signes et des mots" is a site to facilite the communication between family and the nanny. 

============================================================================
## TODO
- real server address for API calls instead of localhost:3333
- ~~protect pages by checking if user is logged in (is authenticated or not)~~
~~- checkAuth function in AuthContext.js to check if user is authenticated and protect pages/routes~~
- rename 'allergy' to 'allergies' in the database and everyhwere else
- Add gender to user creation (registration) + for tutors & children creation too
- Use PropTypes for all components to enforce type checking
- ADMIN: Add possibilty to reset password for users, sending an email to redefine one
============================================================================



## Features
 
 # In the V1

 - nanny presentation page.
 - home page family
 
 # upcoming

 - Calendar page

## Setup & Use

First, run `npm install` to install all dependencies from `/frontend` and `/backend` folders.

Then, we need to initialize the database. To do so, go to `/backend` and run `npm run db:init`. 
_Note: Configuration has to be done in the `.env` file._

To run the frontend, go to `/frontend` and run `npm run dev`. 
The frontend will be available at `http://localhost:5173`, according to the configuration in the `.env` file.

To run the backend, go to `/backend` and run `npm run dev`.
The server will be listening at `http://localhost:3333`, alsa according to the configuration in the `.env` file.

 # Project Initialization

 - In VSCode, install plugins Prettier.

 - Code formatter and ESLint and configure them.

 - Type this command in your terminal if you're running Windows :

   - git config --global core.eol lf,
   - git config --global core.autocrlf false.

 - Run command npm i and npm run dev.


## Available Commands

## FAQ

## Technologies 

- JS.
- React.
- Node.
- Express.
- MySQL.

## Tools
