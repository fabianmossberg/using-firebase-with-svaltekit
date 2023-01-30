<script lang="ts">
	import type { LayoutData } from './$types';
	export let data: LayoutData;
	$: ({ course } = data);
</script>

<a href="/courses/{course.id}">{course.title}</a>
<slot />
