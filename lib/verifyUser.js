import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http'
import { MEMBERS_WITH_SHARES } from './GraphQL/member-queries';

export const verifyUser = async (userAddress) => {

	const gqlClient = new ApolloClient({
		link: new HttpLink({
		  uri: 'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-xdai',
		  fetch,
		}),
		cache: new InMemoryCache(),
	  })

	const daos = ["0x957a41e54f640dbab7e60172bb97c22b94b697d4"]
	
	let results = daos.map(dao => {
		return gqlClient.query({
			query: MEMBERS_WITH_SHARES,
			fetchPolicy: 'network-only',
			variables: {
			  molochAddr: dao,
			  memberAddr: userAddress,
			},
		});
	})

	let isMember = false;

	Promises.all(results).then((res) => {
		res.forEach((response) => {
			if (response.data?.length > 0 && response.data[0].shares > 0) {
				isMember = true;
			}
		});
	});

	return isMember;
}


