# Final project
IDG2100 Full-stack Web development
Group 1

You can log in with the user johnsmith@example.com and the password 'testing1'.

(most passwords are 'testing1')

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)

## General info
This repository is the front-end part of our Final Project for IDG2100 Full-stack Web development (Spring 2021) The project will be graded as an exam.

The task description is a follows:

> The department of design needs an administrative tool to monitor the
> state of the plants and their health.  This project is a small subset
> of the project you will implement in the “IDG2671 Web project” course.
> However, this could also work as a codebase for any other project that
> requires authenticated users.
> 
> You are in charge of designing and implementing a Web-based tool that:
> 
>  1. has two types of authenticated users (managers and users – a.k.a gardeners)
>  2. is protected by a password.
>  3. allows managers to administer users. This is: 	 
	>  3a. to see a list of users. 	 
	>  3b. to add/remove users.	 
	>  3c. to see/edit the profile of a user (name, role, etc.).
	>  3d. to reset the password of a user (*).
> 4. allows users to: 
	> 4a. see their profile.	
	> 4b. update their profile (except the email address).
> 
> (*) The reset password functionality will create a unique
> server-rendered URL that will be sent by email to the user whose
> password is being reset. The URL will render a form to let the user
> create a new password.

## Technologies
* React – version 17.0.2
* Axios – version 0.21.1
* jwt-decode – version 3.1.2
* React-toastify – version 7.0.3
* Storybook – version 6

## Setup
To install the application follow these instructions. (Assuming you have the back-end part of the application).

### Main application
 1. Download the files from GitHub.
 2. Open the project folder in an external editor. We have used Visual
    Studio Code during development.
 3. Open a terminal in the root folder of the project and run `npm install` to install the project dependencies.
 4. When doing `npm install`, you might need to add the `--legacy-peer-deps` flag if you want Storybook to function properly ([https://stackoverflow.com/a/66620869](https://stackoverflow.com/a/66620869)).
 5. Run the `npm start` command to start the application.
 6. Your browser will now open with an instance of the application running on localhost.

 ### Storybook
 #### Static version
 1. To locally run the static/built version of Storybook run `npx localhost ./storybook-static`, the visit the URL the terminal returns.

 #### Development version
 1. To run Storybook in its development mode run `npm run storybook` in the terminal. The storybook will automatically open in a new tab.

We recommend checking out the "docs" part in storybook as it lists most of the information.

## Features

 - Log in to the application by entering your email and password on the login page. After logging in you will receive a JWT token containing your role. This JWT token takes care of authorization.
 - As a manager, add new users to the system, edit their information, or list all the users currently saved in the database.
 - As a gardener, visit your profile page and update your information.
 - Try the application on both mobile and desktop, the design is responsive and therefore works on a wide range of screen sizes.

## Bugs and knows issues

 - On Safari (14.0.3) the 'user account' icon in the navigation bar
   disappears after logging in. It appears again if the area where it is
   supposed to be is clicked.
   
 - After adding a new user to the database, the inputs of the 'Add a new
   user' form gain a red border.

## Status

 - Project start: Apr 7, 2021.
 - Project end: Apr 29, 2021.

The project is finished. Big chunks of the code are planned to be reused in another exam, but this repository will no longer be updated.

## Authors

 - Cornelius Ottar Sandmæl
 - Glenn Eirik Hansen
 - Thomas Lian Ødegaard
 - Tom Schrier
