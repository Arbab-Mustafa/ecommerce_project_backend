# 🔄 Backend CI/CD Setup Guide

## 📋 GitHub Secrets Required

Go to your GitHub repository: **Settings → Secrets and variables → Actions**

### Add These Secrets:

#### 1. DOCKER_HUB_TOKEN
```
Value: Your Docker Hub access token
How to get:
1. Go to https://hub.docker.com/settings/security
2. Click "New Access Token"
3. Name: "GitHub Actions Backend"
4. Copy the token
```

**That's it!** The workflow uses your Docker Hub username `arbabmustafa` which is hardcoded.

---

## 🚀 How It Works

### Triggers:
- ✅ Push to `master` branch
- ✅ Pull request to `master`
- ✅ Manual trigger (workflow_dispatch)

### Pipeline Steps:
1. **Checkout** - Get code from repository
2. **Setup Node.js** - Install Node.js 20
3. **Install** - Run `npm ci`
4. **Test** - Run tests (add yours)
5. **Build Docker** - Create multi-platform image
6. **Push** - Upload to Docker Hub
7. **Test Container** - Verify image works
8. **Deploy** - Ready for deployment

### Auto-Generated Tags:
- `latest` - Always points to latest master build
- `v1.0.X` - Version with build number (e.g., v1.0.45)
- `abc1234` - Git commit SHA (first 7 chars)

---

## 🧪 Test Locally

```bash
# Install GitHub CLI
# Then run workflow locally
gh workflow run ci-cd.yml
```

---

## 📊 View Pipeline

Go to: **Actions** tab in your GitHub repository

You'll see:
- ✅ Build status
- ✅ Test results
- ✅ Docker image tags
- ✅ Deployment status

---

## 🔒 Security

- ✅ Docker Hub token is encrypted by GitHub
- ✅ Multi-platform builds (AMD64 + ARM64)
- ✅ Build cache for faster builds
- ✅ Container testing before deployment

---

## 📦 Deployment

After successful build, deploy with:

```bash
docker pull arbabmustafa/forever-backend:latest
docker run -d --name backend -p 4000:4000 --env-file .env arbabmustafa/forever-backend:latest
```

---

**Updated:** Nov 2024

