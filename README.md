# Netflix UI

## Summary

Netflix UI is a responsive single-page web application interface inspired by Netflix, built using React, TypeScript, and Vite.

### Features
- Dynamic hero landing view with movie poster carousels and detailed information modals.
- User authentication views including Sign In, Sign Up, and protected user dashboard routes.
- Multilingual interface localization powered by i18next and language selection dropdowns.
- Modern visual styling built with Tailwind CSS, Emotion, and Material UI components.

## How to Use

### Run Development Server
Start the local development server:
```bash
npm run dev
```

Navigate to `http://localhost:5173` in your web browser.

### Available Scripts
- `npm run dev`: Launch Vite local development server.
- `npm run build`: Type-check code and assemble production bundle.
- `npm run preview`: Serve the built production distribution locally.
- `npm run lint`: Run ESLint to verify code quality.
- `npm run format`: Format project files using Prettier.

## How to Build, Install, and Uninstall

### Install
Clone the repository and install required npm dependencies:
```bash
git clone https://github.com/user/netflix-ui.git
cd netflix-ui
npm install
```

### Build from Source
Execute the TypeScript build script:
```bash
npm run build
```

The compiled output will be generated in the `dist/` directory.

## License

This project is licensed under the [MIT License](LICENSE).
