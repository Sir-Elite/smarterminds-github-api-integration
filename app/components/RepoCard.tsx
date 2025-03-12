interface RepoCardProps {
    repo: {
        id: number;
        name: string;
        description?: string;
        stargazers_count: number;
        commitCount?: number;
    };
}

const RepoCard = ({ repo }: RepoCardProps) => {
    return (
        <div className="card w-96 bg-base-100 card-md shadow-sm">
            <div className="card-body">
                <h2 className="card-title">{repo.name}</h2>
                {repo.description && <p>{repo.description}</p>}
                <p>Stars: {repo.stargazers_count}</p>
                {repo.commitCount !== undefined && <p>Commits: {repo.commitCount}</p>}
            </div>
        </div>
    );
};
  
export default RepoCard;
  