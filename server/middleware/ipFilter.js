/**
 * Race Director Control Room IP Whitelist Filter Middleware
 */
export const ipFilter = (req, res, next) => {
  const allowedIps = (process.env.CONTROL_ROOM_IPS || '127.0.0.1,::1').split(',');
  const clientIp = req.ip || req.connection.remoteAddress;

  if (process.env.NODE_ENV === 'production' && !allowedIps.includes(clientIp)) {
    return res.status(403).json({ success: false, message: 'Access forbidden: Control room authorization required' });
  }

  next();
};

export default ipFilter;
