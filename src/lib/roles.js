export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  PASTOR: 'pastor',
  TREASURER: 'treasurer',
  CLERK: 'clerk',
  DEPARTMENT_LEADER: 'department_leader',
  MEMBER: 'member',
};

export const DEMO_USERS = [
  { id: 'usr_1', name: 'Elder James Nyandwaro', role: ROLES.SUPER_ADMIN, title: 'Super Admin & Elder' },
  { id: 'usr_2', name: 'Pastor Dr. Ezekiel Omwamba', role: ROLES.PASTOR, title: 'District Pastor' },
  { id: 'usr_3', name: 'Monicah Bonareri', role: ROLES.TREASURER, title: 'Church Treasurer' },
  { id: 'usr_4', name: 'David Ochieng', role: ROLES.CLERK, title: 'Church Clerk' },
  { id: 'usr_5', name: 'Sister Mary Otieno', role: ROLES.MEMBER, title: 'Congregation Member' },
];

export const MODULE_PERMISSIONS = {
  dashboard: [ROLES.SUPER_ADMIN, ROLES.PASTOR, ROLES.TREASURER, ROLES.CLERK],
  members: [ROLES.SUPER_ADMIN, ROLES.PASTOR, ROLES.CLERK],
  ministries: [ROLES.SUPER_ADMIN, ROLES.PASTOR, ROLES.DEPARTMENT_LEADER],
  attendance: [ROLES.SUPER_ADMIN, ROLES.CLERK, ROLES.PASTOR],
  events: [ROLES.SUPER_ADMIN, ROLES.PASTOR, ROLES.CLERK, ROLES.DEPARTMENT_LEADER],
  communication: [ROLES.SUPER_ADMIN, ROLES.PASTOR, ROLES.CLERK],
  finance: [ROLES.SUPER_ADMIN, ROLES.TREASURER, ROLES.PASTOR],
  'treasury-reports': [ROLES.SUPER_ADMIN, ROLES.TREASURER, ROLES.PASTOR],
  audit: [ROLES.SUPER_ADMIN],
  settings: [ROLES.SUPER_ADMIN],
};

export function canAccess(moduleName, role) {
  if (!role) return false;
  if (role === ROLES.SUPER_ADMIN) return true;
  const allowed = MODULE_PERMISSIONS[moduleName];
  return allowed ? allowed.includes(role) : false;
}

export function homeForRole(role) {
  if (role === ROLES.MEMBER) return '/portal';
  return '/admin';
}
