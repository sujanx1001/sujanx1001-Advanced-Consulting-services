# Deployment Guide

## Environment Variables for Production

### Heroku Config Variables
Set these in your Heroku dashboard or via CLI:

```bash
heroku config:set MONGODB_URI="mongodb+srv://acs-admin:YOUR_PASSWORD@cluster.mongodb.net/acs-platform?retryWrites=true&w=majority"
heroku config:set JWT_SECRET="your_production_jwt_secret_key_here"
heroku config:set JWT_EXPIRATION="7d"
heroku config:set NODE_ENV="production"
```

### MongoDB Atlas Connection String Format
```
mongodb+srv://acs-admin:YOUR_PASSWORD@cluster.mongodb.net/acs-platform?retryWrites=true&w=majority
```

Replace:
- `YOUR_PASSWORD` with the password you created for acs-admin user
- `cluster` with your actual cluster name

### JWT Secret
Generate a secure JWT secret for production:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Deployment Steps

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables (see above)
5. Deploy: `git push heroku main` 