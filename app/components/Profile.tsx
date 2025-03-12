import Image from "next/image";

interface ProfileProps {
    avatarUrl: string;
    username: string;
    bio?: string;
}

const Profile = ({ avatarUrl, username, bio }: ProfileProps) => {
    return (
        <center>
            <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                    <img src={avatarUrl} alt={`${username}'s avatar`}/>
                </div>
            </div>
            <h2><b>{username}</b></h2>
            <br />
            {bio && <p>{bio}</p>}
            <br />
        </center>
    );
};

export default Profile;