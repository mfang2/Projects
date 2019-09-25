const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require("node-uuid");

let exportedMethods = {

  async getAllUsers() {
    return users().then(userCollection => {
      return userCollection.find({}).toArray();
    });
  },

  async getUserById(id) {
    return users().then(userCollection => {
      return userCollection.findOne({ _id: id }).then(user => {
        if (!user) throw "User not found";
        return user;
      });
    });
  },

  getUserByUserName(name) {
    return users().then(userCollection => {
      return userCollection.findOne({ userName: name }).then(user => {
        if (!user) return null; 
        return user;
      });
    });
  },
    

  async addUser(userName, passWord, email) {
    let newUser = {
      userName: userName,
      passWord: passWord,
      email: email,
      _id: uuid.v4()
    }
    const userCollection = await users();
    const insertInfo = await userCollection.insertOne(newUser);
    if (insertInfo.insertedCount=== 0) throw "Could not add new user"; 
    const newId = insertInfo.insertedId;
    const user = await this.getUserById(newId);
    return user;
  }, 

/*
  removeRecipe(id) {
    return recipes().then(recipeCollection => {
      return recipeCollection.removeOne({ _id: id }).then(deletionInfo => {
        if (deletionInfo.deletedCount === 0) {
          throw `Could not delete recipes with id of ${id}`;
        } else {
        }
      });
    });
  },

  async updatePost(id, updatedPost) {
    const postCollection = await posts();

    const updatedPostData = {};

    if (updatedPost.tags) {
      updatedPostData.tags = updatedPost.tags;
    }

    if (updatedPost.title) {
      updatedPostData.title = updatedPost.title;
    }

    if (updatedPost.body) {
      updatedPostData.body = updatedPost.body;
    }

    let updateCommand = {
      $set: updatedPostData
    };
    const query = {
      _id: id
    };
    await postCollection.updateOne(query, updateCommand);

    return await this.getPostById(id);
  }
*/

};

module.exports = exportedMethods;
