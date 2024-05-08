// // place files you want to import through the `$lib` alias in this folder.
// import { connect } from "nats";
// const servers = [
//   // {},
//   // { servers: ["demo.nats.io:4442", "demo.nats.io:4222"] },
//   // { servers: "demo.nats.io:4443" },
//   { port: 4222 },
//   { servers: "localhost" },
// ];
// await servers.forEach(async (v) => {
//   try {
//     const nc = await connect(v);
//     console.log(`connected to ${nc.getServer()}`);

//     nc.

//     // this promise indicates the client closed
//     const done = nc.closed();
//     // do something with the connection

//     // close the connection
//     await nc.close();
//     // check if the close was OK
//     const err = await done;
//     if (err) {
//       console.log(`error closing:`, err);
//     }
//   } catch (err) {
//     console.log(`error connecting to ${JSON.stringify(v)}`);
//   }
// });

import { connect, StringCodec } from "nats";

// to create a connection to a nats-server:
const nc = await connect({ servers: "localhost:4222" });

// create a codec
const sc = StringCodec();
// create a simple subscriber and iterate over messages
// matching the subscription
const sub = nc.subscribe("FXRATE");
(async () => {
  for await (const m of sub) {
    console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
  }
  console.log("subscription closed");
})();

// nc.publish("hello", sc.encode("world"));
// nc.publish("hello", sc.encode("again"));

// we want to insure that messages that are in flight
// get processed, so we are going to drain the
// connection. Drain is the same as close, but makes
// sure that all messages in flight get seen
// by the iterator. After calling drain on the connection
// the connection closes.
await nc.drain();


