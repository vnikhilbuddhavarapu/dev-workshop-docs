# Peer Point User Group Workshop

Welcome to the Peer Point User Group Developer Workshop!  
Click on the links in the sidebar to jump between **Prerequisites** and the four applications.

---

## Prerequisites

Welcome! Before we dive into building apps, let’s make sure everyone is set up and ready.

---

### 1. Cloudflare Account

- If you don’t already have one, [sign up for a free Cloudflare account](https://dash.cloudflare.com/sign-up).
- If you already have an account, you can skip this step.

---

### 2. Accept Your Cloudflare Lab Invite

Everyone has been provided a **Cloudflare Lab** environment for the workshop.  

Check your email for the invite and make sure to **accept it**. (Don’t worry, it only takes a minute!)

- Once accepted, log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).

---

### 3. Verify Your Accounts

After logging in, you should see at least **two accounts** in the top-left account switcher:

- **Personal Account** (your own)
- **Lab Account** (for this workshop)

Lab accounts are named: `<First Last> - Peer Point User Group - <unique-slug>`

Each Lab environment also comes with its own enterprise domain:
`<unique-slug>.sxplab.com`

We’ll use this domain later when connecting custom domains to your apps.

---

### 4. Install Node.js & npm

If you plan to build an app **from scratch**, you’ll need Node.js and npm:

- [Download Node.js for Windows](https://nodejs.org/en/download/prebuilt-installer)
- [Download Node.js for macOS](https://nodejs.org/en/download/prebuilt-installer)

---

### 5. Code Editor

Pick your favorite editor. Any of these will work great:

- [Visual Studio Code](https://code.visualstudio.com/)
- [Cursor](https://cursor.sh/)
- Vim (already built into most systems)

---

### 6. Install Wrangler CLI

Wrangler is Cloudflare’s CLI tool for deploying to Workers.

Run this command to install globally:

```bash
npm install -g wrangler
```

### 7. Github Account

This is required for *One-Click Deploys*.

- If you don’t already have one, [sign up for a free Github account](https://github.com/join).
- If you already have an account, you can skip this step.

### 8. Git

You’ll need **Git** for cloning repositories and setting up CI/CD pipelines.

- [Download Git for Windows](https://git-scm.com/download/win)
- [Download Git for macOS](https://git-scm.com/download/mac)

After installation, verify it works:

```bash
git --version
```
---


## App 1: Next.js Blog Starter App (with OpenNext.js Adapter)

This app is a **static site generator (SSG) blog** built with [Next.js](https://nextjs.org/) and [MDX](https://mdxjs.com/).  

It uses the [OpenNext.js adapter](https://opennext.js.org/cloudflare) to run **Next.js apps on Cloudflare Workers**.

---

### Two ways to get started

---

#### **Option 1: Clone the GitHub Repository**

Run these commands:

- Clone the starter repo into the current folder
```bash
git clone https://github.com/vnikhilbuddhavarapu/nextjs-blog-starter.git .
```

- Install dependencies
```bash
npm install
```

- Start the local Next.js dev server (http://localhost:3000)
```bash
npm run dev
```

- Preview in a local Cloudflare Worker environment (http://localhost:8787)
```bash
npm run preview
```

- Deploy to production (https://<project-name>.<unique-slug>.sxplab.com)
```bash
npm run deploy
```

### Customizing Blog Content

- Edit blog posts inside the /_posts directory

- Use your favorite AI tools or editors to generate Markdown content for the exercise

- Add images inside:

```
/public/assets/blog/<blog-folder-name>/cover.jpg
```

After editing, preview again:

```
npm run preview
```

And redeploy:

```
npm run deploy
```

### Enable CI/CD with GitHub

To enable automated builds and deploys:

Initialize a new Git repo in your project folder:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```


- Go to the Cloudflare Dashboard → Workers & Pages → Select your Worker project → Settings → Builds

- Click Connect, choose GitHub, and select your repo.

- Save build settings.

### Push a new commit:

```bash
git add .
git commit -m "Update blog content"
git push origin main
```

This automatically triggers a build + deploy on Cloudflare.

### Option 2: One-Click Deploy (requires GitHub)

Click this button to deploy with one click:

[Deploy to Cloudflare](https://deploy.workers.cloudflare.com/?url=https://github.com/vnikhilbuddhavarapu/nextjs-blog-starter)


- You’ll be redirected to the Cloudflare Dashboard:

- Choose your Lab Account (not your personal account).

- Connect your GitHub account to Cloudflare.

- Copy the build & deploy commands when prompted.
  
  ```bash
  npx opennextjs-cloudflare build
  npx opennextjs-cloudflare deploy
  ```

- Click Deploy.


### What happens after deploy?

- Cloudflare initializes a new project

- Clones the starter repo into your GitHub

- Builds the app using the OpenNext adapter

- Deploys it globally across Cloudflare’s network

### When it’s done:

- Your app will be live at a workers.dev URL:

https://<project-name>.<account-name>.workers.dev


- Cloudflare automatically provisions a certificate.

- Go to Continue to Project → Settings → Custom Domains

- Add a domain like:

blog.<unique-slug>.sxplab.com

- Cloudflare will create a CNAME record automatically.

- Visit your new custom domain. 

- Finally, disable the workers.dev URL if you only want the custom domain to work.

---

## App 2: Astro Blog using MDX

This app uses **Astro** (static-first) with **Markdown/MDX** for content.  
You’ll scaffold an Astro blog template that’s pre-wired to run on **Cloudflare Workers**.

---

### Option 1 — Build from scratch (recommended for learning)

#### 1) Create a project folder and scaffold the template

```bash
# Create and enter your project folder
mkdir astro-blog-app
cd astro-blog-app
```

- Scaffold the Cloudflare-ready Astro blog template into the current folder

```bash
npm create cloudflare@latest -- --template=cloudflare/templates/astro-blog-starter-template
```
- Install dependencies

```bash
npm install
```

- Start the local dev server

```bash
npm run dev
# ➜ http://localhost:4321
```


- Visit http://localhost:4321 to see the live dev server (hot reload enabled).

-Edit your first post content

```bash
src/content/blog/<first-post>.md
```

- Open the file above in your editor and customize the title and body.

- Feel free to use your AI tool to generate content for this exercise.

- Save the file and refresh http://localhost:4321 to see instant changes.

- Want MDX? You can add .mdx posts similarly (Astro supports both Markdown and MDX).

- Preview in a local Cloudflare Worker (workerd)

```bash
npm run preview
# ➜ http://127.0.0.1:8787
```

This runs the site in a local Workers environment so you can test it exactly as it will run on Cloudflare’s edge.

- Deploy to production (Cloudflare Workers)

```bash
npm run deploy
# Your site will be deployed globally
```

- After deploy, visit:

https://<project-name>.<unique-slug>.workers.dev

- Every Worker gets a unique workers.dev URL with a managed TLS certificate.

- (Optional) Add a custom domain

- In the Cloudflare Dashboard → Workers & Pages → your project → Settings → Custom Domains

- Add a domain like:

blog.<unique-slug>.sxplab.com


- Cloudflare will create a CNAME DNS record automatically.

- Visit your custom domain

- (Optional) Disable the workers.dev URL if you only want the custom domain active.

You’ll use the Lab account for this workshop. Its enterprise domain looks like:
https://<unique-slug>.sxplab.com

### (Optional) Set up CI/CD with GitHub

- Automate builds and deploys whenever you push.

- A) Initialize a Git repo and push to GitHub

```bash
git init
git add .
git commit -m "Initial commit (Astro Blog)"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

- B) Connect the repo to your Worker

- Open the Cloudflare Dashboard → Workers & Pages

- Select your Worker → Settings → Builds

- Click Connect, choose GitHub, and select your repo

- Save build settings

- C) Trigger a deploy

```bash
git add .
git commit -m "Update blog content"
git push origin main
```

Workers will automatically build & deploy your project.

---

## App 3: AI Chat App with AI Gateway

This template demonstrates how to build an **AI chat app** using **Cloudflare Workers AI** with streaming responses.

---

### Features

- Simple and responsive chat interface  
- Real-time streaming of AI responses using **Server-Sent Events (SSE)**  
- Powered by **Cloudflare Workers AI**  
- Built with **TypeScript** and Cloudflare Workers  
- Mobile-friendly design  
- Maintains chat history on the client side  
- Built-in **Observability logging**  
- **AI Gateway integration** support (optional)

---

### Option 1 — Clone the Repository

#### 1) Clone the repo and enter the project

```bash
git clone https://github.com/cloudflare/templates.git
cd templates/llm-chat-app
```

#### 2) Install dependencies

```bash
npm install
```

#### 3) Generate Worker type definitions

```bash
npm run cf-typegen
```

#### 4) Start local development

```bash
npm run dev
# Local server: http://localhost:8787
```

Visit http://localhost:8787
 to try the chat app locally.

#### Deployment

Deploy to Cloudflare Workers with:

```bash
npm run deploy
```

Monitor logs in real time:

```bash
npx wrangler tail
```

#### Project Structure

```mdx
/
├── public/             # Static assets
│   ├── index.html      # Chat UI HTML
│   └── chat.js         # Chat UI frontend script
├── src/
│   ├── index.ts        # Main Worker entry point
│   └── types.ts        # TypeScript type definitions
├── test/               # Test files
├── wrangler.jsonc      # Cloudflare Worker configuration
├── tsconfig.json       # TypeScript configuration
└── README.md           # Documentation
```

#### How It Works

- Backend

  - Built with Cloudflare Workers and Workers AI

  - Provides an /api/chat endpoint that accepts POST requests with user messages

  - Streams AI responses using SSE (Server-Sent Events)

  - Uses the Workers AI binding to call LLMs

- Frontend

  - Plain HTML/CSS/JS interface

  - Sends user messages to the API

  - Processes streaming responses in real-time

  - Maintains chat history in the browser

#### Customization

- Changing the Model

Edit src/index.ts and update the MODEL_ID constant.
Available models: [Cloudflare Workers AI Models](https://developers.cloudflare.com/workers-ai/models/).

### Using AI Gateway

- To enable AI Gateway:

  - Create an AI Gateway in the Cloudflare Dashboard.

  - Uncomment the gateway configuration in src/index.ts

  - Replace YOUR_GATEWAY_ID with your actual Gateway ID

- Configure options such as:

  - skipCache: bypass caching

  - cacheTtl: set TTL in seconds

- Learn more in the [AI Gateway docs](https://developers.cloudflare.com/workers-ai/gateway/).

- Modifying the System Prompt

Update the SYSTEM_PROMPT constant in src/index.ts to change the default behavior of the chatbot.

### Styling

The CSS is inside `<style>` in `public/index.html`.
Modify CSS variables at the top to adjust the color scheme quickly.

### Option 2 — One-Click Deploy

- [One-Click Deploy](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/llm-chat-app-template).

- You’ll be redirected to the Cloudflare Dashboard.

- Select your Lab Account (not your personal account).

- Log into GitHub and connect your account.

- Leave all defaults, then click Create and Deploy.

#### What Happens During One-Click Deploy?

- Cloudflare initializes a new project

- Clones the repo into your GitHub

- Builds the app

- Deploys globally across Cloudflare’s edge

#### When finished:

- Your app is live at:

https://<project-name>.<account-name>.workers.dev

(Cloudflare automatically provides TLS)

- Click Continue to Project to manage your deployment.

- Under Settings → Custom Domains, add:

ai.<unique-slug>.sxplab.com


- A CNAME record will be created automatically.

- Visit your custom domain to chat with your AI app.

- Disable the default workers.dev and preview URLs if you only want the custom domain live.

---

## App 4: AI Agent using Agents SDK

A minimal full-stack template for building **AI agents on Cloudflare**.  
It ships a **React (Vite) SPA chat UI**, a **Cloudflare Worker** powered by the **Agents SDK** (WebSocket sessions), and a few example **tools**:

- `getWeather` → Open-Meteo forecast with a compact weather widget  
- `captureScreenshot` → PNG screenshot via **Cloudflare Browser Rendering (Puppeteer)**  
- `convertToPdf` → PDF rendering via **Cloudflare Browser Rendering (Puppeteer)**

---

### What you’ll get

- **Agents SDK** with **WebSocket** sessions for low-latency, streaming, tool-enabled chats  
- **React + Vite** SPA with **shadcn/ui** + **Tailwind CSS** (clean, responsive UI)  
- Tooling examples you can customize (weather, screenshots, PDF)  
- Choose your model (any model reachable by Agents SDK; pick one that supports tool/function calling)  
- Opinionated file layout for easy editing and extension  
- Built-in logging, progress updates, and result previews

---

### Option 1 — Manual Deploy (clone & run)

#### 1) Clone and install

```bash
git clone https://github.com/vnikhilbuddhavarapu/cf-ai-agent-template.git
cd cf-ai-agent-template
```

```bash
npm install
# or: pnpm install / bun install
```

#### 2) Run local dev (Vite + Worker)

```bash
npm run dev
```

- Vite dev server → usually http://localhost:5173
- Worker sidecar (SSR / APIs) runs automatically via the Cloudflare plugin
- Open the app at http://localhost:5173
- Start chatting with the agent.

#### 3) Deploy to production

```bash
npm run deploy
```

Builds client + deploys the Worker via Wrangler


- After deploy, visit:

https://<project-name>.<account-name>.workers.dev

- You can add a custom domain later, e.g. agent.<unique-slug>.sxplab.com.)

#### How this template works (high-level)

- Agents SDK & WebSockets
The Worker exposes a WebSocket endpoint that spins up an Agent session.
The React client connects to this endpoint and sends user messages + tool results.
The Agent (server) streams tokens, emits tool calls, and orchestrates steps in real time.

- Durable Objects (session state)
Each chat can be anchored to a Durable Object (via the Agents binding) to preserve state, context, and tool progress across messages. This enables multi-turn reasoning and reliable tool orchestration.

- React client ↔ Agent route
The SPA sends chat turns to the Agent route (e.g., /agent/request) and opens a WS session for streaming. UI updates incrementally as tokens arrive; tool cards display when a tool is invoked.

- Tools
Tools are simple TypeScript modules. The Agent calls them when needed, passing structured args. The result is streamed back into the same WS session and rendered in the UI (e.g., weather widget, screenshot preview, PDF download).

- Styling & components
The UI uses Tailwind CSS and shadcn/ui (cards, buttons, inputs). You can theme with Tailwind tokens and expand components as needed.

- Models
Set a tool-capable model in the agent config. You can switch to any provider accessible by the Agents SDK (e.g., Workers AI or a third-party via gateway). Ensure function/tool calling is supported for best results.

#### Customize: tools, UI, and models

- Add/edit tools
Create a new file in worker/tools/yourTool.ts, export a schema (zod/JSON) + run() handler, and register it in the agent setup.
Comments inside code blocks are fine—users can copy/paste safely.

- UI tweaks
Edit React components under src/components/. Update ToolCard, chat bubbles, and progress indicators. Tailwind makes layout changes quick.

- Model config
Update the agent’s model ID/provider in worker/agent.ts (or wherever createAgent(...) is called). Pick a model that supports tool/function calls.

- Cloudflare bindings (make sure these exist)
Add these to wrangler.jsonc and ensure resources are created in your Lab account:

```json
{
  "name": "cf-ai-agent",
  "main": "worker/index.ts",
  "compatibility_date": "2025-09-03",
  "compatibility_flags": ["nodejs_compat"],
  "assets": { "binding": "ASSETS", "directory": "./public" },

  "ai": [{ "binding": "AI" }], // Workers AI

  "durable_objects": {
    "bindings": [{ "name": "AI_AGENT", "class_name": "AIAgent" }]
  },
  "migrations": [
    { "tag": "v1", "new_sqlite_classes": ["AIAgent"] }
  ],

  "kv_namespaces": [
    { "binding": "agent_sessions", "id": "xxxxxxxxxxxxxxxxxxxx" }
  ],

  "r2_buckets": [
    { "binding": "agent_browser_uploads", "bucket_name": "agent-browser-uploads" }
  ],

  "browser": [{ "binding": "BROWSER" }]
}
```

#### Bindings

- AI – Workers AI (LLM calls, summaries)

- AI_AGENT – Agents SDK Durable Object (WebSocket agent sessions)

- agent_sessions – KV for session metadata

- ASSETS – Static assets / SPA

- BROWSER – Cloudflare Browser Rendering (Puppeteer)

- agent_browser_uploads – R2 bucket for screenshots/PDFs

If names differ in your dashboard, update the bindings to match.

#### Project Structure

```
- src/                      # React SPA
 - components/chat/        # Message UI, ToolCard, Weather widget, etc.
 - agent/wsClient.ts       # Tiny WS client for Agents SDK
 - App.tsx                 # Chat app; handles progress + previews

- worker/                   # Cloudflare Worker (Agents SDK)
 - agent.ts                # Agent state, planning, tool orchestration
 - index.ts                # fetch() router: /agent (WS), /api/*, static, etc.
 - session.ts              # /api/session (cookie/bootstrap for local dev)
 - tools/
    -getWeather.ts
    -captureScreenshot.ts
    -convertToPdf.ts

- public/                   # Static assets for SPA
 - index.html
 ...
```

#### Option 2 — One-Click Deploy

[Deploy to Cloudflare](https://deploy.workers.cloudflare.com/?url=https://github.com/vnikhilbuddhavarapu/cf-ai-agent-template)

Steps:

- You’ll be redirected to the Cloudflare Dashboard.

- Select your Lab Account (not personal/prod).

- Log into GitHub and connect your account.

- Leave defaults as-is, click Create and Deploy.

- Cloudflare initializes the project → clones the repo into your GitHub → builds client & Worker → deploys globally on the edge.

- When complete, your app will be live at:

https://<project-name>.<account-name>.workers.dev

- Go to Settings → Custom Domains and add:

agent.<unique-slug>.sxplab.com

- A CNAME is created automatically.

- Visit your custom domain.

- (Optional) Disable the workers.dev + preview URLs if you only want the custom domain active.

---
