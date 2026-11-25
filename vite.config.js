import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Actions sets GITHUB_REPOSITORY="username/repository" automatically.
// The project URL then works even if you rename the repository.
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const base = repositoryName && !repositoryName.endsWith('.github.io')
  ? `/${repositoryName}/`
  : '/';

export default defineConfig({ plugins: [react()], base: '/B-website' });
