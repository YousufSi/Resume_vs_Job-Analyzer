# Security Notes

This document explains the security decisions made in deploying this project to AWS.

## API Key Management
- The Gemini API key is never committed to source control. `.env` is excluded via `.gitignore`.
- On the deployed server, the key is stored in a local `.env` file loaded at runtime via `dotenv`, not hardcoded in source.

## Network Security (AWS Security Groups)
- SSH (port 22) is restricted to a single trusted IP address, not open to the internet.
- HTTP (port 80) and the app port (3000) are the only other open ports, limiting the server's attack surface to what's strictly necessary for the app to function.

## Least-Privilege Principle
- The EC2 instance runs with only the permissions needed to serve this application — no unnecessary IAM roles or broad permissions attached.

## Future Improvements
- Migrate the API key from a local `.env` file to AWS Secrets Manager, retrieved at runtime via an IAM role scoped to only that one secret's ARN.
- Add HTTPS via a reverse proxy (Nginx) and a free TLS certificate (Let's Encrypt).
- Add rate limiting on the `/api/analyze` endpoint to prevent abuse of the Gemini API quota.
