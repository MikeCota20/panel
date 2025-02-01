import React, { useState, useEffect } from "react";
import "../styles/profile.css";
import logo from "../assets/imgs/f05ef210-a395-401e-967e-c35ad3052220.webp";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null); // Estado para almacenar la información del usuario
  const [newUsername, setNewUsername] = useState(""); // Estado para el nuevo nombre de usuario
  const [newPassword, setNewPassword] = useState(""); // Estado para la nueva contraseña
  const [confirmPassword, setConfirmPassword] = useState(""); // Estado para la confirmación de la nueva contraseña
  const [profilePicture, setProfilePicture] = useState(logo); // Estado para la imagen de perfil

  const token = localStorage.getItem("token"); // Obtener el token de autenticación

  useEffect(() => {
    // Si el token existe, hacer la solicitud al API para obtener el perfil del usuario
    if (token) {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
          setProfilePicture(response.data.pfp || logo); // Establecer la imagen de perfil, si existe
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };

      fetchUserProfile();
    }
  }, [token]);

  const handleSubmitUsername = async () => {
    // Lógica para actualizar el nombre de usuario
    if (newUsername !== "") {
      try {
        await axios.put(
          "http://localhost:5000/api/users/update-username",
          { username: newUsername },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser((prev) => ({ ...prev, username: newUsername })); // Actualizar el estado del usuario
        setNewUsername(""); // Limpiar el campo
        alert("Username updated successfully");
      } catch (error) {
        console.error("Error updating username:", error);
        alert("Error updating username");
      }
    }
  };

  const handleSubmitPassword = async () => {
    if (newPassword && confirmPassword && newPassword === confirmPassword) {
      try {
        await axios.put(
          "http://localhost:5000/api/users/update-password",
          { password: newPassword, confirmPassword }, // <-- Agregado confirmPassword
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNewPassword(""); // Limpiar campos
        setConfirmPassword(""); // Limpiar campos
        alert("Password updated successfully");
      } catch (error) {
        console.error("Error updating password:", error);
        alert("Error updating password");
      }
    } else {
      alert("Passwords do not match.");
    }
  };
  

  const handleSubmitPicture = async (event) => {
    event.preventDefault();

    if (!profilePicture) {
        alert("Please select a picture.");
        return;
    }

    const formData = new FormData();
    formData.append("pfp", profilePicture);

    try {
        const response = await axios.post(
            "http://localhost:5000/api/users/update-profile-picture",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        setProfilePicture(response.data.pfp); // Actualiza la imagen en el frontend
        alert("Profile picture updated successfully!");
    } catch (error) {
        console.error("Error updating profile picture:", error);
        alert("Error updating profile picture");
    }
};



  return (
    <div className="profile-global">
      <div className="profile-name">
        <div className="pn-show">
          <p>Name:</p>
          <h3>{user ? user.username : "Loading..."}</h3>
        </div>
        <div className="pn-change">
          <label>Change Username: </label>
          <div className="pn-changeSubmit">
            <input
              placeholder="New username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <div className="pn-changeSubmit2">
              <button onClick={handleSubmitUsername}>Submit</button>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-password">
        <label>Change Password: </label>
        <div className="pp-change">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <div className="pn-changeSubmit2">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleSubmitPassword}>Submit</button>
          </div>
        </div>
      </div>

      <div className="profile-picture">
        <img src={`/pfps/${profilePicture}`} alt="Profile Picture" />
        <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files[0])}
        />
        <button onClick={handleSubmitPicture}>Submit</button>
    </div>
    </div>
  );
}

export default Profile;
