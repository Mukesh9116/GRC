import React from 'react'

const AdminHome = () => {
  return (
   <>
     {/* ========================================= */}
          {/* STATISTICS CARDS ROW (4 Columns)         */}
          {/* ========================================= */}
          <div className="row g-4 mb-4">
            
            {/* Card 1: Total Users */}
            <div className="col-sm-6 col-lg-3">
              <div className="card stat-card shadow-sm">
                <div className="card-body d-flex align-items-center">
                  <div className="icon-box bg-primary text-white">
                    <i className="bi bi-people-fill"></i>
                  </div>
                  <div className="ms-3">
                    <h6 className="text-muted mb-0">Total Users</h6>
                    <h4 className="mb-0 fw-bold">1,245</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Total Complaints */}
            <div className="col-sm-6 col-lg-3">
              <div className="card stat-card shadow-sm">
                <div className="card-body d-flex align-items-center">
                  <div className="icon-box bg-info text-white">
                    <i className="bi bi-file-earmark-text-fill"></i>
                  </div>
                  <div className="ms-3">
                    <h6 className="text-muted mb-0">Total Complaints</h6>
                    <h4 className="mb-0 fw-bold">3,120</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Pending Complaints */}
            <div className="col-sm-6 col-lg-3">
              <div className="card stat-card shadow-sm">
                <div className="card-body d-flex align-items-center">
                  <div className="icon-box bg-warning text-white">
                    <i className="bi bi-hourglass-split"></i>
                  </div>
                  <div className="ms-3">
                    <h6 className="text-muted mb-0">Pending Complaints</h6>
                    <h4 className="mb-0 fw-bold">450</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Resolved Complaints */}
            <div className="col-sm-6 col-lg-3">
              <div className="card stat-card shadow-sm">
                <div className="card-body d-flex align-items-center">
                  <div className="icon-box bg-success text-white">
                    <i className="bi bi-check-circle-fill"></i>
                  </div>
                  <div className="ms-3">
                    <h6 className="text-muted mb-0">Resolved Complaints</h6>
                    <h4 className="mb-0 fw-bold">2,670</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================= */}
          {/* RECENT TABLE & RIGHT PANEL ROW           */}
          {/* ========================================= */}
          <div className="row g-4">
            
            {/* LEFT SIDE: Recent Complaints Table (8 columns wide) */}
            <div className="col-lg-8">
              <div className="card shadow-sm border-0">
                <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-bold">Recent Complaints</h5>
                  <button className="btn btn-sm btn-outline-primary">See All</button>
                </div>
                <div className="card-body">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Complaint ID</th>
                        <th>User Name</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Row 1 */}
                      <tr>
                        <td className="fw-semibold">#GRS1021</td>
                        <td>Rahul Sharma</td>
                        <td>Water Issue</td>
                        <td>Oct 24, 2023</td>
                        <td><span className="badge bg-warning text-dark">Pending</span></td>
                        <td><button className="btn btn-sm btn-primary">View</button></td>
                      </tr>
                      {/* Row 2 */}
                      <tr>
                        <td className="fw-semibold">#GRS1022</td>
                        <td>Priya Singh</td>
                        <td>Road Repair</td>
                        <td>Oct 23, 2023</td>
                        <td><span className="badge bg-success">Resolved</span></td>
                        <td><button className="btn btn-sm btn-primary">View</button></td>
                      </tr>
                      {/* Row 3 */}
                      <tr>
                        <td className="fw-semibold">#GRS1023</td>
                        <td>Amit Kumar</td>
                        <td>Street Light</td>
                        <td>Oct 22, 2023</td>
                        <td><span className="badge bg-primary">In Progress</span></td>
                        <td><button className="btn btn-sm btn-primary">View</button></td>
                      </tr>
                      {/* Row 4 */}
                      <tr>
                        <td className="fw-semibold">#GRS1024</td>
                        <td>Sneha Gupta</td>
                        <td>Garbage</td>
                        <td>Oct 21, 2023</td>
                        <td><span className="badge bg-warning text-dark">Pending</span></td>
                        <td><button className="btn btn-sm btn-primary">View</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Progress Bars & Quick Actions (4 columns wide) */}
            <div className="col-lg-4">
              
              {/* Progress Card */}
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-header bg-white border-0">
                  <h5 className="mb-0 fw-bold">Complaint Status</h5>
                </div>
                <div className="card-body">
                  {/* Progress Bar 1 */}
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>Resolved</span>
                      <span>85%</span>
                    </div>
                    <div className="progress" style={{height: "8px"}}>
                      <div className="progress-bar bg-success" style={{width: "85%"}}></div>
                    </div>
                  </div>
                  {/* Progress Bar 2 */}
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>In Progress</span>
                      <span>65%</span>
                    </div>
                    <div className="progress" style={{height: "8px"}}>
                      <div className="progress-bar bg-primary" style={{width: "65%"}}></div>
                    </div>
                  </div>
                  {/* Progress Bar 3 */}
                  <div>
                    <div className="d-flex justify-content-between mb-1">
                      <span>Pending</span>
                      <span>40%</span>
                    </div>
                    <div className="progress" style={{height: "8px"}}>
                      <div className="progress-bar bg-warning" style={{width: "40%"}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="card shadow-sm border-0">
                <div className="card-header bg-white border-0">
                  <h5 className="mb-0 fw-bold">Quick Actions</h5>
                </div>
                <div className="card-body d-grid gap-2">
                  
                  <button className="btn btn-outline-primary"><i className="bi bi-plus-circle me-2"></i> Add Complaint</button>
                  <button className="btn btn-outline-primary"><i className="bi bi-file-earmark-bar-graph me-2"></i> Generate Report</button>
                  <button className="btn btn-outline-primary"><i className="bi bi-eye me-2"></i> View All Complaints</button>
                </div>
              </div>

            </div>
          </div>
   </>
  )
}

export default AdminHome