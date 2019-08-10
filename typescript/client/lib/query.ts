import { QueryClient } from './QueryClient';

const client = new QueryClient();

(async () => {

    try {
    await (client.run());
    console.log('DONE');
    } catch (error) {
         console.error(error);
    }
})();
