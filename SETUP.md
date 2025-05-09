## 🔄 Quick Cleanup: `node_modules` & `package-lock.json` (Expo)

If your Expo app is already started and you need to reset dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

Then restart the Expo server:

```bash
npx expo start -c
```

This clears corrupted installs and resets the cache for a clean start.
