import { INITIAL_MEMBERS, INITIAL_MINISTRIES, INITIAL_TRANSACTIONS, INITIAL_ANNOUNCEMENTS } from './seedData';

function getStore(key, initial) {
  try {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
  } catch (e) {}
  localStorage.setItem(key, JSON.stringify(initial));
  return initial;
}

function setStore(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export const db = {
  members: {
    async list() { return { items: getStore('cmp_members', INITIAL_MEMBERS) }; },
    async create(item) {
      const items = getStore('cmp_members', INITIAL_MEMBERS);
      const newItem = { id: `mem_${Date.now()}`, ...item };
      items.unshift(newItem);
      setStore('cmp_members', items);
      return newItem;
    },
    async delete(id) {
      let items = getStore('cmp_members', INITIAL_MEMBERS);
      items = items.filter(i => i.id !== id);
      setStore('cmp_members', items);
      return true;
    }
  },
  ministries: {
    async list() { return { items: getStore('cmp_ministries', INITIAL_MINISTRIES) }; },
    async create(item) {
      const items = getStore('cmp_ministries', INITIAL_MINISTRIES);
      const newItem = { id: `min_${Date.now()}`, ...item };
      items.unshift(newItem);
      setStore('cmp_ministries', items);
      return newItem;
    }
  },
  transactions: {
    async list() { return { items: getStore('cmp_transactions', INITIAL_TRANSACTIONS) }; },
    async create(item) {
      const items = getStore('cmp_transactions', INITIAL_TRANSACTIONS);
      const newItem = { id: `tx_${Date.now()}`, ...item };
      items.unshift(newItem);
      setStore('cmp_transactions', items);
      return newItem;
    }
  },
  announcements: {
    async list() { return { items: getStore('cmp_announcements', INITIAL_ANNOUNCEMENTS) }; },
    async create(item) {
      const items = getStore('cmp_announcements', INITIAL_ANNOUNCEMENTS);
      const newItem = { id: `ann_${Date.now()}`, ...item };
      items.unshift(newItem);
      setStore('cmp_announcements', items);
      return newItem;
    }
  }
};
