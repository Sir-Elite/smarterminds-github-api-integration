"use client";

// For managing username variable state
import { useState } from "react";
// For Client-Side Navigation
import { useRouter } from "next/navigation";

const SearchForm = () => {
    const [username, setUsername] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // For preventing automatic page reload
        e.preventDefault();
        // Dealing with extra whitespaces
        if (username.trim()) {
            // Navigating to the dynamic user page
            router.push(`/user/${username.trim()}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <center>
                <label className="input">
                    <span className="label"><b>GitHub Username</b></span>
                    <input
                        type="text"
                        placeholder="octocat"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input input-ghost"
                    />
                </label>
            </center>
        
        <br />
        <button type="submit" className="btn btn-ghost">Search</button>
        </form>
    );
};

export default SearchForm;