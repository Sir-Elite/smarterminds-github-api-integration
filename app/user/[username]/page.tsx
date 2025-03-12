import Profile from "../../components/Profile";
import RepoList from "../../components/RepoList";
import { getSummary } from "../../lib/geminiSummary";

// Server-side functions to fetch GitHub data
async function getUserProfile(username: string) {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error("Failed to fetch user profile");
    return res.json();
}

async function getUserRepos(username: string) {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!res.ok) throw new Error("Failed to fetch user repositories");
    return res.json();
}

export default async function UserPage({ params }: { params: { username: string } }) {
    const { username } = params;
    const profile = await getUserProfile(username);
    const repos = await getUserRepos(username);

    // Aggregate key profile and repository data into a single text block.
    let aggregatedData = `Please Summarize the following GitHub profile information (total number of stars, most popular repositories,`;
    aggregatedData += ` industries of experience, total number of repos, ... etc.):  `
    aggregatedData += `GitHub user profile for ${profile.login}. Bio: ${profile.bio || "No bio available."}. `;
    aggregatedData += `User has ${repos.length} repositories. `;
    if (repos.length > 0) {
        aggregatedData += "Repositories include: " + repos.map(repo =>
        `${repo.name} - ${repo.description || "No description"}. Stars: ${repo.stargazers_count}`
        ).join(" ");
    }

    // Generate a concise summary via the Gemini API
    const summary = await getSummary(aggregatedData);

    return (
        <main style={{ padding: "2rem" }}>
            <center>
                <h1><b><b>GitHub Profile Summary</b></b></h1>
            </center>

            <br />

            <Profile 
                avatarUrl={profile.avatar_url} 
                username={profile.login} 
                bio={profile.bio || "No bio available."} 
            />

            <div className="collapse bg-base-100 border-base-300 border">
                <h2 className="collapse-title font-semibold">AI Analysis Summary</h2>
            </div>
            <br />
            <p>{summary}</p>

            <br /><br />

            <div className="collapse bg-base-100 border-base-300 border">
                <h2 className="collapse-title font-semibold">Repositories</h2>
            </div>
            <br />
            <RepoList repos={repos} />
        </main>
    );
}