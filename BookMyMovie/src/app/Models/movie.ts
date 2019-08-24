export class movie {
    movieName: String;
    movieImage: String;
    movieURL: String;
    movieReleaseDate: String;
    movieLength: String;
    directorName: String;
    language: String;
    movieType: String;
    rating: String;

    constructor(movieName: String, movieImage: String, movieURL: String, movieReleaseDate: String, movieLength: String, directorName: String, language: String, movieType: String, rating: String) {
        this.movieName = movieName;
        this.movieImage = movieImage;
        this.movieURL = movieURL;
        this.movieReleaseDate = movieReleaseDate;
        this.movieLength = movieLength;
        this.directorName = directorName;
        this.language = language;
        this.movieType = movieType;
        this.rating = rating;
    }
}

export class movieList {
    movieName: String;
    movieImage: String;
    movieURL: String;
    movieReleaseDate: String;
    movieLength: String;
    directorName: String;
    language: String;
    type: String;
    rating: String;

    constructor(movieName: String, movieImage: String, movieURL: String, movieReleaseDate: String, movieLength: String, directorName: String, language: String, type: String, rating: String) {
        this.movieName = movieName;
        this.movieImage = movieImage;
        this.movieURL = movieURL;
        this.movieReleaseDate = movieReleaseDate;
        this.movieLength = movieLength;
        this.directorName = directorName;
        this.language = language;
        this.type = type;
        this.rating = rating;
    }
}
