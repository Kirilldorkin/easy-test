import { useEffect } from "react";
import { Link } from "react-router-dom";

function GamePage() {
  const selectedGameTitle = localStorage.getItem("selectedGameTitle");

  useEffect(() => {
    if (!selectedGameTitle) {
      window.location.href = "/";
    }
  }, [selectedGameTitle]);

  return (
    <div className="container">
      {selectedGameTitle ? (
        <>
          <button>
            <Link to="/">На главную</Link>
          </button>
          <h1 className="game-title">{selectedGameTitle}</h1>
        </>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
}

export default GamePage;
