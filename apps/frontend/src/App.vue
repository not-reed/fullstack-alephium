<script setup lang="ts">
import {
	AlephiumConnectionProvider,
	AlephiumConnect,
	AlephiumExecute,
	useAccount,
} from "@alphpro/web3-vue";
import { computed, onMounted, reactive, ref } from "vue";

import { hc } from "hono/client";

import type { TokenRouteType } from "@app/backend/src/index";

// Biome removes as it only parses the script tags and Withdraw is only used as a type here
import { Withdraw, type Withdraw as WithdrawType } from "@repo/token-contracts/artifacts/ts/scripts";
import { DUST_AMOUNT } from "@alephium/web3";



const { account } = useAccount();

const token = reactive({
	address: "",
	id: "",
	name: "",
	symbol: "",
	decimals: 0n,
	supply: 0n,
	balance: 0n,
});

// make use of Hono RPC: https://hono.dev/guides/rpc
const client = hc<TokenRouteType>("http://127.0.0.1:3001/");
async function refreshToken() {
	const res = await client.api.token.$get().then((a) => a.json());
	Object.assign(token, {
		...res.token,
		decimals: BigInt(res.token.decimals),
		supply: BigInt(res.token.supply),
		balance: BigInt(res.token.balance),
	});
}

// set token info on boot
onMounted(() => refreshToken());

const withdrawAmount = ref('0');
const fields = computed(() => ({
	initialFields: { token: token.id, amount: BigInt(withdrawAmount.value) },
	attoAlphAmount: DUST_AMOUNT,
}) satisfies Parameters<typeof WithdrawType.execute>[1]);

function handleConfirmedTransaction(txId: string) {
	refreshToken();
}
</script>

<template>
	Address: {{ token.address }}<br />
	Name: {{ token.name }}<br />
	Symbol: {{ token.symbol }}<br />
	Decimals: {{ token.decimals }}<br />
	Supply: {{ token.supply }}<br />
	Balance: {{ token.balance }}<br />

	<AlephiumConnectionProvider :autoConnect="true" :group="0" network="devnet">

		<AlephiumConnect v-slot="{ isConnected, connectExtension, connectDesktop, disconnect }">
			<template v-if="!isConnected">
				<button @click="connectExtension">Extension</button>
				<button @click="connectDesktop">Desktop</button>
			</template>
			<button v-else @click="disconnect">Disconnect</button>
		</AlephiumConnect>

		<br />{{ account.address }}<br />

		<AlephiumExecute :txScript="Withdraw" :fields="fields" v-slot="{ execute }"
			@txConfirmed="handleConfirmedTransaction" v-if="account.address">
			<form @submit.prevent="execute">
				<label>Can withdraw as long as amount is less than or equal to '100'<br />
					<input type="text" v-model="withdrawAmount" />
				</label>
				<button type="submit">Withdraw</button>
			</form>
		</AlephiumExecute>

	</AlephiumConnectionProvider>
</template>
