// Application-wide constants for AKR Motorsport Platform

export const APP_NAME = 'Ajith Kumar Racing';
export const APP_VERSION = '1.0.0';
export const APP_ABBREVIATION = 'AKR';

// API Configuration
export const API_PREFIX = '/api';
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// Racing Categories
export const RACE_CATEGORIES = [
  'GT3',
  'GT4',
  'Formula',
  'Endurance',
  'Sprint',
  'Rally',
  '24H Series',
];

// Race Statuses
export const RACE_STATUS = {
  UPCOMING: 'upcoming',
  LIVE: 'live',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  POSTPONED: 'postponed',
};

// Order Statuses
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// Media Types
export const MEDIA_TYPES = ['photo', 'video', 'gallery', 'documentary', '360-view'];

// Car Specifications Units
export const SPEC_UNITS = {
  POWER: 'BHP',
  TORQUE: 'Nm',
  WEIGHT: 'kg',
  SPEED: 'km/h',
  ACCELERATION: 's (0-100)',
  DISPLACEMENT: 'L',
};
