
## BookMyMovie App Description
1. Moving Booking Web application based on nodejs, express & mongoDB. 
2. We have used HTTP methods like GET, POST, PUT, DELETE
3. User will have to login in order to book a movie
4. After the user log ins, it will be able to book a movie ticket in the theatres associated with the movie.
5. User will be able to select seats according to it's choice.
6. Next, the User will get to the payment page to pay for the ticket.
7. User can download the m-ticket from the payment page

## Project Generation
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.


## Create new component
Run `ng generate component component-name` to generate a new component. 


## Step to launch front end
Run `ng serve --open` to launch the front end.


## Angular features implemented
1. We used router outlet to navigate to different pages using "@angular/router".
2. Bootstrap used for awesome css using "@ng-bootstrap/ng-bootstrap".
3. Jspdf and html2canvas used to download the ticket in pdf format.
4. Carousel implemented on front end using ng2-carouselamos.
5. To store user details with access token we used ngx-cookie-service".
6. To implement pagination we have used ngx pagination.
7. Filter used to for the search functionality.
8. Date picker implemented using ngb-datepicker.

## References
https://www.npmjs.com/package/ngx-pagination
https://www.freakyjolly.com/create-multipage-html-pdf-jspdf-html2canvas/
https://angular.io/guide/pipes
https://www.npmjs.com/package/ngx-cookie-service


## Steps to Launch Backend
1. Run 'mongod' to connect to the mongo atlas
2. Run 'npm run start' to start the backend server
3. Run 'npm install' everytime you take a pull


## BookMyMovie Backend/Dependencies
1. Rest APIs for all the necessary datas are created
2. Mongodb is used to store the data
3. nodemailer used to send emails to the user after movie booking and forgot password
4. We have used body-parser to parse the JSON data.
5. We have used CORS as a dependency to allow cross domain requests
6. We have used express framework which provides robust set of features
7. 'jsonwebtoken' is used to generate the user token
8. Mongoose is used to connect to the MongoDB


