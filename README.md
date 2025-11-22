# Campus OS

Campus OS is a monorepo containing both backend and frontend applications for a modern campus management system. It is organized for scalable development using Node.js, NestJS, React, and Vite.

## Project Structure

```
campus-os/
├── campus-os-backend/   # NestJS backend API
│   ├── src/
│   ├── test/
│   ├── package.json
│   └── ...
├── campus-os-frontend/  # React + Vite frontend app
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── package.json         # Monorepo root
└── ...
```

## Backend (NestJS)
- Located in `campus-os-backend/`
- Provides RESTful APIs and business logic
- Technologies: NestJS, TypeScript

### Setup
```fish
cd campus-os-backend
pnpm install
pnpm run start:dev
```

## Frontend (React + Vite)
- Located in `campus-os-frontend/`
- Provides the user interface for campus management
- Technologies: React, Vite, TypeScript

### Setup
```fish
cd campus-os-frontend
pnpm install
pnpm run dev
```

## Development
- Use [pnpm](https://pnpm.io/) for package management
- Each app has its own dependencies and scripts
- Environment variables should be set in `.env` files (see `.gitignore`)

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## License
MIT
