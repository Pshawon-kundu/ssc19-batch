# ⚠ ACTION REQUIRED: Redeploy Backend

I have updated the backend to use `FormData`, which guarantees compatibility with Google Apps Script and fixes the CORS/data saving issues.

**You MUST redeploy your script for this to work.**

## Steps to Redeploy

1.  Go to [script.google.com](https://script.google.com/home) and open your project.
2.  **Verify Code**: Ensure `Code.gs` contains the new `doPost(e)` function (lines 116+) that uses `const data = e.parameter;`.
3.  Click **Deploy** -> **Manage deployments**.
4.  Select your existing "Web App" deployment.
5.  Click the **Pencil Icon** (Edit).
6.  **Version**: Select **New version**. (Crucial!)
7.  Click **Deploy**.
8.  **Copy the URL** (it might look the same, but the internal version is updated).
    - If the URL changed, update `src/config.ts`.
    - If strictly using "Manage deployments" -> "New version", the URL often stays the same, which is good.

## Test the Fix

1.  Restart your React start if needed:
    ```bash
    npm run dev
    ```
2.  Submit the registration form.
3.  Check your Google Sheet. You should see the data immediately!
