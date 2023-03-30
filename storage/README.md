Useful browser storage functions:

### Local storage
```typescript
import { localStorage } from '@zoppa/storage/localStorage';

// You will get result as an plain object

// Set any type of value to localStorage
localStorage.set(key: string, value: any)
// Get value from local storage by key
localStorage.get(key: string)
// Update value in local storage: if value is an Array it will be pushed to existsing array or create new, if value is an Object, it will be merged 2 object in one
localStorage.update(key: string, value: any) 
localStorage.update('anyKey', { data: 'data' }) // { data: 'data', oldData: 'oldData' }
```
### Cookies;
```typescript
  import { initializeCookieStore, cookies } from '@zoppa/storage/cookie';
// First, you need to initialize cookies
initializeCookieStore(cookies: string) // Pass here cookie string

// Then you fell free to use cookies as you want
// You will get result as an plain object

// Get cookie
cookies.get(key: string)
// Set cookie
cookies.set(name: string, value: string, days?: number)
// Get all cookies
cookies.getAll()
// Erase cookie
cookies.erase(name: string) 
```

