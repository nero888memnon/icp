import axios from './axios';

/**
 * Fetches transaction history for a specific user
 * @param {string} userId - The user's unique identifier
 * @returns {Promise<any[]>} List of transactions
 */
export async function getTransactionHistory(userId: string): Promise<any[]> {
  try {
    const response = await axios.get(`/transactions/history/${userId}`);
    return response.data.transactions;
  } catch (error) {
    console.error('Failed to fetch transaction history', error);
    return [];
  }
}

/**
 * Records a new transaction
 * @param {object} transactionData - Data for the new transaction
 * @returns {Promise<any>} The recorded transaction response
 */
export async function recordTransaction(transactionData: object): Promise<any> {
  try {
    const response = await axios.post('/transactions/create', transactionData);
    return response.data;
  } catch (error) {
    console.error('Failed to record transaction', error);
    throw new Error('Transaction recording failed');
  }
}
