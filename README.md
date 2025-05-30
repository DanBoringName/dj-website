# DJ Elliott Website

Personal website and portfolio showcasing my work as a DJ and developer. Visit the live site at [dj-elliott.com](https://dj-elliott.com/).

## 🚀 Quick Start

### Prerequisites

- [VS Code](https://code.visualstudio.com/)
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### Installation

#### Using DevContainer (Recommended)

1. Clone the repository:

```bash
git clone https://github.com/DanBoringName/dj-website.git
```

2. Open in VS Code:

```bash
code dj-website
```

3. When prompted "Reopen in Container" click yes, or:

   - Press `F1`
   - Type "Reopen in Container"
   - Select "Dev Containers: Reopen in Container"

4. Install dependencies (inside DevContainer):

```bash
npm install
```

5. Start the development server:

```bash
npm run dev
```

#### Manual Installation

If you prefer not to use DevContainer:

- Node.js (v18 or higher)
- npm

Then follow these steps:

```bash
git clone https://github.com/DanBoringName/dj-website.git
cd dj-website
npm install
npm run dev
```

The site will be available at `http://localhost:8080`

## 🛠️ Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 📦 Deployment

Deploy to production server:

```bash
./scripts/deploy.sh
```

## 🔧 Tech Stack

- React
- TypeScript
- Tailwind CSS
- Three.js
- Vite
- Docker

## 📝 License

[MIT](LICENSE)

## 👤 Contact

DJ Elliott - [Website](https://dj-elliott.com/)
