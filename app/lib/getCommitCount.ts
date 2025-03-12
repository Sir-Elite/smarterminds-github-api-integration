interface CommitHistoryResponse {
    data: {
        repository: {
            defaultBranchRef: {
                target: {
                    history: {
                    totalCount: number;
                    }
                }
            }
        }
    }
}
  
export async function getCommitCount(owner: string, repo: string): Promise<number> {
    const query = `
        query($owner: String!, $name: String!) {
            repository(owner: $owner, name: $name) {
                defaultBranchRef {
                    target {
                        ... on Commit {
                            history {
                            totalCount
                            }
                        }
                    }
                }
            }
        }
    `;
    const variables = { owner, name: repo };
  
    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Replace with your GitHub personal access token that has the required scopes
            Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
        },
        body: JSON.stringify({ query, variables }),
    });
  
    if (!response.ok) {
        throw new Error("Failed to fetch commit count");
    }
  
    const result: CommitHistoryResponse = await response.json();
    return result.data.repository.defaultBranchRef.target.history.totalCount;
}