import React, { useEffect, useState } from "react";
import axios from "axios";
import ToastMessage from "../../components/ToastMessage";
import { BASE_URL } from "../../config";

const DiscussionForum = () => {

  const [data, setData] = useState({
    title: "",
    description: ""
  });

  const [discussion, setDiscussion] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const showToast = (message, type = "success") => setToast({ show: true, message, type });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const getDiscussion = async () => {
    try {

      const res = await axios.get(
        `${BASE_URL}/api/discussion/show`
      );

      setDiscussion(res.data.discussions);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDiscussion();
  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("userToken");

      const res = await axios.post(
        `${BASE_URL}/api/discussion/register`,
        data,
        {
          headers: {
            authorization: token
          }
        }
      );

      showToast(res.data.msg, "success");

      setData({
        title: "",
        description: ""
      });

      getDiscussion();

    } catch (err) {
      console.log(err);
    }

  };

  return (
    <div className="container-fluid">
      <ToastMessage {...toast} onClose={() => setToast({ ...toast, show: false })} />

      {/* Form */}
      <div className="card border-0 shadow rounded-4 mb-4">

        <div className="card-header bg-white py-3">
          <h4 className="fw-bold mb-0">
            Discussion Forum
          </h4>
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">
                Title
              </label>

              <input
                type="text"
                className="form-control"
                name="title"
                value={data.title}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">

              <label className="form-label">
                Description
              </label>

              <textarea
                className="form-control"
                rows="4"
                name="description"
                value={data.description}
                onChange={handleChange}
              ></textarea>

            </div>

            <button className="btn btn-primary">
              Post Discussion
            </button>

          </form>

        </div>

      </div>

      {/* Table */}

      <div className="card border-0 shadow rounded-4">

        <div className="card-header bg-white py-3">
          <h5 className="fw-bold mb-0">
            All Discussions
          </h5>
        </div>

        <div className="card-body">

          <div className="table-responsive">

            <table className="table table-bordered table-hover">

              <thead>

                <tr>
                  <th>S No.</th>
                  <th>Student</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Date</th>
                </tr>

              </thead>

              <tbody>

                {
                  discussion.map((item, index) => (

                    <tr key={item._id}>

                      <td>{index + 1}</td>

                      <td>{item.student?.name}</td>

                      <td>{item.title}</td>

                      <td>{item.description}</td>

                      <td>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>

                    </tr>

                  ))
                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DiscussionForum;
