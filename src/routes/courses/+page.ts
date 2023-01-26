import { browser } from '$app/environment';
import { getCollection } from '$lib/firebase';
import type { ICourse } from '$lib/types';
import type { PageLoad } from './$types';
export const load = (async () => {
  const courses = browser ? await getCollection<ICourse>(`courses`) : <ICourse[]>[];
  return { courses };
}) satisfies PageLoad;
