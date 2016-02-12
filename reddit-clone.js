var Sequelize = require("sequelize");

var db = new Sequelize('reddit_clone', 'philraj', null, {
  dialect: 'mysql'
});

var User = db.define('user', {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING // TODO: make the passwords more secure!
});

// Even though the content belongs to users, we will setup the userId relationship later
var Content = db.define('content', {
  url: Sequelize.STRING,
  title: Sequelize.STRING
});

// Even though a vote has a link to user and content, we will setup the relationship later
var Vote = db.define('vote', {
  upVote: Sequelize.BOOLEAN
});

// User <-> Content relationship
Content.belongsTo(User); // This will add a `setUser` function on content objects
User.hasMany(Content); // This will add an `addContent` function on user objects

// User <-> Vote <-> Content relationship
User.belongsToMany(Content, {through: Vote, as: 'upVotes'}); // This will add an `add`
Content.belongsToMany(User, {through: Vote});

db.sync(); // Only needs to be used once!



function createNewUser (name, pass, email, callback) {
  User.create({
    username: name,
    password: pass,
    email: email
  })
  .then(callback);
}

function createNewContent (userID, url, title) {
  return User.findById(userID)
  .then( function(user) {
    return user.createContent({
      url: url,
      title: title
    })
  })
}

/*Write a function called voteOnContent that takes a content ID, user ID, a isUpVote boolean and a callback. This function will create a new vote for a piece of content and for the user that was passed to it.*/
function voteOnContent (contentID, userID, isUpVote) {
  return Promise.all([
    User.findById(userID),
    Content.findById(contentID)
  ])
  .then( function ([user, content]) {
    user.addUpVotes(content, {
      upVote: isUpVote
    })
  })
}