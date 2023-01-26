# Firebase in SvelteKit

This repo is to demonstrate how FireBase can be used with Sveltekit.

## Setup

```
pnpm install    # Installs dependencies
pnpm run build  # Generate types
```

Create `.env`

Take your `firebaseConfig` and stringify it:

```js
JSON.stringify(firebaseConfig)
```

Put the output in the `PUBLIC_FIREBASE_CONFIG` variable in `.env`.

### If you want to use emulator



If you want to run [the emulator](https://firebase.google.com/docs/emulator-suite), set `PUBLIC_FIREBASE_USE_EMULATOR` to `true`.

The `FIRESTORE_EMULATOR_HOST` variable is automatically read by `firebase-admin`. I don't use it here yet, but for it to work if added, it needs this variable.


```
# .env
PUBLIC_FIREBASE_USE_EMULATOR=true
FIRESTORE_EMULATOR_HOST="127.0.0.1:8080"
PUBLIC_FIREBASE_CONFIG={Stringified object with your firebaseConfig}
```

To start the emulator:

```bash
firebase emulators:start --only firestore --import ./folder-you-want-to-import
```


This setup wants you to have a collection of `courses` with the following attributes:

```ts
export interface ICourse {
    title: string;
    id: string;
    description: string;
    keywords: string[];
    thumbSvgUrl: string;
    heroSvgUrl: string;
    heroImageBaseUrl: string;
  }
```

Then, start the project with:

```bash
pnpm run dev
```


## Stuff

Some code borrowed from [SvelteFireTS](https://github.com/jacob-8/sveltefirets).

## Todo

- [ ] Modify to allow SSR, with security
- [ ] Add Firebase Auth example
  - [ ] Custom claims
  - [ ] SSR
- [ ] Add cached endpoint for JSON to use for prefilled data for SSR
- [ ] Add examples of firebase rules