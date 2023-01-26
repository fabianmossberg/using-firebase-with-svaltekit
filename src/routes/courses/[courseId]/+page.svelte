<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	$: ({ course } = data);
</script>
<main>
	{#if course}
<h1>{course.title}</h1>
<div class="image-wrapper">
	<div>
		<img src={course.thumbSvgUrl} alt={course.title} />
	</div>
	<div>
		<img src={course.heroSvgUrl} alt={course.title} />
	</div>
	<div>
		<img src={course.heroImageBaseUrl} alt={course.title} />
	</div>
</div>

<ul>
	{#each course.keywords as keyword}
		<li>{keyword}</li>
	{/each}
</ul>

<h2>Raw data</h2>
<pre>{JSON.stringify(course, null, 2)}</pre>
{/if}
</main>
<style>
main{
    max-width: 640px;
    margin:auto;
    padding:1rem;
}
.image-wrapper{
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap:1rem;
}
.image-wrapper > div:has(img){
    background-color: rgb(107, 107, 107);
    /* padding:1rem; */
    display:grid;
    place-content:center;
}
    img{
        max-width:100%;
    }
  
</style>
