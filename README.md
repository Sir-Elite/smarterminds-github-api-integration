# Project Brief

This project is a GitHub Explorer web application that allows users to search for and compare GitHub profiles, displaying repository information and AI-generated summaries. Below is an overview of the core technologies used:

## Technologies

### **Next.js**
A `React`-based framework that enables server-side rendering, static site generation, and an optimized developer experience for building production-ready web applications.

### **Tailwind CSS**
A utility-first `CSS` framework that provides a comprehensive set of classes to rapidly build custom designs without leaving your markup.

### **TypeScript**
A typed superset of `JavaScript` that adds static typing and powerful tooling, helping catch errors early and improve maintainability.

### **DaisyUI**
A lightweight UI library built on top of `Tailwind CSS`. It offers pre-styled components and utility classes, speeding up the design process while maintaining a clean look.

---

## Highlights

- **Search & Compare:** Users can enter one or two GitHub usernames to view profile information and repositories side by side.
- **AI Summaries:** Integrates with an AI (via a separate API) to provide quick comparisons or summaries of GitHub profiles.
- **Responsive UI:** Tailwind CSS and DaisyUI ensure a consistent, mobile-friendly design.
- **Type Safety:** Using TypeScript helps prevent runtime errors and improves the overall developer experience.

---

## Files and Their Functions

### **`app/compare/[username1]-[username2]/page.tsx`**
- **Purpose:** Renders a page to compare two GitHub users side by side.
- **Key Operations:**  
  - Fetches each user’s profile and repositories from the GitHub API.  
  - Uses `geminiSummary.ts` to generate an AI-driven comparison summary.  
  - Displays each user’s `Profile` and `RepoList` in a table layout.

### **`app/components/Profile.tsx`**
- **Purpose:** Displays a single user’s profile details (avatar, username, bio, etc.).
- **Usage:** Imported by both the single-user page and the compare page.

### **`app/components/RepoCard.tsx`**
- **Purpose:** Shows individual repository details (name, description, star count).
- **Usage:** Used by `RepoList.tsx` to render each repo item.

### **`app/components/RepoList.tsx`**
- **Purpose:** Maps over an array of repositories and renders them (usually in a grid or flex layout) using `RepoCard`.
- **Usage:** Used in both single-user and compare pages to list multiple repos.

### **`app/components/SearchForm.tsx`**
- **Purpose:** Renders an input field and submit button for entering a GitHub username.
- **Key Operation:** Navigates to `/user/[username]` upon submission.

### **`app/user/[username]/page.tsx`**
- **Purpose:** Renders the page for a single GitHub user.
- **Key Operations:**  
  - Fetches user profile and repositories from the GitHub API.  
  - Optionally uses `geminiSummary.ts` for an AI-generated summary (if desired).  
  - Displays the user’s `Profile` and `RepoList`.

### **`app/page.tsx`**
- **Purpose:** Serves as the landing page (homepage).
- **Usage:** Often includes a welcome message or a main `SearchForm` to begin exploring GitHub profiles.

### **`app/layout.tsx`**
- **Purpose:** Defines the overall layout for the Next.js App Router (e.g., common header, footer).
- **Usage:** Wraps around all routes/pages in the `app` directory.

### **`app/globals.css`**
- **Purpose:** Contains global CSS styles that apply throughout the entire application.

### **`lib/geminiSummary.ts`**
- **Purpose:** Provides a function to call the Gemini API with a text prompt and return an AI-generated summary.
- **Usage:** Invoked by pages (like compare) to summarize or compare user data.

### **`public/favicon.ico`**
- **Purpose:** The default favicon for the site.

### **Other Notable Files**
- **`.gitignore`**: Lists files and folders to be ignored by Git.
- **`next-env.d.ts`**: Ensures TypeScript support for Next.js.
- **`package.json`**: Lists dependencies and scripts for running/building the project.
- **`package-lock.json`**: Lock file with exact dependency versions.
- **`postcss.config.js`**: Configures PostCSS for processing CSS (if used).

---

## Overall Flow of the Website

1. **Landing Page (Homepage)**  
   - Users arrive at `app/page.tsx`.  
   - Typically contains a `SearchForm` component for entering a single GitHub username.

2. **Single-User Search**  
   - After entering a username, the site navigates to `/user/[username]` (`app/user/[username]/page.tsx`).  
   - The user’s profile data and repos are fetched from GitHub’s API.  
   - A `Profile` component displays basic user info (avatar, bio).  
   - A `RepoList` component shows all the user’s repositories.

3. **Comparing Two Users**  
   - A separate form (or a direct link) navigates to `/compare/[username1]/[username2]` (`app/compare/[username1]-[username2]/page.tsx`).  
   - Both users’ profile data and repos are fetched.  
   - The `geminiSummary.ts` module is used to generate an AI-driven summary comparing the two users.  
   - The page displays both users’ `Profile` side by side, each with their `RepoList`.

4. **AI Summaries (Optional)**  
   - When the page needs an AI-generated summary (e.g., for a single user or two-user comparison), it calls `getSummary` from `lib/geminiSummary.ts`.  
   - The Gemini API returns a summary string, which is displayed on the page.

Overall, this structure allows users to:
- **Search** for a single GitHub user and view their profile & repos.
- **Compare** two GitHub users and see a summarized analysis of their differences.

---

Feel free to explore the code and customize the styling or logic as needed. Contributions and suggestions are welcome!
