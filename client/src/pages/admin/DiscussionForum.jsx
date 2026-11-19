import { useEffect, useState } from "react";
import axios from "axios";
import ToastMessage from "../../components/ToastMessage";
import { BASE_URL } from "../../config";

const DiscussionForum = () => {
  const [discussion, setDiscussion] = useState([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const showToast = (message, type = "success") => setToast({ show: true, message, type });

  const getDiscussion = async () => {
    try { const res = await axios.get(`${BASE_URL}/api/discussion/show`); setDiscussion(res.data.discussions || []); }
    catch (err) { console.log(err); showToast("Unable to load discussions.", "danger"); }
  };
  useEffect(() => { getDiscussion(); }, []);

  const deleteDiscussion = async (id) => {
    try { const res = await axios.put(`${BASE_URL}/api/discussion/delete/${id}`); showToast(res.data.msg); getDiscussion(); }
    catch (err) { console.log(err); showToast("Unable to delete the discussion.", "danger"); }
  };

  const filteredDiscussion = discussion.filter((item) => item.student?.name?.toLowerCase().includes(search.toLowerCase()) || item.title.toLowerCase().includes(search.toLowerCase()));

  return <div className="container-fluid">
    <ToastMessage {...toast} onClose={() => setToast({ ...toast, show: false })} />
    <div className="card border-0 shadow rounded-4"><div className="card-body">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4"><div><h3 className="fw-bold mb-1">Discussion Management</h3><p className="text-muted mb-0">Review student discussion posts.</p></div><div className="input-group table-search"><span className="input-group-text"><i className="bi bi-search"></i></span><input className="form-control" placeholder="Search discussions..." value={search} onChange={(e) => setSearch(e.target.value)} /></div></div>
      <div className="table-responsive"><table className="table table-hover align-middle"><thead className="table-light"><tr><th>S.No.</th><th>Student</th><th>Title</th><th>Description</th><th>Date</th><th>Action</th></tr></thead><tbody>{filteredDiscussion.length ? filteredDiscussion.map((item, index) => <tr key={item._id}><td>{index + 1}</td><td className="fw-semibold">{item.student?.name || "Unknown"}</td><td>{item.title}</td><td className="discussion-text">{item.description}</td><td>{new Date(item.createdAt).toLocaleDateString()}</td><td><button className="btn btn-outline-danger btn-sm" onClick={() => deleteDiscussion(item._id)}><i className="bi bi-trash me-1"></i>Delete</button></td></tr>) : <tr><td colSpan="6" className="text-center text-muted py-5"><i className="bi bi-chat-square-text fs-3 d-block mb-2"></i>No discussions found.</td></tr>}</tbody></table></div>
      <p className="text-muted small mb-0">Showing {filteredDiscussion.length} discussion{filteredDiscussion.length === 1 ? "" : "s"}.</p>
    </div></div>
  </div>;
};

export default DiscussionForum;
