# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within the AKR Motorsport Platform, please report it responsibly.

### How to Report

1. **Email:** Send a detailed report to security@ajithkumarracing.com
2. **Subject:** Use the format: `[SECURITY] Brief description`
3. **Include:**
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact assessment
   - Any suggested fixes (optional)

### Response Timeline

- **Acknowledgment:** Within 48 hours
- **Initial Assessment:** Within 5 business days
- **Resolution Target:** Within 30 days for critical issues

### Scope

The following are in scope:
- Authentication & authorization bypasses
- Data exposure vulnerabilities
- Server-side injection attacks
- Cross-site scripting (XSS) in the frontend
- API rate limiting bypasses

### Out of Scope

- Social engineering attacks
- Denial of service (DoS) attacks
- Issues in third-party dependencies (report upstream)

## Security Best Practices

- Never commit secrets or API keys to the repository
- Use environment variables for all sensitive configuration
- Keep dependencies up to date with `npm audit`
- Always use HTTPS in production
