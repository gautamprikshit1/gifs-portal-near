import Big from 'big.js';

const GAS = Big(3).times(10 ** 13).toFixed();

export const getGifs = () => window.contract.get_gifs();

export const addGif = (gifLink, accountId) =>
  window.contract.add_gif({ gif_link: gifLink, user_address: accountId }, GAS);

export const updateGif = gif_url => window.contract.update_gif({ gif_url: gif_url }, GAS);
