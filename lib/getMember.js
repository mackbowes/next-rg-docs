import { ethers, BigNumber } from 'ethers';

export const getMember = async () => {
	//Need to add 'Please switch to the approripate network' if not xDai
	const provider = new ethers.providers.Web3Provider(window.ethereum);

	// Prompt user for account connections
	//let result = await provider.send('eth_requestAccounts', [])
	//console.log('The address is ', result[0])

	const signer = provider.getSigner();
	const userAddress = await signer.getAddress();

	const signature = await signer.signMessage('Sign here to prove you own this wallet.');
	console.log('Signature output:', signature);
	console.log('User address: ', userAddress);

	// The Dao Wallet Address to compare to
	const contractAddress = '0xD83AC7D30495e1E1d2f42a0D796a058089719a45';

	const abi = [
		{
			type: 'function',
			stateMutability: 'view',
			payable: false,
			outputs: [
				{ type: 'address', name: 'delegateKey' },
				{ type: 'uint256', name: 'shares' },
				{ type: 'uint256', name: 'loot' },
				{ type: 'bool', name: 'exists' },
				{ type: 'uint256', name: 'highestIndexYesVote' },
				{ type: 'uint256', name: 'jailed' },
			],
			name: 'members',
			inputs: [{ type: 'address', name: '' }],
			constant: true,
		},
	];

	const contract = new ethers.Contract(contractAddress, abi, provider);
	const memberData = await contract.members(userAddress);
	console.log(memberData);
};


export const oldGetMembers = async () => {
	//Need to add 'Please switch to the approripate network' if not xDai
	const provider = new ethers.providers.Web3Provider(window.ethereum);

	// Prompt user for account connections
	//let result = await provider.send('eth_requestAccounts', [])
	//console.log('The address is ', result[0])

	const signer = provider.getSigner();
	const userAddress = await signer.getAddress();

	const signature = await signer.signMessage('MAKE SURE YOU ARE ON XDAI. Click "sign" to access docs... if you dare.');
	console.log('Signature output:', signature);

	const contractAddress = '0xD83AC7D30495e1E1d2f42a0D796a058089719a45';
	const abi = [
		{
			type: 'function',
			stateMutability: 'view',
			payable: false,
			outputs: [
				{ type: 'address', name: 'delegateKey' },
				{ type: 'uint256', name: 'shares' },
				{ type: 'uint256', name: 'loot' },
				{ type: 'bool', name: 'exists' },
				{ type: 'uint256', name: 'highestIndexYesVote' },
				{ type: 'uint256', name: 'jailed' },
			],
			name: 'members',
			inputs: [{ type: 'address', name: '' }],
			constant: true,
		},
	];
	const contract = new ethers.Contract(contractAddress, abi, provider);
	const memberData = await contract.members(userAddress);

	//Method 1: Return share count as a number
	/*
	const shares = BigNumber.from(memberData[1]).toNumber()
	return shares
	*/

	//Method 2: Return 'exists' value as a boolean
	const existence = memberData.exists;

	return true;

	return existence;
}