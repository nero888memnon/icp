import axios from './axios';

export const getVaultAssets = async () => {
  try {
    const response = await axios.get('/vault/assets');
    return response.data.assets;
  } catch (error) {
    console.error('Failed to fetch vault assets', error);
    return [];
  }
};
