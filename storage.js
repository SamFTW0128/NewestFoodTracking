// storage.js

(function (global) {
  const LS_KEY = 'demo_food_app_v1';

  // Low-level: read raw JSON from localStorage
  function readRaw() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.error('storage.js readRaw parse error', e);
      return null;
    }
  }

  // Ensure we always have a valid, normalised state object
  function ensureState() {
    let s = readRaw();
    // If nothing stored yet, create a fresh initial state
    if (!s) {
      s = {
        users: {
          customers: [],
          restaurants: [],
          riders: [],
          admins: [{
            id: '001',
            name: 'Admin',
            password: '001',
            role: 'admin'
          }]
        },
        orders: [],
        reviews: [],
        currentUser: null,
        cart: {
          restaurantId: null,
          items: [] // { dishId, dishName, price, quantity, imageUrl }
        },
        meta: {
          createdAt: Date.now()
        }
      };
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(s));
      } catch (e) {
        console.error('storage.js initial save failed', e);
      }
    }
    return s;
  }

  // Write state back to localStorage
  function saveState(state) {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('storage.js saveState failed', e);
    }
  }

  // Public API
  global.storage = {
    getState: ensureState,
    saveState: saveState,
    clearAll: () => {
      localStorage.removeItem(LS_KEY);
    }
  };

})(window);
