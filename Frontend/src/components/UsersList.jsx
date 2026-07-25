import React, { useEffect, useState } from "react";
import "../CSS/usersList.css";
import { getAllUsers } from "../services/userAuth";
import toast from "react-hot-toast";
import { deleteUser } from "../services/userAuth";

function UsersList() {
 const [users, setUsers] = useState([]);
const [showModal, setShowModal] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);
const [loading, setLoading] = useState(true);

 const handleDelete = async (id) => {
   try {
     const res = await deleteUser(id, token);

     toast.success(res.data.message);

     fetchUsers();
   } catch (err) {
     toast.error(err.response?.data?.message || "Something went wrong");
   }
 };

const fetchUsers = async () => {
  setLoading(true);

  try {
    const res = await getAllUsers(token);
    setUsers(res.data.users);
  } catch (err) {
    toast.error(err.response?.data?.message || "Error");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchUsers();
}, []);


const token = localStorage.getItem("token");
  return (
    <>
      <div className="user-table-wrapper">
        <div className="user-list">
          <div className="user-header ">
            <div>User</div>
            <div>Phone</div>
            <div>joined</div>
            <div>Appointments</div>
            <div>Actions</div>
          </div>

          {loading
            ? [...Array(6)].map((_, index) => (
                <div className="user-row skeleton-row" key={index}>
                  <div className="user-information">
                    <div className="skeleton skeleton-name"></div>
                    <div className="skeleton skeleton-text"></div>
                  </div>

                  <div className="skeleton skeleton-text"></div>

                  <div className="skeleton skeleton-small"></div>

                  <div className="skeleton skeleton-small"></div>

                  <div className="userActions">
                    <div className="skeleton skeleton-btn"></div>
                    <div className="skeleton skeleton-btn"></div>
                  </div>
                </div>
              ))
            : users.map((user) => (
                <div className="user-row" key={user._id}>
                  <div className="user-information ">
                    <h4>{user.name}</h4>
                    <span>{user.email}</span>
                  </div>
                  <div>{user.phone}</div>
                  <div>{new Date(user.createdAt).toLocaleDateString()}</div>

                  <div className="appoint">{user.totalAppointments}</div>

                  <div className="userActions">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowModal(true);
                      }}
                    >
                      <i className="fa-regular fa-eye"></i>
                    </button>
                    <button onClick={() => handleDelete(user._id)}>
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              ))}
          {!loading && (
            <div className="p-4 text-center">
              Showing {users.length} of {users.length}{" "}
              {users.length === 1 ? "user" : "users"}
            </div>
          )}
        </div>
      </div>

      {showModal && selectedUser && (
        <div className="user-modal-overlay">
          <div className="user-modal">
            <div className="user-modal-header">
              <h3>User Details</h3>

              <button
                className="close-btn"
                onClick={() => {
                  setShowModal(false);
                  setSelectedUser(null);
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="user-modal-body">
              <div className="detail">
                <span>Full Name</span>
                <p>{selectedUser.name}</p>
              </div>

              <div className="detail">
                <span>Email</span>
                <p>{selectedUser.email}</p>
              </div>

              <div className="detail">
                <span>Phone</span>
                <p>{selectedUser.phone}</p>
              </div>

              <div className="detail">
                <span>Joined On</span>
                <p>{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="detail">
                <span>Role</span>
                <p>
                  {selectedUser.isAdmin
                    ? "Administrator"
                    : selectedUser.isDoctor
                      ? "Doctor"
                      : "User"}
                </p>
              </div>

              <div className="detail">
                <span>Doctor</span>
                <p>{selectedUser.isDoctor ? "Yes" : "No"}</p>
              </div>

              <div className="detail">
                <span>Admin</span>
                <p>{selectedUser.isAdmin ? "Yes" : "No"}</p>
              </div>

              <div className="detail">
                <span>Appointments</span>
                <p>{selectedUser.totalAppointments || 0}</p>
              </div>

              <div className="detail">
                <span>User ID</span>
                <p>{selectedUser._id}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UsersList;
