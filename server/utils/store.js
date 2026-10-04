import { initialData } from '../seed/seedData.js';

// In-Memory dynamic dataset initialized with authentic AKR data
class DataStore {
  constructor() {
    this.driver = { ...initialData.driver };
    this.drivers = [...(initialData.drivers || [initialData.driver])];
    this.cars = [...initialData.cars];
    this.championships = [...initialData.championships];
    this.races = [...initialData.races];
    this.results = [...initialData.results];
    this.telemetry = { ...initialData.telemetry };
    this.news = [...initialData.news];
    this.stories = [...initialData.stories];
    this.media = [...initialData.media];
    this.team = [...initialData.team];
    this.partners = [...initialData.partners];
    this.experiences = [...initialData.experiences];
    this.products = [...initialData.products];
    this.orders = [];
    this.subscribers = [
      { email: 'vip@ajithkumarracing.com', subscribedAt: new Date().toISOString(), active: true },
      { email: 'motorsport@akr-racing.com', subscribedAt: new Date().toISOString(), active: true }
    ];
    this.messages = [
      {
        id: "msg-01",
        name: "Motorsport Federation India",
        email: "secretary@motorsport.in",
        phone: "+91 98400 12345",
        category: "Racing",
        message: "Congratulations on the Yas Marina victory! We would like to formally feature the AKR GT3 campaign in the annual awards gala.",
        status: "read",
        createdAt: "2026-02-10T14:30:00.000Z"
      }
    ];
    this.users = [
      {
        id: "usr-admin",
        name: "AKR Race Director",
        email: "admin@ajithkumarracing.com",
        passwordHash: "$2a$10$abcdefghijklmnopqrstuvwxyz1234567890", // placeholder hash for admin123
        role: "admin",
        createdAt: new Date().toISOString()
      }
    ];
  }

  // Helper getters & mutators
  get(collection) {
    return this[collection];
  }

  findById(collection, id) {
    if (collection === 'driver') {
      if (id && this.drivers) {
        const found = this.drivers.find(d => d.id === id);
        if (found) return found;
      }
      return this.driver;
    }
    if (collection === 'telemetry') return this.telemetry;
    const items = this[collection];
    if (!Array.isArray(items)) return null;
    return items.find(item => item.id === id || item._id === id || item.slug === id);
  }

  create(collection, data) {
    const newItem = {
      id: `${collection.slice(0, 4)}-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...data
    };
    if (Array.isArray(this[collection])) {
      this[collection].unshift(newItem);
    }
    return newItem;
  }

  update(collection, id, updates) {
    if (collection === 'driver') {
      this.driver = { ...this.driver, ...updates };
      return this.driver;
    }
    if (collection === 'telemetry') {
      this.telemetry = { ...this.telemetry, ...updates };
      return this.telemetry;
    }
    const items = this[collection];
    if (!Array.isArray(items)) return null;
    const index = items.findIndex(item => item.id === id || item._id === id || item.slug === id);
    if (index === -1) return null;
    items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
    return items[index];
  }

  delete(collection, id) {
    const items = this[collection];
    if (!Array.isArray(items)) return false;
    const index = items.findIndex(item => item.id === id || item._id === id || item.slug === id);
    if (index === -1) return false;
    items.splice(index, 1);
    return true;
  }
}

export const store = new DataStore();
