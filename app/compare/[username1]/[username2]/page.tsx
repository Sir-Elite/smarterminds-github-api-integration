import Profile from "../../../components/Profile";
import RepoList from "../../../components/RepoList";
import { getSummary } from "../../../lib/geminiSummary";

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

export default async function CompareProfiles({ params }: { params: { username1: string, username2: string } }) {
  const { username1, username2 } = params;
  const profile1 = await getUserProfile(username1);
  const repos1 = await getUserRepos(username1);
  const profile2 = await getUserProfile(username2);
  const repos2 = await getUserRepos(username2);

  // Aggregate key profile and repository data into a single text block.
  let aggregatedData = `Please summarize the comparison between the following GitHub profiles (total number of stars, most `;
  aggregatedData += `popular repositories, industries of experience, total number of repos, which one has done more work etc.): `;
  aggregatedData += `GitHub user profile 1 is for ${profile1.login}. Bio: ${profile1.bio || "No bio available."}. `;
  aggregatedData += `User has ${repos1.length} repositories. `;
  if (repos1.length > 0) {
    aggregatedData += "Repositories include: " + repos1.map(repo1 =>
      `${repo1.name} - ${repo1.description || "No description"}. Stars: ${repo1.stargazers_count}`
    ).join(" ");
  }
  aggregatedData += ` GitHub user profile 2 is for ${profile2.login}. Bio: ${profile2.bio || "No bio available."}. `;
  aggregatedData += `User has ${repos2.length} repositories. `;
  if (repos2.length > 0) {
    aggregatedData += "Repositories include: " + repos2.map(repo2 =>
      `${repo2.name} - ${repo2.description || "No description"}. Stars: ${repo2.stargazers_count}`
    ).join(" ");
  }

  // Generate a summary via the Gemini API
  const summary = await getSummary(aggregatedData);

  return (
    <table>
      <thead>
        <tr>
          <th colSpan={2}>
            <h2><b>AI Analysis Summary</b></h2>
            <br />
            <p>{summary}</p>
            <br />
          </th>
        </tr>
        <tr>
          <th>Profile 1</th>
          <th>Profile 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Profile 
              avatarUrl={profile1.avatar_url} 
              username={profile1.login} 
              bio={profile1.bio || "No bio available."} 
            />
            <hr />
            <h2><b>Repositories</b></h2>
            <RepoList repos={repos1} />
          </td>
          <td>
            <Profile 
              avatarUrl={profile2.avatar_url} 
              username={profile2.login} 
              bio={profile2.bio || "No bio available."} 
            />
            <hr />
            <h2><b>Repositories</b></h2>
            <RepoList repos={repos2} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}