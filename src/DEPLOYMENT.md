# Deployment Guide

## 🚀 Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy your event registration website.

### Prerequisites
- A GitHub account
- Your code pushed to a GitHub repository

### Steps

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: SSC 2019 Iftar Party website"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign up" and connect your GitHub account
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the settings
   - Click "Deploy"

3. **Done!** 🎉
   - Your site will be live in ~2 minutes
   - You'll get a URL like: `your-project.vercel.app`
   - You can add a custom domain later

### Auto-Deploy
- Every time you push to GitHub, Vercel automatically redeploys
- No manual deployment needed!

---

## 📦 Deploy to Netlify

### Steps

1. **Build your project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub
   - Click "Add new site → Import an existing project"
   - Connect to GitHub and select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Custom Domain (Optional)**
   - In Netlify dashboard, go to Domain Settings
   - Add your custom domain
   - Follow DNS configuration instructions

---

## 🌐 Deploy to GitHub Pages

### Steps

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages**
   - Go to your GitHub repository
   - Settings → Pages
   - Source: `gh-pages` branch
   - Your site will be live at the URL from step 2

---

## 🔧 Environment Variables

If you need environment variables (for API keys, etc.):

### Vercel
1. Go to your project settings
2. Environment Variables section
3. Add variables:
   - `VITE_GOOGLE_SCRIPT_URL`
   - etc.

### Netlify
1. Site settings → Environment variables
2. Add your variables

### Local Development
Create a `.env` file:
```
VITE_GOOGLE_SCRIPT_URL=your_url_here
```

Use in code:
```typescript
const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
```

---

## 📱 Custom Domain Setup

### Steps for any hosting provider:

1. **Buy a domain** (from Namecheap, GoDaddy, etc.)

2. **Configure DNS**
   - Add A record or CNAME record
   - Point to your hosting provider's servers
   - Wait 24-48 hours for DNS propagation

3. **Add domain in hosting dashboard**
   - Vercel: Project Settings → Domains
   - Netlify: Domain Settings → Custom domains

4. **Enable HTTPS**
   - Most providers auto-enable SSL certificates
   - Free with Let's Encrypt

---

## ✅ Pre-Deployment Checklist

Before deploying, make sure:

- ✅ Google Sheets integration is configured
- ✅ Payment numbers are correct
- ✅ Package prices are correct
- ✅ Contact information is updated
- ✅ All images load properly
- ✅ Mobile responsive design works
- ✅ Forms validate correctly
- ✅ Test registration works
- ✅ Success modal displays
- ✅ Counters update correctly

---

## 🧪 Testing on Mobile

After deployment, test on real devices:

1. **iOS Safari**
   - Form inputs
   - Payment section
   - Jersey size selection
   - Submit button

2. **Android Chrome**
   - Same tests as above
   - Smooth scrolling
   - Touch targets

3. **Common Issues**
   - Input fields too small → Add larger touch targets
   - Text too small → Increase font sizes
   - Images not loading → Check image URLs

---

## 📊 Monitor Your Site

### Google Analytics (Optional)

1. Create a Google Analytics account
2. Get your tracking ID
3. Add to your site:

```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Track Registrations
- Monitor form submissions
- Track conversion rates
- See visitor statistics

---

## 🔒 Security Best Practices

1. **Never expose API keys in frontend code**
   - Use environment variables
   - Use backend proxy for sensitive operations

2. **Validate data on both frontend and backend**
   - Client-side validation (done ✅)
   - Server-side validation in Google Apps Script

3. **Use HTTPS**
   - All modern hosts provide this free
   - Never deploy without SSL

4. **Rate Limiting**
   - Prevent spam submissions
   - Can be done in Google Apps Script

---

## 🆘 Common Deployment Issues

### Issue: Build fails
**Solution**: Check for TypeScript errors
```bash
npm run build
# Fix any errors shown
```

### Issue: Images not loading
**Solution**: 
- Check image paths are correct
- Use absolute URLs for external images
- Verify ImageWithFallback component works

### Issue: Form not submitting
**Solution**:
- Check Google Script URL is correct
- Verify CORS settings
- Check browser console for errors

### Issue: Styles look broken
**Solution**:
- Clear browser cache
- Check Tailwind CSS is building correctly
- Verify all CSS imports

---

## 🎯 Post-Deployment Tasks

1. **Share the Link**
   - Send to all batch members
   - Post on social media
   - Create QR code for easy access

2. **Monitor Registrations**
   - Check Google Sheet regularly
   - Verify payments
   - Contact registrants if needed

3. **Backup Data**
   - Download Google Sheet regularly
   - Keep payment records safe

4. **Update Information**
   - If event details change
   - Update and redeploy quickly

---

## 📞 Support

If you need help:
- Check browser console for errors
- Review Google Sheets setup guide
- Contact: ssc2019@example.com

**Happy Deploying! 🚀**

