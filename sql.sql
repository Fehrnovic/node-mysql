INSERT INTO accounts (username, password, email) VALUES ('user2', '1234', 'email');
INSERT INTO hasMovie (userId, movieId) VALUES ('2', '2');

SELECT * 
FROM 
	(SELECT userId, title
	FROM (hasmovie JOIN accounts ON hasMovie.userId=accounts.id) JOIN movies ON hasMovie.movieId=movies.id) AS T
WHERE userId=2;