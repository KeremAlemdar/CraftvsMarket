import database from '../database'; // Assuming 'database' is your Firebase Realtime Database instance
import { arr } from '../types'; // Assuming 'arr' type is defined in '../types'

export const writeData = async (path: string, data: any): Promise<void> => {
  try {
    await database.put(`/${path}.json`, data);
    console.log(`Data written to ${path}`);
  } catch (error) {
    console.error(`Error writing data to ${path}:`, error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const readData = async (path: string): Promise<arr | null> => {
  try {
    const response = await database.get(`/${path}.json`);
    if (response && response.data) {
      return response.data as arr; // Type assertion
    }
    return null; // No data found
  } catch (error) {
    console.error(`Error reading data from ${path}:`, error);
    return null; // Return null on error
  }
};

export const deleteFirebaseData = async (path: string): Promise<void> => {
  try {
    await database.delete(`/${path}.json`);
    console.log(`Data deleted from ${path}`);
  } catch (error) {
    console.error(`Error deleting data from ${path}:`, error);
    throw error; // Re-throw the error for the caller to handle
  }
};
