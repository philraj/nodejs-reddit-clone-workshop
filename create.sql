-- Users: each user should have an email, screen name, password.
-- Posts: each post should have the URL of the post, a title, and a reference to the user who posted it
-- Votes: each vote has a link to a user, a link to a post, and an up/down flag

CREATE TABLE Users (
  id INT auto_increment primary key,
  email VARCHAR(255),
  screenName VARCHAR(255),
  password VARCHAR(40)
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
  );
  
CREATE TABLE Posts (
  id INT auto_increment primary key,
  url TEXT,
  title VARCHAR(255),
  userId INT,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
  );
  
CREATE TABLE Votes (
  id INT auto_increment primary key,
  userId INT,
  postId INT,
  type ENUM('up', 'down')
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
  );