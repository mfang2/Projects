const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.usersFirebase;


const exportedMethods = {
	
	async addUser(name,email,id,name2,phone,events_owned,events_joined){
		const userCollection = await users();
		const newUser = {
            user_name: name,
            user_id: id,
            user_email: email,
			name : name2,
			phone: phone,
			events_owned: events_owned,
			events_joined: events_joined,
			insta_username:'',
			facebook_username:'',
			twitter_username:'',

		};
		const newUserInfo = await userCollection.insertOne(newUser);
		if(newUserInfo === null) 
			throw "Something wrong!";
		return newUser;
	},

	async getEventsById(user_id){
		const userCollection = await users();
		const user = await userCollection.findOne({user_id: user_id});
		if(!user)
			throw "User not found"
		let events = {};
		events.owned = user.events_owned;
		events.joined = user.events_joined;
		return events;
	},

	async getUserById(id){
		const userCollection = await users();
		const user = await userCollection.findOne({user_id:id});
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
        if(user_info.name){
			updateData.name = user_info.name;
        }
        if(user_info.user_email){
			updateData.user_email = user_info.user_email;
        }
        if(user_info.phone){
			updateData.phone = user_info.phone;
        }
		if(user_info.events_owned){
			updateData.events_owned = user_info.events_owned;
		}
		if(user_info.insta_username){
			updateData.insta_username = user_info.insta_username;
		}
		if(user_info.facebook_username){
			updateData.facebook_username = user_info.facebook_username;
		}
		if(user_info.twitter_username){
			updateData.twitter_username = user_info.twitter_username;
		}
		const updateInfo = await userCollection.updateOne({user_id : user_id},{$set : updateData});
		if(updateInfo === null) throw "Can not update this user!";
        return await this.getUserById(user_id);
	},
	
	async joinEventById(user_id, new_event){
		const userCollection = await users();
		const user = await userCollection.findOne({user_id: user_id});
		
		if(!user)
			throw "user not found"
		const events = user.events_joined;
		events.push(new_event);
		const updateData = {};
		updateData.events_joined = events
		const updateInfo = await userCollection.updateOne({user_id: user_id}, {$set : updateData});
		
		if(updateInfo === null) 
			throw "Something wrong!";
        return await this.getUserById(user_id);
	},

	async ownEventById(user_id, new_event){
		const userCollection = await users();
		const user = await userCollection.findOne({user_id:user_id});
		if(!user)
			throw "user not found"
		const events = user.events_owned;
		events.push(new_event);
		const updateData = {};
		updateData.events_owned = events
		const updateInfo = await userCollection.updateOne({user_id:user_id}, {$set : updateData});
		if(updateInfo === null) 
			throw "Something wrong!";
        return await this.getUserById(user_id);
	},

	async cancelEventById(user_id, new_event){
		const userCollection = await users();
		const user = await userCollection.findOne({user_id:user_id});
		if(!user)
			throw "user not found"
		const events = user.events_joined;

		for(let i = 0; i < events.length; i++){
			if (events[i] == new_event)
				var index = i;
		}
		var newOne = user.events_joined;
		newOne.splice(index,1);
		const updateData = {};
		updateData.events_joined = newOne;
		const updateInfo = await userCollection.updateOne({user_id:user_id}, {$set : updateData});
		if(updateInfo === null) 
			throw "Something wrong!";
        return await this.getUserById(user_id);
	},
    
	
}


module.exports = exportedMethods;







