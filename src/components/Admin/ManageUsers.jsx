import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import DataTable from "../../common/DataTable";
import Sidebar from "./SideBar";

const ManageUsers = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const usersQuery = query(
        collection(db, "users"),
        orderBy("createdAt", "desc"),
      );
      const querySnapshot = await getDocs(usersQuery);
      const userList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteDoc(doc(db, "users", userId));
        setUsers(users.filter((user) => user.id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user");
      }
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditName(user.displayName || "");
    setEditEmail(user.email || "");
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      const userRef = doc(db, "users", editingUser.id);
      await updateDoc(userRef, {
        displayName: editName,
        email: editEmail,
      });

      setUsers(
        users.map((user) =>
          user.id === editingUser.id
            ? { ...user, displayName: editName, email: editEmail }
            : user,
        ),
      );
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
    }
  };

  const columns = [
    {
      header: "User",
      key: "displayName",
      // sort: true,
      // searchFilter: true,
      render: (row) => (
        <div className="flex items-center gap-3 py-2">
          <img
            src={
              row.photoURL ||
              `https://ui-avatars.com/api/?name=${row.displayName}`
            }
            alt={row.displayName}
            className="w-8 h-8 rounded-full border-2 border-primary object-cover"
          />
          <span className="font-medium">{row.displayName || "No Name"}</span>
        </div>
      ),
    },
    {
      header: "Email",
      key: "email",
      // sort: true,
      // searchFilter: true,
    },
    {
      header: "Joined",
      key: "createdAt",
      // sort: true,
      render: (row) =>
        row.createdAt?.seconds
          ? new Date(row.createdAt.seconds * 1000).toLocaleDateString()
          : "N/A",
    },
    {
      header: "Actions",
      key: "actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEditClick(row)}
            className="text-blue-500 hover:text-blue-700"
            title="Edit User"
          >
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button
            onClick={() => handleDeleteUser(row.id)}
            className="text-rose-500 hover:text-rose-700"
            title="Delete User"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="bg-ghost-white text-on-surface min-h-screen flex flex-col md:flex-row">
        <Sidebar isMobileMenuOpen={isMobileMenuOpen} />
        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-20 bg-white border-b border-navy/10 border-outline-variant/10 sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-on-surface"
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
              <h2 className="font-headline text-xl font-bold hidden md:block">
                Manage Users
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold leading-none">
                  {auth.currentUser?.displayName || "Admin User"}
                </p>
                <p className="text-[10px] text-on-surface-variant mt-1">
                  {auth.currentUser?.email}
                </p>
              </div>
              <img
                alt="Profile"
                className="w-10 h-10 rounded-2xl border-2 border-primary object-cover"
                src={
                  auth.currentUser?.photoURL ||
                  "https://ui-avatars.com/api/?name=Admin"
                }
              />
            </div>
          </header>
          <div className="p-4 md:p-8 space-y-8">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-quiz-purple"></div>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  {users.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-slate-400">
                      <span className="material-symbols-outlined text-4xl mb-2">
                        group
                      </span>
                      <p>No users found.</p>
                    </div>
                  ) : (
                    <DataTable
                      columns={columns}
                      data={users}
                      pagination
                      highlightOnHover
                      pointerOnHover
                      responsive
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
      {editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-xl font-bold mb-4">Edit User</h3>
            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-quiz-purple/20"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-quiz-purple/20"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-bold text-white bg-quiz-purple hover:bg-quiz-purple/90 rounded-xl transition-colors shadow-lg shadow-quiz-purple/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageUsers;
