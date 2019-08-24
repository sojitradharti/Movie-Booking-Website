

export class order{
    userid: String;
    theaterid: String;
    movieid: String;
    showtime: String;
    seatdetails: String;
    totalamount: Number;
    creationtime: String;

 constructor(userid: String,
    theaterid: String, movieid: String, showtime: String, 
    seatdetails: String, totalamount: Number, creationtime: String)
        {
        
            this.userid = userid;
            this.theaterid = theaterid;
            this.movieid = movieid;
            this.showtime = showtime;
            this.seatdetails = seatdetails;
            this.totalamount = totalamount;
            this.creationtime = creationtime;
    }
}
