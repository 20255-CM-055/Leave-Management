import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div style={styles.nav}>
      <div style={styles.left}>
        <b>Leave Management System</b>
      </div>
      <div style={styles.right}>
        <span style={styles.role}>{user.role}</span>
        <span>{user.name}</span>
        <button onClick={logout} style={styles.logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  nav: {
    height: 60,
    background: "#1976d2",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px"
  },
  left: {
    fontSize: 18
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: 15
  },
  role: {
    background: "rgba(255,255,255,0.2)",
    padding: "4px 8px",
    borderRadius: 4,
    fontSize: 12
  },
  logout: {
    background: "#d32f2f",
    border: "none",
    color: "#fff",
    padding: "6px 10px",
    cursor: "pointer"
  }
};

export default Navbar;
