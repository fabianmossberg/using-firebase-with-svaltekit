<script lang="ts">
	import type { LayoutData } from './$types';
	export let data: LayoutData;
	$: ({ courses } = data);
</script>
<ul>
	{#each courses as course}
		<div>
			<h1><a href="/courses/{course.id}">{course.title}</a></h1>
			<p>{course.description}</p>
		</div>
		<hr />
	{/each}
</ul>
