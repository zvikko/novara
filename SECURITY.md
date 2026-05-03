# Security Rules Before Publishing

Use these checks before pushing showcase content to GitHub.

## Never publish

- Database passwords and API keys
- Full production config files
- Private keys and server access details
- Real client or patient data dumps

## Always do

- Use demo or scrubbed sample data
- Keep secrets in private environment files
- Remove internal hostnames and private IPs
- Review git history for accidental secret commits

## Quick keyword scan

Search your code for:

password
secret
token
api_key
authorization
private_key
