// Date and time utility functions for AKR platform

export const formatRaceDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatRaceTime = (date) => {
  const d = new Date(date);
  return d.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });
};

export const isUpcoming = (date) => new Date(date) > new Date();
export const isPast = (date) => new Date(date) < new Date();

export const getTimeDelta = (targetDate) => {
  const now = new Date();
  const target = new Date(targetDate);
  const diff = target - now;

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, passed: true };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    passed: false,
  };
};

export const getRaceWeekend = (raceDate) => {
  const d = new Date(raceDate);
  const friday = new Date(d);
  friday.setDate(d.getDate() - (d.getDay() + 2) % 7);
  const sunday = new Date(friday);
  sunday.setDate(friday.getDate() + 2);
  return { practice: friday, qualifying: new Date(friday.getTime() + 86400000), race: sunday };
};
