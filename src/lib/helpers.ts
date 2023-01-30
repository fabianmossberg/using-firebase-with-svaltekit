import type { ICourse } from '$lib/types';
import { getCollection, getDocument } from '$lib/firebase';
import { where } from 'firebase/firestore';

// Returns an array of courses.
export const getCourses = async () => {
    // We need to filter out unpublished courses, so that the snapshots works.
    return await getCollection<ICourse>(`courses`, [ where('published', '==', true) ] );
}

// Returns a single course.
export const getCourse = async (id: string) => {
    // TODO: Should there be a check for unpublished courses?
    return await getDocument<ICourse>(`courses/${id}`)
}