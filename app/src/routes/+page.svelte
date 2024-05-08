<script lang="ts">
  import { onMount } from 'svelte';

  let btc = 'BTC';
  let eth = 'ETH';
  let matic = 'MATIC';
  let sol = 'SOL';

  let btcData = null;
  let ethData = null;
  let maticData = null;
  let solData = null;

  onMount(() => {
    const sse = new EventSource("http://localhost:3001/rates");
    sse.onmessage = (rate) => {
      const parsedData = JSON.parse(rate.data);
      if (parsedData.quote === btc) {
        let color = 'green';
        if (!!btcData && btcData.rate_base_quote > parsedData.rate_base_quote) {
          color = 'red';
        }
        btcData = parsedData;
        btcData.color = color;
      } else if (parsedData.quote === eth) {
        let color = 'green';
        if (!!ethData && ethData.rate_base_quote > parsedData.rate_base_quote) {
          color = 'red';
        }
        ethData = parsedData;
        ethData.color = color;
      } else if (parsedData.quote ===  matic) {
        let color = 'green';
        if (!!maticData && maticData.rate_base_quote > parsedData.rate_base_quote) {
          color = 'red';
        }
        maticData = parsedData;
        maticData.color = color;
      } else if (parsedData.quote === sol) {
        let color = 'green';
        if (!!solData && solData.rate_base_quote > parsedData.rate_base_quote) {
          color = 'red';
        }
        solData = parsedData;
        solData.color = color;
      } 
    };
  })
</script>

<h1 class="text-2xl font-bold mb-4">Welcome to SvelteKit</h1>
<p class="mb-4">Visit <a href="https://kit.svelte.dev" class="text-blue-500">kit.svelte.dev</a> to read the documentation</p>


{#if btcData}
  <div class="border rounded p-4 mb-4">
    <h3 class="text-xl mb-2">{btcData.quote}/USD: <span class="{btcData.color === 'green' ? 'bg-green-500' : 'bg-red-500'} text-black p-2 rounded bg-opacity-50">{btcData.rate_base_quote}</span></h3>
    <!--<p class="{btcData.color === 'green' ? 'bg-green-500' : 'bg-red-500'} text-black p-2 rounded max-w-sm">{btcData.id}</p>-->
    <p class="text-black p-2 rounded max-w-sm">{btcData.id}</p>
  </div>
{/if}

{#if ethData}
  <div class="border rounded p-4 mb-4">
    <h3 class="text-xl mb-2">{ethData.quote}/USD: <span class="{ethData.color === 'green' ? 'bg-green-500' : 'bg-red-500'} text-black p-2 rounded bg-opacity-50">{ethData.rate_base_quote}</span></h3>
    <!--<p class="{ethData.color === 'green' ? 'bg-green-500' : 'bg-red-500'} text-black p-2 rounded">{ethData.id} - {ethData.rate_base_quote}</p>-->
    <p class="text-black p-2 rounded max-w-sm">{ethData.id}</p>
  </div>
{/if}

{#if maticData}
  <div class="border rounded p-4 mb-4">
    <h3 class="text-xl mb-2">{maticData.quote}/USD: <span class="{maticData.color === 'green' ? 'bg-green-500' : 'bg-red-500'} text-black p-2 rounded bg-opacity-50">{maticData.rate_base_quote}</span></h3>
    <!--<p class="{maticData.color === 'green' ? 'bg-green-500' : 'bg-red-500'} text-black p-2 rounded">{maticData.id} - {maticData.rate_base_quote}</p>-->
    <p class="text-black p-2 rounded max-w-sm">{maticData.id}</p>
  </div>
{/if}

{#if solData}
  <div class="border rounded p-4 mb-4">
    <h3 class="text-xl mb-2">{solData.quote}/USD: <span class="{solData.color === 'green' ? 'bg-green-500' : 'bg-red-500'} text-black p-2 rounded bg-opacity-50">{solData.rate_base_quote}</span></h3>
    <!--<p class="{solData.color === 'green' ? 'bg-green-500' : 'bg-red-500'} text-black p-2 rounded">{solData.id} - {solData.rate_base_quote}</p>-->
    <p class="text-black p-2 rounded max-w-sm">{solData.id}</p>
  </div>
{/if}