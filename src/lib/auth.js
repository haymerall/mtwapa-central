import { DEMO_USERS, ROLES } from './roles';

const SESSION_KEY = 'cmp_demo_session';

export const auth = {
  me() {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    const defaultUser = DEMO_USERS[0];
    localStorage.setItem(SESSION_KEY, JSON.stringify(defaultUser));
    return defaultUser;
  },
  loginAs(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return user;
  },
  logout() {
    localStorage.removeItem(SESSION_KEY);
  }
};
