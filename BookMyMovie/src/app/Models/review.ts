export class review {
    _id: String;
    userid: String;
    mname: String;
    desc: String;
    date: String;
    movieid: String;

    constructor(_id: string, userid: String, mname: String, desc: String, date: String, movieid: String) {
        this._id = _id;
        this.userid = userid;
        this.mname = mname;
        this.desc = desc;
        this.date = date;
        this.movieid = movieid;
    }
}

export class review_List {
    userid: String;
    mname: String;
    desc: String;
    date: String;
    movieid: String;

    constructor(userid: String, mname: String, desc: String, date: String, movieid: String) {
        this.userid = userid;
        this.mname = mname;
        this.desc = desc;
        this.date = date;
        this.movieid = movieid;
    }
}