<script>
	import { connect, StringCodec } from 'nats';
	const servers = [
		{},
		{ servers: ["localhost:4442", "localhost:4222"] },
		{ port: 4222 },
		{ servers: "localhost" },
	];
  var data;
	
	servers.forEach(async (v) => {
		try {
			const nc = await connect(v);
			console.log(`connected to ${nc.getServer()}`);

			const sc = StringCodec();
      // create a simple subscriber and iterate over messages
      // matching the subscription
			const sub = nc.subscribe("*");
			await (async () => {
				for await (const m of sub) {
					console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
          data = m.data;
				}
				console.log("subscription closed");
			})();

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
</script>


<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<button class="btn btn-primary">Hello daisyUI</button>
<p>{data}</p>










