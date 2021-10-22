import gql from 'graphql-tag'

export const MEMBERS_WITH_SHARES = gql`
query membersWithShares($molochAddr: String!, $memberAddr: $String!)
 members (where: {molochAddress: molochAddr, memberAddress: memberAddr}) {
    id
    kicked
    shares
    loot
  }
`