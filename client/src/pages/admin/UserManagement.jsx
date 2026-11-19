import { useEffect, useState } from "react";
import axios from "axios";
import ToastMessage from "../../components/ToastMessage";

const UserManagement = () => {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => setToast({ show: true, message, type });

  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:2411/api/user/show");
      setUser(res.data.user || []);
    } catch (err) {
      console.log(err);
      showToast("Unable to load users.", "danger");
    }
  };

  useEffect(() => { getUser(); }, []);

  const handleBlock = async (id) => {
    try {
      const res = await axios.put(`http://localhost:2411/api/user/block/${id}`);
      showToast(res.data.msg, "success");
      getUser();
    } catch (err) {
      console.log(err);
      showToast("Unable to update the user.", "danger");
    }
  };

  const filteredUser = user.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.email.toLowerCase().includes(search.toLowerCase()) ||
    item.mobile.includes(search)
  );

  return (
    <div className="container-fluid">
      <ToastMessage {...toast} onClose={() => setToast({ ...toast, show: false })} />
      <div className="card border-0 shadow rounded-4">
        <div className="card-body">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
            <div><h3 className="fw-bold mb-1">User Management</h3><p className="text-muted mb-0">View and manage registered students.</p></div>
            <div className="input-group table-search"><span className="input-group-text"><i className="bi bi-search"></i></span><input type="text" className="form-control" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light"><tr><th>S.No.</th><th>Name</th><th>Father Name</th><th>Gender</th><th>Email</th><th>Mobile</th><th>Status</th><th>College</th><th>Session</th><th>Action</th></tr></thead>
              <tbody>{filteredUser.length > 0 ? filteredUser.map((item, index) => (
                <tr key={item._id}><td>{index + 1}</td><td className="fw-semibold">{item.name}</td><td>{item.fname}</td><td className="text-capitalize">{item.gender}</td><td>{item.email}</td><td>{item.mobile}</td><td><span className={`badge ${item.status === "active" ? "bg-success" : "bg-danger"}`}>{item.status === "active" ? "Active" : "Blocked"}</span></td><td>{item.college?.name || "—"}</td><td>{item.session?.name || "—"}</td><td><button className={`btn btn-sm ${item.status === "active" ? "btn-outline-danger" : "btn-success"}`} onClick={() => handleBlock(item._id)}><i className={`bi ${item.status === "active" ? "bi-slash-circle" : "bi-check-circle"} me-1`}></i>{item.status === "active" ? "Block" : "Unblock"}</button></td></tr>
              )) : <tr><td colSpan="10" className="text-center text-muted py-5"><i className="bi bi-people fs-3 d-block mb-2"></i>No users found.</td></tr>}</tbody>
            </table>
          </div>
          <p className="text-muted small mb-0">Showing {filteredUser.length} user{filteredUser.length === 1 ? "" : "s"}.</p>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
