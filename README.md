# DJ Console – Lit Web App

This project is a DJ console web application built using [Lit 3](https://lit.dev/) and scaffolded with [`create-lit`](https://www.npmjs.com/package/create-lit).
It includes two versions of the application:

- **Final version**: available at `index.html`
- **Base version**: available at `base.html`, representing a starting point of the project

## Technologies Used

- [Node.js 20](https://nodejs.org/)
- [Lit 3](https://lit.dev/)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

## Project Structure

```plaintext
/public
  ├── ...             # Assets, fonts

index.html            # Final version of the DJ console
base.html             # Initial version of the console

/src
  └── ...             # Lit components and related code

package.json
...
```

## Getting Started

1. Make sure you have **Node.js v20** installed.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The app will be served at `http://localhost:5173` by default.

## Notes

- There are currently **no tests**.
