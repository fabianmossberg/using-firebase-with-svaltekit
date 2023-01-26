import { browser } from '$app/environment';
import type { ICourse } from '$lib/types';
import { getDocument } from '$lib/firebase';
import type { PageLoad } from './$types';
export const load = (async ({ params }) => {
  // Ugly hack using `browser` to avoid SSR errors. Should be handled
  // by creating a firebase instance that can be loaded in PageLoads
  // and PageRequests.
  const course = browser ? await getDocument<ICourse>(`courses/${params.courseId}`) : null;
  return { course };
}) satisfies PageLoad;
