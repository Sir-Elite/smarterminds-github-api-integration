import RepoCard from "./RepoCard";

interface Repo {
    id: number;
    name: string;
    description?: string;
    stargazers_count: number;
    commitCount?: number;
}

interface RepoListProps {
    repos: Repo[];
}

const RepoList = ({ repos }: RepoListProps) => {
    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {repos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
            ))}
        </div>
    );
};

export default RepoList;