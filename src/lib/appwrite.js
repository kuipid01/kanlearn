import { Client, Account} from 'appwrite';

export const client = new Client();


client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('658213a48ed116f2d219');
export const account = new Account(client);

