const express = require('express');
const nats = require('nats');
const cors = require('cors')


const app = express();
app.use(cors());
const servers = [
  // {},
  // { servers: ["localhost:4442", "localhost:4222"] },
  { port: 4222 },
  { servers: "localhost" },
];

const connectToNats = async (res) => {
  servers.forEach(async (v) => {
		try {
			const nc = await nats.connect(v);
			console.log(`connected to ${nc.getServer()}`);

			const sc = nats.StringCodec();
			const sub = nc.subscribe("*");
			
      await (async () => {
				for await (const m of sub) {
					console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
          res.write(`data: ${sc.decode(m.data)}\n\n`);
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

}


app.get('/', (req, res) => {res.json({message: 'Hello World'})});
app.get('/rates', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  // res.write('Hello World\n\n');
  await connectToNats(res);
  // send(res);

});

const send = (res) =>{
  res.write("data: " + 'Hello World\n\n');

  setTimeout(() => {
    send(res);
  }, 1000);
}



app.listen(3001, async () => {
  console.log('Server is running on port 3001');
  // await connectToNats();
});