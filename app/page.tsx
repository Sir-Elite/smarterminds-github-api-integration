import CompareForm from "./components/CompareForm";
import SearchForm from "./components/SearchForm";

export default function HomePage() {
  return (
    <main style={{ padding: "2rem" }}>
      
      <center>
        <h1><b><b>Smartermind - GitHub API Integration Challenge</b></b></h1>
      </center>

      <br /><br />

      <center>
        <div className="collapse bg-base-100 border-base-300 border">
          <h2 className="collapse-title font-semibold">Profile Analysis</h2>
        </div>
        <br />
        <SearchForm />
      </center>

      <br /><br />

      <center>
        <div className="collapse bg-base-100 border-base-300 border">
          <h2 className="collapse-title font-semibold">Profile Comparisons</h2>
        </div>
        <br />
        <CompareForm />
      </center>
      
    </main>
  );
}