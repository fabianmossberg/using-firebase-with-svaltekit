import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
export const load = (async ({ parent, params }) => {

    // The courses layout is fetching all the courses.
    const { courses } = await parent()

    // No need to hit the database again, just filter from the parent courses.
    const course = courses.find(course => course.id === params.courseId);

    // Here we could enrich the data with anything specific to the user who is requesting it.
    if (course) {
        // Do anything to the course
        return { course };
    }

    // If there is no course matching the id, throw a 404.
    throw error(404, 'Not found');
}) satisfies LayoutLoad;
