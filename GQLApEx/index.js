const { ApolloServer, gql } = require('apollo-server');

//some test data
let students = [
	{
		id: 1,
		firstName: 'Michael',
		lastName: 'Fang',
		employerId: 1, 
		stupid: true
	},
	{
		id: 2,
		firstName: 'Louis',
		lastName: 'Rozencwajg-Hays',
		employerId: 1,
		stupid: false
	},
	{
		id: 3,
		firstName: 'Shreesh',
		lastName: 'Chavan',
		employerId: 2, 
		stupid: false
	},
	{
		id: 4,
		firstName: 'Conor',
		lastName: 'Manning',
		employerId: 1, 
		stupid: false
	},
	{
		id: 5,
		firstName: 'A',
		lastName: 'Person',
		employerId: 2, 
		stupid: true
	}
];

let employers = [
	{
		id: 1,
		name: 'Stevens Institute of Technology',
		location: 'Hoboken, New Jersey'
	},
	{
		id: 2,
		name: 'Google',
		location: 'Silcon Valley'
	},
	{
		id: 3,
		name: 'Amazon',
		location: 'not New York'
	}
];

//Create the type definitions for the query and our data
const typeDefs = gql`
	type Query {
		employers: [Employer]
		students: [student]
		employer(id: Int): Employer
		student(id: Int): student
	}

	type Employer {
		id: Int
		name: String
		students: [student]
		numOfstudents: Int
		location: String
	}

	type student {
		id: Int
		firstName: String
		lastName: String
		employer: Employer
		stupid: Boolean
	}

	type Mutation {
		addstudent(firstName: String!, lastName: String!, employerId: Int!): student
		removestudent(id: Int!): [student]
		changestudentFirstName(id: Int!, firstName: String!): student
		changestudentLastName(id: Int!, lastName: String!): student
		changeEmployer(id: Int!, employerId: Int!): student
	}
`;

//! after type is REQUIRED field

/* parentValue - References the type def that called it
    so for example when we execute numOfstudents we can reference
    the parent's properties with the parentValue Paramater
*/

/* args - Used for passing any arguments in from the client
    for example, when we call 
    addstudent(firstName: String!, lastName: String!, employerId: Int!): student
		
*/

const resolvers = {
	Query: { //_ before args is parent value to get property
		employer: (_, args) => employers.filter((e) => e.id === args.id)[0],
		student: (_, args) => students.filter((e) => e.id === args.id)[0],
		employers: () => employers,
		students: () => students
		//filtering on arrays, just get one item in array, grab first element
	},
	Employer: { //list to get all the employers
		numOfstudents: (parentValue) => {
			console.log(`parentValue in Employer`, parentValue);
			return students.filter((e) => e.employerId === parentValue.id).length;
		},
		students: (parentValue) => {
			return students.filter((e) => e.employerId === parentValue.id);
		}
	},
	student: { //return all students
		employer: (parentValue) => {
			return employers.filter((e) => e.id === parentValue.employerId)[0];
		}
	},
	Mutation: {
		addstudent: (_, args) => {
			const newstudent = {
				id: students.length + 1,
				firstName: args.firstName,
				lastName: args.lastName,
				employerId: args.employerId
			};
			students.push(newstudent);
			return newstudent;
		},
		removestudent: (_, args) => {
			return students.filter((e) => e.id !== args.id); //cheating, just show list without matched
		},
		changestudentFirstName: (_, args) => {
			let newstudent;
			students = students.map((e) => {
				if (e.id === args.id) {
					newstudent = {
						...e,
						firstName: args.firstName
					};
					return newstudent;
				}
				return e;
			});
			return newstudent;
		},
		changestudentLastName: (_, args) => {
			let newstudent;
			students = students.map((e) => {
				if (e.id === args.id) {
					newstudent = {
						...e,
						lastName: args.lastName
					};
					return newstudent;
				}
				return e;
			});
			return newstudent;
		},
		changeEmployer: (_, args) => {
			let newstudent;
			students = students.map((e) => {
				if (e.id === args.id) {
					newstudent = {
						...e,
						employerId: args.employerId
					};
					return newstudent;
				}
				return e;
			});
			return newstudent;
		}
	}
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url} 🚀`);
});
