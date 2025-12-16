import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const EmployeeDashboard = () => {
  const { user, logout } = useContext(AuthContext);

  const [leaves, setLeaves] = useState([]);
  const [policies, setPolicies] = useState([]);

  const [form, setForm] = useState({
    policy: "",
    fromDate: "",
    toDate: "",
    reason: ""
  });

  // Fetch employee leaves
  const fetchLeaves = async () => {
    const res = await api.get("/leaves/my");
    setLeaves(res.data);
  };

  // Fetch leave policies
  const fetchPolicies = async () => {
    const res = await api.get("/policies");
    setPolicies(res.data);
  };

  useEffect(() => {
    fetchLeaves();
    fetchPolicies();
  }, []);

  // Apply leave
  const applyLeave = async () => {
    if (!form.policy || !form.fromDate || !form.toDate || !form.reason) {
      alert("All fields required");
      return;
    }

    await api.post("/leaves", form);
    alert("Leave applied");

    setForm({
      policy: "",
      fromDate: "",
      toDate: "",
      reason: ""
    });

    fetchLeaves();
  };

  return (
    <div style={styles.container}>
      <h2>Employee Dashboard</h2>
      <p>Welcome, {user.name}</p>

      {/* APPLY LEAVE */}
      <div style={styles.card}>
        <h3>Apply Leave</h3>

        <select
          value={form.policy}
          onChange={e => setForm({ ...form, policy: e.target.value })}
          style={styles.input}
        >
          <option value="">Select Leave Policy</option>
          {policies.map(p => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={form.fromDate}
          onChange={e => setForm({ ...form, fromDate: e.target.value })}
          style={styles.input}
        />

        <input
          type="date"
          value={form.toDate}
          onChange={e => setForm({ ...form, toDate: e.target.value })}
          style={styles.input}
        />

        <input
          placeholder="Reason"
          value={form.reason}
          onChange={e => setForm({ ...form, reason: e.target.value })}
          style={styles.input}
        />

        <button onClick={applyLeave} style={styles.button}>
          Apply Leave
        </button>
      </div>

      {/* LEAVE HISTORY */}
      <h3>My Leave Requests</h3>

      {leaves.length === 0 && <p>No leave requests yet.</p>}

      {leaves.map(l => (
        <div key={l._id} style={styles.leaveCard}>
          <p><b>Policy:</b> {l.policy.name}</p>
          <p><b>Reason:</b> {l.reason}</p>
          <p><b>Status:</b> {l.status}</p>
          <p>
            {l.fromDate.slice(0, 10)} → {l.toDate.slice(0, 10)}
          </p>
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
    marginBottom: 30
  },
  input: {
    width: "100%",
    padding: 8,
    marginBottom: 10
  },
  button: {
    padding: 10,
    background: "#1976d2",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  },
  leaveCard: {
    background: "#fafafa",
    padding: 15,
    marginBottom: 10,
    borderRadius: 6
  },
  logout: {
    marginTop: 20,
    padding: 10,
    background: "#d32f2f",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  }
};

export default EmployeeDashboard;
