const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require("uuid/v4");

const exportedMethods = {
	//return a boolean value
	async checkUsername(name){
		const userCollection = await users();
		const user = await userCollection.findOne({user_name: name});
		if(!user){
			return true;
		}
		else{
			throw "Something wrong!";
		}
	}, 


	//return user in json
	async getUserByName(name){
		const userCollection = await users();
		const user = await userCollection.findOne({user_name: name});
		if(!user){
			throw "Wrong username/password";
		}
		return user;
	}, 

	async addUser(name,pass,events_owned,events_joined){
		const userCollection = await users();
		
		const newUser = {
			_id: uuid(),
			user_name: name,
			user_pass: pass,
			events_owned: events_owned,
			events_joined: events_joined
		};
		const newUserInfo = await userCollection.insertOne(newUser);
		console.log(12)
		if(newUserInfo === null) 
			throw "Something wrong!";
		return newUser;
	},

	async getEventsById(user_id){
		const userCollection = await users();
		const user = await userCollection.findOne({_id: user_id});
		if(!user)
			throw "User not found"
		let events = {};
		events.owned = user.events_owned;
		events.joined = user.events_joined;
		return events;
	},

	async getUserById(id){
		const userCollection = await users();
		const user = await userCollection.findOne({_id:id});
		if(!user) 
			throw "User not found";
		return user;
	},

	async updateUserById(user_id, user_info){
		const userCollection = await users();
		const updateData = {};
		if(user_info.user_name){
			updateData.user_name = user_info.user_name;
		}
		if(user_info.user_pass){
			updateData.user_pass = user_info.user_pass;
		}
		if(user_info.events_owned){
			updateData.events_owned = user_info.events_owned;
		}
		const updateInfo = await userCollection.updateOne({_id : user_id},{$set : updateData});
		if(updateInfo === null) throw "Can not update this user!";
        return await this.getUserById(user_id);
	},
	
	async joinEventById(user_id, new_event){
		const userCollection = await users();
		const user = await userCollection.findOne({_id:id});
		if(!user)
			throw "user not found"
		const events = user.events_joined;
		events.push(new_event);
		const updateData = {};
		updateData.events_joined = events
		const updateInfo = await userCollection.updateOne({_id:user_id}, {$set : updateData});
		if(updateInfo === null) 
			throw "Something wrong!";
        return await this.getUserById(user_id);
	},

	async ownEventById(user_id, new_event){
		const userCollection = await users();
		const user = await userCollection.findOne({_id:id});
		if(!user)
			throw "user not found"
		const events = user.events_owned;
		events.push(new_event);
		const updateData = {};
		updateData.events_owned = events
		const updateInfo = await userCollection.updateOne({_id:user_id}, {$set : updateData});
		if(updateInfo === null) 
			throw "Something wrong!";
        return await this.getUserById(user_id);
	},

}


module.exports = exportedMethods;







