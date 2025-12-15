import "./Loader.css";

function Loader() {
  return (
    <div className="chip-loader-wrapper">
      <div className="chip-container">
        <div className="chip-border"></div>

        <div className="chip-core"></div>
      </div>

      <p className="chip-text">Loading...</p>
    </div>
  );
}

export default Loader;
