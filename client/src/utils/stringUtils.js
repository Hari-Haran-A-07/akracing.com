/**
 * Motorsport String & Abbreviation Utilities
 */

export const getDriverAbbreviation = (fullName = 'Ajith Kumar') => {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 3).toUpperCase();
  return (parts[parts.length - 1].slice(0, 3)).toUpperCase();
};

export const formatCircuitSector = (sectorNum) => Sector \;

export default { getDriverAbbreviation, formatCircuitSector };
