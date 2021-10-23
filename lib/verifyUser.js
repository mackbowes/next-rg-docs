import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { MEMBER_SHARES } from './GraphQL/member-queries';

export const verifyUser = async (userAddress) => {
  const gqlClient = new ApolloClient({
    link: new HttpLink({
      uri:
        'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-xdai',
      fetch,
    }),
    cache: new InMemoryCache(),
  });

  const daos = ['0x957a41e54f640dbab7e60172bb97c22b94b697d4'];

  let results = daos.map((dao) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await gqlClient.query({
          query: MEMBER_SHARES,
          fetchPolicy: 'network-only',
          variables: {
            molochAddr: dao.toString(),
            memberAddr: userAddress.toString(),
          },
        });
        if (
          result.data?.members?.length &&
          result.data?.members[0].shares > 0
        ) {
          resolve(true);
        }
        resolve(false);
      } catch (error) {
        reject(error);
      }
    });
  });

  return Promise.all(results).then((x) => {
    console.log('resolved results: ', x);
    return x.some((result) => result === true);
  }); // nothing logs
};
