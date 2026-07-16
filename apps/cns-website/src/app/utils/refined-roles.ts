import { AnyRole } from '../schemas/roles.schema';

/** Refined role types */
export enum RefinedRoleType {
  Collaborator = 'collaborator',
  MasterStudent = 'masterStudent',
  PhDStudent = 'phdStudent',
  Staff = 'staff',
  Student = 'student',
}

/** Refined role types along with their labels */
export const REFINED_ROLE_TYPE_OPTIONS: { id: RefinedRoleType; label: string }[] = [
  { id: RefinedRoleType.Collaborator, label: 'Collaborator' },
  { id: RefinedRoleType.MasterStudent, label: 'Masters student' },
  { id: RefinedRoleType.PhDStudent, label: 'PhD student' },
  { id: RefinedRoleType.Staff, label: 'Staff' },
  { id: RefinedRoleType.Student, label: 'Student' },
];

/**
 * Derives a refined role type from a given role based on its type and degree (if applicable)
 *
 * @param role The role to refine
 * @returns The refined role type
 */
export function refineRoleType(role: AnyRole): RefinedRoleType {
  switch (role.type) {
    case 'collaborator':
      return RefinedRoleType.Collaborator;
    case 'student':
      if (role.degree === 'Ph.D.') {
        return RefinedRoleType.PhDStudent;
      } else if (role.degree === 'Masters') {
        return RefinedRoleType.MasterStudent;
      }
      return RefinedRoleType.Student;
    case 'member':
      return RefinedRoleType.Staff;
  }
}

/**
 * Gets the display label for a given refined role type
 *
 * @param type Role type
 * @returns The display label for the role type
 */
export function getRefinedRoleTypeLabel(type: RefinedRoleType): string {
  const option = REFINED_ROLE_TYPE_OPTIONS.find((opt) => opt.id === type);
  return option?.label ?? '';
}
