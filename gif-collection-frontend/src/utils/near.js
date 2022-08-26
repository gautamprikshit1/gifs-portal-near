import { connect, Contract, keyStores, WalletConnection } from 'near-api-js';
import { formatNearAmount } from 'near-api-js/lib/utils/format';
import environment from './config';

const nearEnv = environment("testnet");

export const initializeContract = async () => {
  const near = await connect(
    Object.assign(
      { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
      nearEnv
    )
  );

  window.walletConnection = new WalletConnection(near);
  window.accountId = window.walletConnection.getAccountId();

  window.contract = new Contract(
    window.walletConnection.account(),
    nearEnv.contractName,
    {
      viewMethods: ["get_gifs"],
      changeMethods: ["add_gif", "update_gif"],
    }
  )
}

export const accountBalance = async () => {
  return formatNearAmount(
    (await window.walletConnection.account().getAccountBalance()).total,
    2
  )
}

export const getAccountId = async () => {
  return window.walletConnection.getAccountId();
}

export const login = () => {
  window.walletConnection.requestSignIn(nearEnv.contractName, "Near Gifs Collection");
}

export const logout = () => {
  window.walletConnection.signOut();
  window.location.reload();
}
