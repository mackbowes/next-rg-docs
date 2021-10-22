import gql from 'graphql-tag';

export const MEMBER_SHARES = gql`
  query memberShares($molochAddr: string, $memberAddr: string) {
    members(where: { molochAddress: molochAddr, memberAddress: memberAddr }) {
      shares
    }
  }
`;
