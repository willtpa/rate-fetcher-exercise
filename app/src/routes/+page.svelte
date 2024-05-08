<script lang="ts">

  //import type { PageData } from './$types';
  export let data
  console.log('data',data)

  // console.log('test', pageData)
</script>


<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<button class="btn btn-primary">Hello daisyUI</button>
<p>{data.data.id}</p>