import "../styles/home.css"
import logo from "../assets/imgs/f05ef210-a395-401e-967e-c35ad3052220.webp";

function Home() {
    return (
      <div className="home-global">
        <div className="home-back">
          <h1>PanelView</h1>
          <h3>
          PanelView is an innovative platform dedicated to providing an exceptional experience for fans of comics, webtoons, and manga. Designed as a capstone project for a full-stack development bootcamp, this site represents a culmination of creativity, technical expertise, and a passion for storytelling.
          <br></br>
          <br></br>
          The primary goal behind PanelView is not just to refine web development skills but to create a user-friendly space where enthusiasts can immerse themselves in their favorite titles. From vibrant user profiles to lively comment sections where fans can engage in spirited discussions, PanelView offers a plethora of features.
          <br></br>
          <br></br>
          Dive into an expansive library of comics, webtoons, and manga, complete with advanced filters and a robust search function to help you find exactly what you're looking for. Whether you're a casual reader or a dedicated collector, PanelView strives to be your go-to destination for all things illustrated.
          </h3>

        </div>
        <img src={logo} alt="placeholder" />
      </div>
    );
  }
  
  export default Home;
  