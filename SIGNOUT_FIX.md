# 🔐 Sign-Out Fix - Cognito Configuration

## Problem
Getting a 400 error when signing out and being redirected to Cognito login page instead of the dashboard.

## Solution Applied

### 1. ✅ Updated AccountPage.js
Enhanced the `handleSignOut` function to:
- Clear stored user data (savedJobs and auth tokens)
- Explicitly pass `post_logout_redirect_uri` to the sign-out request
- Add fallback redirect if sign-out fails

### 2. ✅ Updated index.js
Added `onSignoutCallback` to handle successful sign-out:
- Clears local storage
- Redirects to home page (`http://localhost:3000`)

---

## Required Cognito Configuration

The 400 error typically occurs because the post-logout redirect URI isn't configured in your AWS Cognito app client. Follow these steps:

### Step 1: Open AWS Cognito Console
1. Go to AWS Cognito console: https://console.aws.amazon.com/cognito/
2. Select your user pool: **us-east-1_yRZLjI1lK**
3. Click "App integration" → "App clients and analytics"

### Step 2: Edit Your App Client
1. Click on app client: **1hj5ncp9olo3kdpi5t5bjshjgb**
2. Scroll to "App client settings"
3. Click "Edit app client"

### Step 3: Configure Sign-Out URLs
Find the section: **"Sign out URLs (optional)"**

Add these redirect URIs:
```
http://localhost:3000
http://localhost:3000/
```

(If deploying to production, also add your production URL)

### Step 4: Save Changes
- Click "Save app client changes"
- Click "Save"

---

## Testing the Fix

1. **Sign In**: Log in to your app normally
2. **Navigate to Account**: Click the "Account" button
3. **Go to Settings Tab**: Click on "Settings"
4. **Click Sign Out**: The button should now:
   - Clear your session
   - Redirect to `http://localhost:3000` (the landing page)
   - Show you as unauthenticated

✅ **Expected Result**: You should see the LandingPage with the "Sign In" button available.

---

## What Was Changed

### AccountPage.js
```javascript
// BEFORE:
const handleSignOut = () => {
  auth.signoutRedirect();
};

// AFTER:
const handleSignOut = () => {
  // Clear any stored data
  localStorage.removeItem('savedJobs');
  localStorage.removeItem('oidc.user:https://cognito-idp.us-east-1.amazonaws.com/us-east-1_yRZLjI1lK:1hj5ncp9olo3kdpi5t5bjshjgb');
  
  // Sign out and redirect
  auth.signoutRedirect({
    post_logout_redirect_uri: "http://localhost:3000"
  }).catch(() => {
    // If redirect fails, manually redirect to home
    window.location.href = "http://localhost:3000";
  });
};
```

### index.js
```javascript
// ADDED onSignoutCallback:
onSignoutCallback: () => {
  // Clear any stored auth-related data
  localStorage.removeItem('savedJobs');
  window.location.href = "http://localhost:3000";
},
```

---

## Troubleshooting

### If you still get 400 error:
1. **Clear browser cache**: Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
2. **Clear localStorage**: Open DevTools (F12) → Application → Clear storage
3. **Verify Cognito settings**: Double-check the post-logout redirect URI is configured
4. **Check app client ID**: Verify it matches: `1hj5ncp9olo3kdpi5t5bjshjgb`

### If redirect goes to wrong page:
- Check that `post_logout_redirect_uri` in index.js matches your Cognito app client settings
- For production, use your actual domain instead of `localhost:3000`

### If page still shows user as logged in:
- This might be a browser cache issue
- Clear localStorage: `localStorage.clear()`
- Close and reopen the browser

---

## Code Changes Summary

| File | Change | Purpose |
|------|--------|---------|
| `src/AccountPage.js` | Enhanced `handleSignOut()` | Add explicit redirect URI and error handling |
| `src/index.js` | Added `onSignoutCallback()` | Handle successful sign-out and redirect |

---

## Next Steps

1. ✅ Code updated locally (no errors)
2. ⏭️ Configure post-logout redirect URI in AWS Cognito console (see Step 1-4 above)
3. ⏭️ Test by signing out
4. ✅ Should redirect to dashboard successfully

---

**Status**: ✅ Code updated, awaiting Cognito configuration
**Action Required**: Follow Step 1-4 in the Cognito console to configure post-logout redirect URIs

