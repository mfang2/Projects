import React from 'react';
//Import Query from react-apollo
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

//The actual query
const GET_students = gql`
	query {
		students {
			id
			firstName
			lastName
			stupid
			employer {
				name
				location
			}
		}
	}
`;

/* The React Apollo package grants access to a Query component, which takes a query as prop and executes it when its rendered. 
That’s the important part: it executes the query when it is rendered. 
It uses React’s render props pattern, using a child as a function implementation where you can access the result of the query as an argument.
*/
const students = () => (
	<Query query={GET_students}>
		{({ data }) => {
			const { students } = data;
			if (!students) {
				return null;
			}
			console.log(data);

			return (
				<div>
					<ul>
						{data.students.map((employee) => {
							return (
								<li key={employee.id}>
									{employee.firstName} {employee.lastName}{' '} {employee.stupid}
									<ul>
										<li>{employee.employer.name} {', '} {employee.employer.location}</li>
									</ul>
								</li>
							);
						})}
					</ul>
				</div>
			);
		}}
	</Query>
);

export default students;
