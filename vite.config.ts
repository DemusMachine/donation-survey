import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT for GitHub Pages: "base" must match your repo name.
// If your repo is github.com/yourname/donation-survey, keep it as below.
// If you rename the repo, update this to '/your-new-repo-name/'.
export default defineConfig({
  plugins: [react()],
  base: '/donation-survey/',
})
