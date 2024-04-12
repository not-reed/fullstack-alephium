import { Hono } from "hono";
import { loadDeployments } from "@repo/token-contracts";
import { hexToString, web3 } from "@alephium/web3";
import { cors } from "hono/cors";

// devnet
web3.setCurrentNodeProvider("http://127.0.0.1:22973");

const app = new Hono();
const deployments = loadDeployments("devnet");

app.use("/api/*", cors());
const tokenRoute = app.get("/api/token", async (c) => {
	const state =
		await deployments.contracts.TokenFaucet.contractInstance.fetchState();

	return c.json({
		token: {
			address: state.address,
			id: state.contractId,
			name: hexToString(state.fields.name),
			symbol: hexToString(state.fields.symbol),
			decimals: state.fields.decimals.toString(),
			supply: state.fields.supply.toString(),
			balance: state.fields.balance.toString(),
		},
	});
});

export type TokenRouteType = typeof tokenRoute;

export default {
	port: 3001,
	fetch: app.fetch,
};
