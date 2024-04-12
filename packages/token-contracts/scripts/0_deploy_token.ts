import type { Deployer, DeployFunction, Network } from "@repo/web3/cli";
import { stringToHex } from "@alephium/web3";
import type { Settings } from "../alephium.config";
import { TokenFaucet } from "../artifacts/ts";

// This deploy function will be called by cli deployment tool automatically
// Note that deployment scripts should prefixed with numbers (starting from 0)
const deployFaucet: DeployFunction<Settings> = async (
	deployer: Deployer,
	network: Network<Settings>,
): Promise<void> => {
	// Get settings
	const issueTokenAmount = network.settings.issueTokenAmount;
	const result = await deployer.deployContract(TokenFaucet, {
		// The amount of token to be issued
		issueTokenAmount: issueTokenAmount,
		// The initial states of the faucet contract
		initialFields: {
			symbol: stringToHex("TF"),
			name: stringToHex("TokenFaucet"),
			decimals: 18n,
			supply: issueTokenAmount,
			balance: issueTokenAmount,
		},
	});
	console.log(
		`Token faucet contract id: ${result.contractInstance.contractId}`,
	);
	console.log(
		`Token faucet contract address: ${result.contractInstance.address}`,
	);
};

export default deployFaucet;
