import type { PageLoad } from './$types';
import { connect, JSONCodec, StringCodec } from 'nats';

export const load = (async ({ url }) => {
  // insert code here


	const servers = [
		// {},
		// { servers: ["localhost:4442", "localhost:4222"] },
		{ port: 4222 },
		{ servers: "localhost" },
	];
  // const datas = {id:12345} ;
  const datas: object[] = [];
	
	servers.forEach(async (v) => {
		try {
			const nc = await connect(v);
			console.log(`connected to ${nc.getServer()}`);

			const sc = StringCodec();
      // const sc = JSONCodec();
      // create a simple subscriber and iterate over messages
      // matching the subscription
			const sub = nc.subscribe("*");
			
      await (async () => {
				for await (const m of sub) {
					// console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
          datas.push(sc.decode(m.data));
				}
				console.log("subscription closed");
			})();

      console.log('eventually0..... ', datas.length);

			// this promise indicates the client closed
			const done = nc.closed();
			// do something with the connection

			// close the connection
			await nc.close();
			// check if the close was OK
			const err = await done;
			if (err) {
				console.log(`error closing:`, err);
			}
		} catch (err) {
			console.log(`error connecting to ${JSON.stringify(v)}`);
		}
	});

    return {
       // whatever we want to return
       data: datas
    };
}) satisfies PageLoad; // PageLoad -> PageData (in our frontend, which is +page.svelte)