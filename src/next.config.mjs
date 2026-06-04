import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  // Disable Pages Router to avoid _document conflict
  useFileSystemPublicRoutes: true,
  skipTrailingSlashRedirect: true,
}

export default nextConfig
