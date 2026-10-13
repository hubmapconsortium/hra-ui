import { StudentRole } from '../schemas/roles.schema';
import { getRoleTitle } from './role-title';

describe('getRoleTitle()', () => {
  function createStudentRole(topic: string, degree: StudentRole['degree'] = 'Ph.D.'): StudentRole {
    return { type: 'student', topic, degree, department: 'Informatics', dateStart: new Date(2020, 0, 1) };
  }

  it('should return the title of a member role', () => {
    expect(getRoleTitle({ type: 'member', title: 'Research Scientist', dateStart: new Date(2020, 0, 1) })).toBe(
      'Research Scientist',
    );
  });

  it('should return the project of a collaborator role', () => {
    expect(getRoleTitle({ type: 'collaborator', project: 'HuBMAP', dateStart: new Date(2020, 0, 1) })).toBe(
      'Collaborator - HuBMAP',
    );
  });

  it('should format a student role as degree and topic', () => {
    expect(getRoleTitle(createStudentRole('Data Visualization'))).toBe('Ph.D. Student, Data Visualization');
    expect(getRoleTitle(createStudentRole('Web Game', 'Masters'))).toBe('Masters Student, Web Game');
  });

  it('should remove a repeated degree and student label from the topic', () => {
    expect(getRoleTitle(createStudentRole('Ph.D. Information Science Student'))).toBe(
      'Ph.D. Student, Information Science',
    );
    expect(getRoleTitle(createStudentRole('Ph.D Computer Engineering'))).toBe('Ph.D. Student, Computer Engineering');
    expect(getRoleTitle(createStudentRole('Master of Library Science Student', 'Masters'))).toBe(
      'Masters Student, Library Science',
    );
  });

  it('should omit missing degrees and topics', () => {
    expect(getRoleTitle(createStudentRole('Augmented Reality', null))).toBe('Student, Augmented Reality');
    expect(getRoleTitle(createStudentRole('Ph.D. Student'))).toBe('Ph.D. Student');
  });
});
