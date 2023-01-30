<script lang="ts">
	import type { LayoutData, PageData } from './$types';
	export let data: LayoutData;
	$: ({ course } = data);
</script>

<main>
	<h1>{course.title}</h1>
	<p>{course.description}</p>

	{#if course.keywords}
		<ul>
			{#each course.keywords as keyword}
				<li>{keyword}</li>
			{/each}
		</ul>
	{/if}
</main>

<style>
	main {
		max-width: 640px;
		margin: auto;
		padding: 1rem;
	}
</style>
