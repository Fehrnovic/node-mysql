USE moviedatabase;

DROP TABLE IF EXISTS userHasMovie;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS users;

CREATE TABLE movies (
	movieId int NOT NULL AUTO_INCREMENT,
	title varchar(55) NOT NULL,
    image varchar(2083) NOT NULL,
    PRIMARY KEY(movieId)
);

INSERT INTO movies(title, image) VALUES
('Pulp Fiction', 'http://t2.gstatic.com/images?q=tbn:ANd9GcRz_2nKTNlxhVtzbh29kgL3m2ebLv3TlYyzrbyqBtEUxt6mBuZ-'),
('Interstellar', 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SY1000_SX675_AL_.jpg'),
('The Big Sick', 'https://m.media-amazon.com/images/M/MV5BZWM4YzZjOTEtZmU5ZS00ZTRkLWFiNjAtZTEwNzIzMDM5MjdmXkEyXkFqcGdeQXVyNDg2MjUxNjM@._V1_SY1000_SX675_AL_.jpg'),
('Gladiator', 'https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,675,1000_AL_.jpg');

CREATE TABLE users (
  userId int(11) NOT NULL AUTO_INCREMENT,
  username varchar(50) NOT NULL,
  password varchar(255) NOT NULL,
  email varchar(100) NOT NULL,
  createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  lastModified datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(userId)
);

INSERT INTO users (username, password, email) VALUES ('oscar', '1234', 'oscarfehrn@gmail.com');

CREATE TABLE userHasMovie (
	userId int NOT NULL,
    movieId int NOT NULL,
	FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
    FOREIGN KEY (movieId) REFERENCES movies(movieId) ON DELETE CASCADE	
);

INSERT INTO userHasMovie VALUES ('1','1'), ('1','2');