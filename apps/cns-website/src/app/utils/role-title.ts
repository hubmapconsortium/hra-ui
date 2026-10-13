import { AnyRole, StudentRole } from '../schemas/roles.schema';

/** Matches a degree at the start of a student topic, i.e. 'Ph.D. ', 'Masters ', or 'Master of ' */
const TOPIC_DEGREE_PREFIX = /^(ph\.?\s?d\.?|masters?(\s+of)?)\s+/i;

/** Matches 'Student' at the end of a student topic */
const TOPIC_STUDENT_SUFFIX = /(^|\s+)student$/i;

/**
 * Get the display title for a student role.
 * Topics often repeat the degree and the word 'Student', so both are removed from the topic.
 *
 * @param role Student role to get the title for
 * @returns The student's degree and topic, i.e. 'Ph.D. Student, Information Science'
 */
function getStudentTitle(role: StudentRole): string {
  const label = role.degree ? `${role.degree} Student` : 'Student';
  const topic = role.topic.trim().replace(TOPIC_DEGREE_PREFIX, '').replace(TOPIC_STUDENT_SUFFIX, '');
  return topic ? `${label}, ${topic}` : label;
}

/**
 * Get the display title for a role
 *
 * @param role Role to get the title for
 * @returns The role's display title, or an empty string if the role has none
 */
export function getRoleTitle(role: AnyRole): string {
  switch (role.type) {
    case 'collaborator':
      return `Collaborator - ${role.project}`;
    case 'member':
      return role.title || '';
    case 'student':
      return getStudentTitle(role);
  }
}
