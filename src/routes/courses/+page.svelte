<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	$: ({ courses } = data);
</script>

<h1 class="capitalize">Courses</h1>
<ul>
	{#each courses as course}
		<div>
			<h1><a href="/courses/{course.id}">{course.title}</a></h1>
			<p>{course.description}</p>
		</div>
	{/each}
</ul>
