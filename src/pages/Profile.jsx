import "../styles/profile.css"
import logo from "../assets/imgs/f05ef210-a395-401e-967e-c35ad3052220.webp";

function Profile() {
    return (
      <div className="profile-global">
        <div className="profile-name">
            <div className="pn-show">
                <p>Name:</p>
                <h3>Username</h3>
            </div>
            <div className="pn-change">
                <label>Change Username: </label>
                <div className="pn-changeSubmit">
                    <input placeholder="User123"></input>
                    <div className="pn-changeSubmit2">
                        <button>Submit</button>
                    </div>

                </div>
            </div>
        </div>

        <div className="profile-password"> 
            <label>Change Password: </label>
            <div className="pp-change">
                <input placeholder="Password"></input>
                <div className="pn-changeSubmit2">
                    <input placeholder="Confirm Password"></input>
                    <button>Submit</button>
                </div>

            </div>

        </div>

        <div className="profile-picture">
            <img src={logo}></img>
            <button>Change Picture</button>
            <button>Submit</button>
        </div>
      </div>
    );
  }
  
  export default Profile;
   