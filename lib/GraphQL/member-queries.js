export const MEMBERS_LIST = gql`
  query membersList($contractAddr: String!, $skip: Int) {
    daoMembers: members(
      where: { molochAddress: $contractAddr }
      orderBy: shares
      orderDirection: desc
      first: 1000
      skip: $skip
    ) {
      id
      delegateKey
      shares
      loot
      kicked
      jailed
      tokenTribute
      didRagequit
      memberAddress
      exists
      createdAt
      moloch {
        id
        totalShares
        depositToken {
          tokenAddress
          symbol
          decimals
        }
      }
      highestIndexYesVote {
        proposalId
        proposalIndex
      }
      tokenBalances {
        id
        tokenBalance
        token {
          id
          tokenAddress
          symbol
          decimals
        }
      }
      submissions {
        id
        proposalIndex
        yesVotes
        noVotes
        processed
        didPass
        cancelled
      }
    }
  }
`;