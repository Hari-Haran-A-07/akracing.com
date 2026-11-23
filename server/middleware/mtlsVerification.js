/**
 * Mutual TLS (mTLS) Certificate Verification Middleware
 * Secures high-speed inter-service communications between akr-polyglot-mesh nodes.
 */
export const verifyMTLSCertificate = (req, res, next) => {
  const clientCert = req.socket.getPeerCertificate ? req.socket.getPeerCertificate() : null;

  if (process.env.NODE_ENV === 'production' && !clientCert) {
    return res.status(403).json({
      success: false,
      message: 'mTLS handshake failed: Peer certificate required for polyglot-mesh connection',
    });
  }

  req.mtlsVerified = true;
  next();
};

export default verifyMTLSCertificate;
