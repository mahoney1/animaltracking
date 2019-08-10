import { QueryClient } from './QueryClient_IBP';

const client = new QueryClient();

(async () => {

    try {
    await (client.run());
    console.log('DONE');
    } catch (error) {
         console.log(error);
    }
})();
