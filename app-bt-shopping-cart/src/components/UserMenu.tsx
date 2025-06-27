import { useNavigate } from "react-router-dom";

function UserMenu() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload(); // o navegar a /login
  };

  return (
    <div>
      {user ? (
        <>
          <span>👤 {user}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={() => navigate("/login")}>Login</button>
      )}
    </div>
  );
}

export default UserMenu;
