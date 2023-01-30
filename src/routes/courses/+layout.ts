import { getCourses } from '$lib/helpers'
import type { LayoutLoad } from './$types';
export const load = (async () => {
  const courses = await getCourses();
  return { courses };
}) satisfies LayoutLoad;