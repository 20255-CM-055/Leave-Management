import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const ManagerDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    try {
      const res = await api.get("/leaves/manager");
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch leaves");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const approveLeave = async (id) => {
    await api.patch(`/leaves/${id}/approve`);
    alert("Leave approved");
    fetchLeaves();
  };

  const rejectLeave = async (id) => {
    const remarks = prompt("Enter rejection reason");
    if (!remarks) return;

    await api.patch(`/leaves/${id}/reject`, { remarks });
    alert("Leave rejected");
    fetchLeaves();
  };

  return (
    <div style={styles.container}>
      <h2>Manager Dashboard</h2>
      <p>Welcome, {user.name}</p>

      <h3>Employee Leave Requests</h3>

      {loading && <p>Loading...</p>}
      {!loading && leaves.length === 0 && <p>No leave requests.</p>}

      {leaves.map(l => (
        <div key={l._id} style={styles.card}>
          <p><b>Employee:</b> {l.user.name}</p>
          <p><b>Policy:</b> {l.policy.name}</p>
          <p><b>Reason:</b> {l.reason}</p>
          <p>
            <b>Dates:</b>{" "}
            {l.fromDate.slice(0, 10)} → {l.toDate.slice(0, 10)}
          </p>
          <p><b>Status:</b> {l.status}</p>

          {l.status === "Pending" && (
            <div>
              <button
                onClick={() => approveLeave(l._id)}
                style={styles.approve}
              >
                Approve
              </button>
              <button
                onClick={() => rejectLeave(l._id)}
                style={styles.reject}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}

      <button onClick={logout} style={styles.logout}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: 30
  },
  card: {
    background: "#f5f5f5",
    padding: 20,
    borderRadius: 6,
    marginBottom: 15
  },
  approve: {
    padding: 8,
    marginRight: 10,
    background: "#2e7d32",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  },
  reject: {
    padding: 8,
    background: "#d32f2f",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  },
  logout: {
    marginTop: 20,
    padding: 10,
    background: "#444",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  }
};

export default ManagerDashboard;
