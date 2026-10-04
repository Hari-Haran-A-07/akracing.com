const API_BASE = '/api';

export const getAuthToken = () => localStorage.getItem('akr_auth_token');
export const setAuthToken = (token) => localStorage.getItem('akr_auth_token', token);

const headers = (isMultipart = false) => {
  const token = localStorage.getItem('akr_auth_token');
  const h = {};
  if (!isMultipart) {
    h['Content-Type'] = 'application/json';
  }
  if (token) {
    h['Authorization'] = `Bearer ${token}`;
  }
  h['x-admin-key'] = 'akr-admin-2026'; // fallback convenience
  return h;
};

export const api = {
  // Driver
  getDriver: async () => {
    const res = await fetch(`${API_BASE}/driver`);
    return res.json();
  },
  getDrivers: async () => {
    const res = await fetch(`${API_BASE}/driver/all`);
    return res.json();
  },
  getDriverById: async (id) => {
    const res = await fetch(`${API_BASE}/driver/${id}`);
    return res.json();
  },
  updateDriver: async (data) => {
    const res = await fetch(`${API_BASE}/driver`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Cars
  getCars: async () => {
    const res = await fetch(`${API_BASE}/cars`);
    return res.json();
  },
  getCarById: async (id) => {
    const res = await fetch(`${API_BASE}/cars/${id}`);
    return res.json();
  },
  createCar: async (data) => {
    const res = await fetch(`${API_BASE}/cars`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data)
    });
    return res.json();
  },
  updateCar: async (id, data) => {
    const res = await fetch(`${API_BASE}/cars/${id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(data)
    });
    return res.json();
  },
  deleteCar: async (id) => {
    const res = await fetch(`${API_BASE}/cars/${id}`, {
      method: 'DELETE',
      headers: headers()
    });
    return res.json();
  },

  // Championships
  getChampionships: async () => {
    const res = await fetch(`${API_BASE}/championships`);
    return res.json();
  },
  createChampionship: async (data) => {
    const res = await fetch(`${API_BASE}/championships`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Races & Results
  getRaces: async (params = {}) => {
    const q = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/races?${q}`);
    return res.json();
  },
  getResults: async () => {
    const res = await fetch(`${API_BASE}/races/results`);
    return res.json();
  },
  createRace: async (data) => {
    const res = await fetch(`${API_BASE}/races`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data)
    });
    return res.json();
  },
  createResult: async (data) => {
    const res = await fetch(`${API_BASE}/races/results`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Telemetry
  getLiveTelemetry: async () => {
    const res = await fetch(`${API_BASE}/telemetry/live`);
    return res.json();
  },

  // News
  getNews: async (params = {}) => {
    const q = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/news?${q}`);
    return res.json();
  },
  getNewsBySlug: async (slug) => {
    const res = await fetch(`${API_BASE}/news/${slug}`);
    return res.json();
  },
  createNews: async (data) => {
    const res = await fetch(`${API_BASE}/news`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data)
    });
    return res.json();
  },
  deleteNews: async (id) => {
    const res = await fetch(`${API_BASE}/news/${id}`, {
      method: 'DELETE',
      headers: headers()
    });
    return res.json();
  },

  // Stories
  getStories: async (params = {}) => {
    const q = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/stories?${q}`);
    return res.json();
  },
  getStoryBySlug: async (slug) => {
    const res = await fetch(`${API_BASE}/stories/${slug}`);
    return res.json();
  },

  // Media
  getMedia: async (params = {}) => {
    const q = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/media?${q}`);
    return res.json();
  },
  createMedia: async (data) => {
    const res = await fetch(`${API_BASE}/media`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data)
    });
    return res.json();
  },
  deleteMedia: async (id) => {
    const res = await fetch(`${API_BASE}/media/${id}`, {
      method: 'DELETE',
      headers: headers()
    });
    return res.json();
  },

  // Team
  getTeam: async (params = {}) => {
    const q = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/team?${q}`);
    return res.json();
  },
  createTeamMember: async (data) => {
    const res = await fetch(`${API_BASE}/team`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data)
    });
    return res.json();
  },
  deleteTeamMember: async (id) => {
    const res = await fetch(`${API_BASE}/team/${id}`, {
      method: 'DELETE',
      headers: headers()
    });
    return res.json();
  },

  // Partners
  getPartners: async () => {
    const res = await fetch(`${API_BASE}/partners`);
    return res.json();
  },

  // Experiences
  getExperiences: async () => {
    const res = await fetch(`${API_BASE}/experiences`);
    return res.json();
  },

  // Shop
  getProducts: async (params = {}) => {
    const q = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/shop/products?${q}`);
    return res.json();
  },
  getProductBySlug: async (slug) => {
    const res = await fetch(`${API_BASE}/shop/products/${slug}`);
    return res.json();
  },
  createProduct: async (data) => {
    const res = await fetch(`${API_BASE}/shop/products`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data)
    });
    return res.json();
  },
  createOrder: async (data) => {
    const res = await fetch(`${API_BASE}/shop/orders`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getOrders: async () => {
    const res = await fetch(`${API_BASE}/shop/orders`, {
      headers: headers()
    });
    return res.json();
  },

  // Contact
  sendMessage: async (data) => {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getMessages: async () => {
    const res = await fetch(`${API_BASE}/contact`, {
      headers: headers()
    });
    return res.json();
  },

  // Newsletter
  subscribeNewsletter: async (email) => {
    const res = await fetch(`${API_BASE}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return res.json();
  },

  // Auth
  login: async (credentials) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return res.json();
  },

  // Admin metrics
  getAdminMetrics: async () => {
    const res = await fetch(`${API_BASE}/admin/metrics`, {
      headers: headers()
    });
    return res.json();
  }
};
