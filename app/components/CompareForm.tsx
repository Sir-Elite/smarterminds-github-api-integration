"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CompareForm = () => {
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username1.trim() && username2.trim()) {
      router.push(`/compare/${username1.trim()}/${username2.trim()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tr>
          <td>
            <center>
              <label className="input">
                <span className="label"><b>Username 1</b></span>
                <input
                  type="text"
                  placeholder="octocat"
                  value={username1}
                  onChange={(e) => setUsername1(e.target.value)}
                  className="input input-ghost"
                />
              </label>
            </center>
          </td>
          <td>
            <center>
              <label className="input">
                <span className="label"><b>Username 2</b></span>
                <input
                  type="text"
                  placeholder="hubot"
                  value={username2}
                  onChange={(e) => setUsername2(e.target.value)}
                  className="input input-ghost"
                />
              </label>
            </center>
          </td>
        </tr>
      </table>

      <br />

      <button type="submit" className="btn btn-ghost">Compare</button>
      
    </form>
  );
};

export default CompareForm;