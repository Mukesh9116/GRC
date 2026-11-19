import { useEffect, useState } from "react";
import axios from "axios";
import ToastMessage from "../../components/ToastMessage";
import { BASE_URL } from "../../config";

const BlockedUser = () => {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const showToast = (message, type = "success") => setToast({ show: true, message, type });

  const getUser = async () => {
    try { const res = await axios.get(`${BASE_URL}/api/user/blocked`); setUser(res.data.user || []); }
    catch (err) { console.log(err); showToast("Unable to load blocked users.", "danger"); }
  };
  useEffect(() => { getUser(); }, []);

  const handleUnblock = async (id) => {
    try { const res = await axios.put(`${BASE_URL}/api/user/block/${id}`); showToast(res.data.msg); getUser(); }
    catch (err) { console.log(err); showToast("Unable to unblock the user.", "danger"); }
  };

  const filteredUser = user.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase()) || item.mobile.includes(search));

  return <div className="container-fluid">
    <ToastMessage {...toast} onClose={() => setToast({ ...toast, show: false })} />
    <div className="card border-0 shadow rounded-4"><div className="card-body">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4"><div><h3 className="fw-bold mb-1">Blocked Users</h3><p className="text-muted mb-0">Restore access for students when needed.</p></div><div className="input-group table-search"><span className="input-group-text"><i className="bi bi-search"></i></span><input type="text" className="form-control" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} /></div></div>
      <div className="table-responsive"><table className="table table-hover align-middle"><thead className="table-light"><tr><th>S.No.</th><th>Name</th><th>Father Name</th><th>Gender</th><th>Email</th><th>Mobile</th><th>College</th><th>Session</th><th>Action</th></tr></thead><tbody>{filteredUser.length ? filteredUser.map((item, index) => <tr key={item._id}><td>{index + 1}</td><td className="fw-semibold">{item.name}</td><td>{item.fname}</td><td className="text-capitalize">{item.gender}</td><td>{item.email}</td><td>{item.mobile}</td><td>{item.college?.name || "—"}</td><td>{item.session?.name || "—"}</td><td><button className="btn btn-success btn-sm" onClick={() => handleUnblock(item._id)}><i className="bi bi-check-circle me-1"></i>Unblock</button></td></tr>) : <tr><td colSpan="9" className="text-center text-muted py-5"><i className="bi bi-person-x fs-3 d-block mb-2"></i>No blocked users found.</td></tr>}</tbody></table></div>
      <p className="text-muted small mb-0">Showing {filteredUser.length} user{filteredUser.length === 1 ? "" : "s"}.</p>
    </div></div>
  </div>;
};

export default BlockedUser;
