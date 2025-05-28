import React, { useState } from "react";
import {
  UserIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  BanknotesIcon,
  ClipboardDocumentCheckIcon,
  DocumentArrowDownIcon,
  Cog6ToothIcon,
  BellAlertIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  LockClosedIcon,
  ArrowPathIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AdminDashboardHeaderCharts from "./AdminDashboardHeaderCharts";

// Mock Data
const mockStats = {
  listingsToday: 8,
  listingsWeek: 42,
  listingsMonth: 180,
  visitors: { buyer: 1200, seller: 340 },
};

const mockRecentListings = [
  {
    id: 1,
    title: "Emerald Gemstone",
    seller: "Alice Smith",
    date: "2025-05-28",
    payment: "Credit Card",
    status: "Listed",
  },
  {
    id: 2,
    title: "Ruby Pendant",
    seller: "Bob Lee",
    date: "2025-05-28",
    payment: "Bank Transfer",
    status: "Pending",
  },
  // ...more mock listings
];

const mockBankTransfers = [
  {
    id: 101,
    title: "Sapphire Ring",
    seller: "Jane Doe",
    date: "2025-05-27",
    proof: "https://via.placeholder.com/60x40.png?text=Proof",
    status: "Review Required",
    amount: 1200,
  },
];

const mockUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@gemnest.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Seller John",
    email: "john.seller@gemnest.com",
    role: "Seller",
    status: "Active",
  },
  {
    id: 3,
    name: "Buyer Jane",
    email: "jane.buyer@gemnest.com",
    role: "Buyer",
    status: "Inactive",
  },
];

const mockActivityLog = [
  {
    id: 1,
    action: "Approved listing",
    who: "Admin User",
    when: "2025-05-28 10:12",
    details: "Sapphire Ring",
  },
  {
    id: 2,
    action: "Rejected listing",
    who: "Admin User",
    when: "2025-05-27 16:40",
    details: "Opal Pendant",
  },
];

const mockSystemHealth = [
  { name: "API Server", status: "Online" },
  { name: "Database", status: "Online" },
  { name: "Email Service", status: "Down" },
];

const mockRevenue = [
  { month: "Jan", revenue: 1200 },
  { month: "Feb", revenue: 1500 },
  { month: "Mar", revenue: 1800 },
  { month: "Apr", revenue: 2100 },
  { month: "May", revenue: 2500 },
  { month: "Jun", revenue: 2300 },
  { month: "Jul", revenue: 2700 },
  { month: "Aug", revenue: 3000 },
  { month: "Sep", revenue: 3200 },
  { month: "Oct", revenue: 3500 },
  { month: "Nov", revenue: 3700 },
  { month: "Dec", revenue: 4000 },
];

// Add mock data for monthly listings
const mockMonthlyListings = [
  { month: "Jan", listings: 30 },
  { month: "Feb", listings: 45 },
  { month: "Mar", listings: 50 },
  { month: "Apr", listings: 60 },
  { month: "May", listings: 80 },
  { month: "Jun", listings: 75 },
  { month: "Jul", listings: 90 },
  { month: "Aug", listings: 100 },
  { month: "Sep", listings: 110 },
  { month: "Oct", listings: 120 },
  { month: "Nov", listings: 130 },
  { month: "Dec", listings: 140 },
];

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const sectionList = [
  { name: "Dashboard", icon: <ClipboardDocumentCheckIcon className="w-5 h-5" /> },
  { name: "Listings", icon: <DocumentArrowDownIcon className="w-5 h-5" /> },
  { name: "Bank Transfers", icon: <BanknotesIcon className="w-5 h-5" /> },
  { name: "Users", icon: <UsersIcon className="w-5 h-5" /> },
  { name: "Settings", icon: <Cog6ToothIcon className="w-5 h-5" /> },
];

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [users, setUsers] = useState(mockUsers);
  const [recentListings, setRecentListings] = useState(mockRecentListings);
  const [bankTransfers, setBankTransfers] = useState(mockBankTransfers);
  const [activityLog, setActivityLog] = useState(mockActivityLog);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [toast, setToast] = useState(null);
  const [announcement, setAnnouncement] = useState("Welcome to the Admin Dashboard!");
  const [systemHealth] = useState(mockSystemHealth);
  const [search, setSearch] = useState("");
  const [reportFrom, setReportFrom] = useState(null);
  const [reportTo, setReportTo] = useState(null);
  const [reportResults, setReportResults] = useState([]);

  // Toast helper
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  // Approve/Reject Bank Transfer
  const handleApprove = (id) => {
    setBankTransfers((prev) => prev.filter((t) => t.id !== id));
    setRecentListings((prev) => [
      ...prev,
      {
        ...bankTransfers.find((t) => t.id === id),
        payment: "Bank Transfer",
        status: "Listed",
        date: new Date().toISOString().slice(0, 10),
      },
    ]);
    setActivityLog((prev) => [
      { id: Date.now(), action: "Approved listing", who: "Admin User", when: new Date().toLocaleString(), details: id },
      ...prev,
    ]);
    showToast("Listing approved.");
  };
  const handleReject = (id) => {
    setShowRejectModal(true);
    setSelectedTransfer(id);
  };
  const confirmReject = () => {
    setBankTransfers((prev) => prev.filter((t) => t.id !== selectedTransfer));
    setActivityLog((prev) => [
      { id: Date.now(), action: "Rejected listing", who: "Admin User", when: new Date().toLocaleString(), details: selectedTransfer + (rejectReason ? ` (${rejectReason})` : "") },
      ...prev,
    ]);
    setShowRejectModal(false);
    setRejectReason("");
    setSelectedTransfer(null);
    showToast("Listing rejected.", "error");
  };

  // User Management
  const handleAddUser = () => {
    setEditUser(null);
    setShowUserModal(true);
  };
  const handleEditUser = (user) => {
    setEditUser(user);
    setShowUserModal(true);
  };
  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    showToast("User deleted.", "error");
  };
  const handleSaveUser = (user) => {
    if (editUser) {
      setUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
      showToast("User updated.");
    } else {
      setUsers((prev) => [
        { ...user, id: Date.now() },
        ...prev,
      ]);
      showToast("User added.");
    }
    setShowUserModal(false);
    setEditUser(null);
  };
  const handleResetPassword = (id) => {
    showToast("Password reset link sent.");
  };
  const handleDeactivate = (id) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: "Inactive" } : u)));
    showToast("User deactivated.", "error");
  };

  // Export CSV
  const exportCSV = (type) => {
    let data = type === "users" ? users : recentListings;
    let csv = Object.keys(data[0]).join(",") + "\n" + data.map((row) => Object.values(row).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}.csv`;
    a.click();
    showToast("CSV exported.");
  };

  // Generate Report
  const handleGenerateReport = () => {
    if (!reportFrom || !reportTo) return;
    // Filter listings by date range
    const from = new Date(reportFrom);
    const to = new Date(reportTo);
    const filtered = recentListings.filter(l => {
      const d = new Date(l.date);
      return d >= from && d <= to;
    });
    setReportResults(filtered);
  };

  // Filtered data
  const filteredListings = recentListings.filter((l) =>
    l.title.toLowerCase().includes(search.toLowerCase()) ||
    l.seller.toLowerCase().includes(search.toLowerCase())
  );
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Only admins can see user management
  const isAdmin = true;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Announcement Banner */}
      {announcement && (
        <div className="bg-blue-100 text-blue-800 py-2 px-4 text-center flex items-center justify-center gap-2">
          <BellAlertIcon className="w-5 h-5 inline-block mr-1" />
          <span>{announcement}</span>
        </div>
      )}
      <div className="flex flex-1 min-h-0">
        {/* Side Nav */}
        <nav className="w-56 bg-white border-r shadow-sm flex flex-col py-6 px-2 shrink-0">
          <div className="mb-8 flex items-center gap-2 px-2">
            <UserIcon className="w-7 h-7 text-blue-600" />
            <span className="font-bold text-xl tracking-tight">Admin</span>
          </div>
          {sectionList.map((s) => (
            <button
              key={s.name}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg mb-2 text-left font-medium transition-all hover:bg-blue-50 ${activeSection === s.name ? "bg-blue-100 text-blue-700" : "text-gray-700"}`}
              onClick={() => setActiveSection(s.name)}
            >
              {s.icon}
              {s.name}
            </button>
          ))}
        </nav>
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Dashboard Section */}
          {activeSection === "Dashboard" && (
            <div>
              <AdminDashboardHeaderCharts />
              {/* Business Report Date Picker & Table */}
              <div className="bg-white rounded-xl shadow-md p-5 mb-8">
                <h3 className="text-lg font-bold mb-4">Business Report</h3>
                <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
                  <div className="flex gap-2 items-center">
                    <span className="text-sm font-medium">From:</span>
                    <DatePicker
                      selected={reportFrom}
                      onChange={date => setReportFrom(date)}
                      selectsStart
                      startDate={reportFrom}
                      endDate={reportTo}
                      className="border rounded-lg p-2 text-sm"
                      placeholderText="Start date"
                      dateFormat="yyyy-MM-dd"
                    />
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-sm font-medium">To:</span>
                    <DatePicker
                      selected={reportTo}
                      onChange={date => setReportTo(date)}
                      selectsEnd
                      startDate={reportFrom}
                      endDate={reportTo}
                      minDate={reportFrom}
                      className="border rounded-lg p-2 text-sm"
                      placeholderText="End date"
                      dateFormat="yyyy-MM-dd"
                    />
                  </div>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
                    onClick={handleGenerateReport}
                  >
                    Generate Report
                  </button>
                </div>
                {reportResults.length > 0 && (
                  <div className="overflow-x-auto rounded-xl shadow-md bg-white mt-4">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 text-gray-500 text-xs">
                          <th className="px-3 py-2 text-left">Title</th>
                          <th className="px-3 py-2 text-left">Seller</th>
                          <th className="px-3 py-2 text-left">Date</th>
                          <th className="px-3 py-2 text-left">Payment</th>
                          <th className="px-3 py-2 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportResults.map((l) => (
                          <tr key={l.id} className="border-b last:border-0">
                            <td className="px-3 py-2 font-medium">{l.title}</td>
                            <td className="px-3 py-2">{l.seller}</td>
                            <td className="px-3 py-2">{l.date}</td>
                            <td className="px-3 py-2">{l.payment}</td>
                            <td className="px-3 py-2">{l.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-md p-5 flex flex-col items-start hover:shadow-lg transition-all border-t-4 border-blue-500">
                  <span className="text-xs text-gray-500 mb-1">Listings Today</span>
                  <div className="flex items-center gap-2">
                    <ClipboardDocumentCheckIcon className="w-7 h-7 text-blue-500" />
                    <span className="text-2xl font-bold">{mockStats.listingsToday}</span>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-5 flex flex-col items-start hover:shadow-lg transition-all border-t-4 border-green-500">
                  <span className="text-xs text-gray-500 mb-1">Listings This Week</span>
                  <div className="flex items-center gap-2">
                    <ClipboardDocumentCheckIcon className="w-7 h-7 text-green-500" />
                    <span className="text-2xl font-bold">{mockStats.listingsWeek}</span>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-5 flex flex-col items-start hover:shadow-lg transition-all border-t-4 border-purple-500">
                  <span className="text-xs text-gray-500 mb-1">Listings This Month</span>
                  <div className="flex items-center gap-2">
                    <ClipboardDocumentCheckIcon className="w-7 h-7 text-purple-500" />
                    <span className="text-2xl font-bold">{mockStats.listingsMonth}</span>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-5 flex flex-col items-start hover:shadow-lg transition-all border-t-4 border-yellow-500">
                  <span className="text-xs text-gray-500 mb-1">Visitors</span>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <UsersIcon className="w-6 h-6 text-blue-400" />
                      <span className="text-xs text-gray-400">Buyer</span>
                      <span className="font-bold text-lg flex items-center gap-1">{mockStats.visitors.buyer} <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" /></span>
                    </div>
                    <div className="flex flex-col items-center">
                      <UsersIcon className="w-6 h-6 text-green-400" />
                      <span className="text-xs text-gray-400">Seller</span>
                      <span className="font-bold text-lg flex items-center gap-1">{mockStats.visitors.seller} <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" /></span>
                    </div>
                  </div>
                </div>
              </div>
              {/* System Health & Announcement */}
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-md p-5 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold">System Health</span>
                  </div>
                  <ul>
                    {systemHealth.map((s) => (
                      <li key={s.name} className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{s.name}:</span>
                        <span className={`text-sm font-semibold ${s.status === "Online" ? "text-green-600" : "text-red-600"}`}>{s.status}</span>
                        {s.status !== "Online" && <ArrowPathIcon className="w-4 h-4 animate-spin text-red-500" />}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-xl shadow-md p-5 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <BellAlertIcon className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold">Site Announcement</span>
                  </div>
                  <input
                    className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400"
                    value={announcement}
                    onChange={(e) => setAnnouncement(e.target.value)}
                  />
                </div>
              </div>
              {/* Activity Log */}
              <div className="bg-white rounded-xl shadow-md p-5 mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <EyeIcon className="w-5 h-5 text-gray-500" />
                  <span className="font-semibold">Activity Log</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-gray-500 text-xs">
                        <th className="px-2 py-1 text-left">Action</th>
                        <th className="px-2 py-1 text-left">Who</th>
                        <th className="px-2 py-1 text-left">When</th>
                        <th className="px-2 py-1 text-left">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activityLog.map((log) => (
                        <tr key={log.id} className="border-b last:border-0">
                          <td className="px-2 py-1">{log.action}</td>
                          <td className="px-2 py-1">{log.who}</td>
                          <td className="px-2 py-1">{log.when}</td>
                          <td className="px-2 py-1">{log.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {/* Listings Section */}
          {activeSection === "Listings" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Recent Listings</h2>
                <div className="flex gap-2">
                  <input
                    className="border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400"
                    placeholder="Search listings..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center gap-1"
                    onClick={() => exportCSV("listings")}
                  >
                    <DocumentArrowDownIcon className="w-4 h-4" /> Export CSV
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto rounded-xl shadow-md bg-white">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs">
                      <th className="px-3 py-2 text-left">Title</th>
                      <th className="px-3 py-2 text-left">Seller</th>
                      <th className="px-3 py-2 text-left">Date Listed</th>
                      <th className="px-3 py-2 text-left">Payment</th>
                      <th className="px-3 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredListings.slice(0, 10).map((l) => (
                      <tr key={l.id} className="border-b last:border-0 hover:bg-blue-50 transition-all">
                        <td className="px-3 py-2 font-medium">{l.title}</td>
                        <td className="px-3 py-2">{l.seller}</td>
                        <td className="px-3 py-2">{l.date}</td>
                        <td className="px-3 py-2">{l.payment}</td>
                        <td className="px-3 py-2">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${l.status === "Listed" ? "bg-green-100 text-green-700" : l.status === "Rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>{l.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* Bank Transfers Section */}
          {activeSection === "Bank Transfers" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Bank Transfer Listings (Action Required)</h2>
                <button
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center gap-1"
                  onClick={() => exportCSV("listings")}
                >
                  <DocumentArrowDownIcon className="w-4 h-4" /> Export CSV
                </button>
              </div>
              <div className="overflow-x-auto rounded-xl shadow-md bg-white">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs">
                      <th className="px-3 py-2 text-left">Title</th>
                      <th className="px-3 py-2 text-left">Seller</th>
                      <th className="px-3 py-2 text-left">Date</th>
                      <th className="px-3 py-2 text-left">Amount</th>
                      <th className="px-3 py-2 text-left">Proof</th>
                      <th className="px-3 py-2 text-left">Status</th>
                      <th className="px-3 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bankTransfers.map((t) => (
                      <tr key={t.id} className="border-b last:border-0 hover:bg-yellow-50 transition-all">
                        <td className="px-3 py-2 font-medium">{t.title}</td>
                        <td className="px-3 py-2">{t.seller}</td>
                        <td className="px-3 py-2">{t.date}</td>
                        <td className="px-3 py-2">${t.amount?.toLocaleString() ?? '-'}</td>
                        <td className="px-3 py-2">
                          <a href={t.proof} target="_blank" rel="noopener noreferrer">
                            <img src={t.proof} alt="Proof" className="w-16 h-10 object-cover rounded shadow" />
                          </a>
                        </td>
                        <td className="px-3 py-2">
                          <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-700">Review Required</span>
                        </td>
                        <td className="px-3 py-2 flex gap-2">
                          <button
                            className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 text-xs font-semibold flex items-center gap-1"
                            onClick={() => handleApprove(t.id)}
                          >
                            <CheckCircleIcon className="w-4 h-4" /> Approve
                          </button>
                          <button
                            className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-xs font-semibold flex items-center gap-1"
                            onClick={() => handleReject(t.id)}
                          >
                            <XCircleIcon className="w-4 h-4" /> Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* Users Section */}
          {activeSection === "Users" && isAdmin && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">User Management</h2>
                <button
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center gap-1"
                  onClick={handleAddUser}
                >
                  <PlusIcon className="w-4 h-4" /> Add User
                </button>
              </div>
              <div className="flex items-center mb-2">
                <input
                  className="border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400"
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="ml-2 bg-blue-600 text-white px-3 py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center gap-1"
                  onClick={() => exportCSV("users")}
                >
                  <DocumentArrowDownIcon className="w-4 h-4" /> Export CSV
                </button>
              </div>
              <div className="overflow-x-auto rounded-xl shadow-md bg-white">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs">
                      <th className="px-3 py-2 text-left">Name</th>
                      <th className="px-3 py-2 text-left">Email</th>
                      <th className="px-3 py-2 text-left">Role</th>
                      <th className="px-3 py-2 text-left">Status</th>
                      <th className="px-3 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="border-b last:border-0 hover:bg-blue-50 transition-all">
                        <td className="px-3 py-2 font-medium flex items-center gap-2">
                          <UserIcon className="w-5 h-5 text-blue-400" /> {u.name}
                        </td>
                        <td className="px-3 py-2">{u.email}</td>
                        <td className="px-3 py-2">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${u.role === "Admin" ? "bg-blue-100 text-blue-700" : u.role === "Seller" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{u.role}</span>
                        </td>
                        <td className="px-3 py-2">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${u.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{u.status}</span>
                        </td>
                        <td className="px-3 py-2 flex gap-2 flex-wrap">
                          <button
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-blue-100 text-xs font-semibold flex items-center gap-1"
                            onClick={() => handleEditUser(u)}
                          >
                            <PencilSquareIcon className="w-4 h-4" /> Edit
                          </button>
                          <button
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-yellow-100 text-xs font-semibold flex items-center gap-1"
                            onClick={() => handleResetPassword(u.id)}
                          >
                            <LockClosedIcon className="w-4 h-4" /> Reset Password
                          </button>
                          <button
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 text-xs font-semibold flex items-center gap-1"
                            onClick={() => handleDeactivate(u.id)}
                          >
                            <ArrowRightOnRectangleIcon className="w-4 h-4" /> Deactivate
                          </button>
                          <button
                            className="bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 text-xs font-semibold flex items-center gap-1"
                            onClick={() => handleDeleteUser(u.id)}
                          >
                            <TrashIcon className="w-4 h-4" /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* Settings Section (placeholder) */}
          {activeSection === "Settings" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Settings</h2>
              <p className="text-gray-500">Settings functionality coming soon.</p>
            </div>
          )}
        </main>
      </div>
      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">{editUser ? "Edit User" : "Add User"}</h3>
            <form
              onSubmit={e => {
                e.preventDefault();
                const form = e.target;
                const user = {
                  id: editUser ? editUser.id : Date.now(),
                  name: form.name.value,
                  email: form.email.value,
                  role: form.role.value,
                  status: form.status.value,
                };
                handleSaveUser(user);
              }}
              className="flex flex-col gap-3"
            >
              <input name="name" defaultValue={editUser?.name || ""} placeholder="Name" className="border rounded-lg p-2 text-sm" required />
              <input name="email" defaultValue={editUser?.email || ""} placeholder="Email" className="border rounded-lg p-2 text-sm" required />
              <select name="role" defaultValue={editUser?.role || "Seller"} className="border rounded-lg p-2 text-sm">
                <option>Admin</option>
                <option>Seller</option>
                <option>Buyer</option>
              </select>
              <select name="status" defaultValue={editUser?.status || "Active"} className="border rounded-lg p-2 text-sm">
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <div className="flex gap-2 mt-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">Save</button>
                <button type="button" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200" onClick={() => setShowUserModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Reject Listing</h3>
            <textarea
              className="border rounded-lg p-2 w-full text-sm mb-4"
              placeholder="Enter rejection reason (optional)"
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
            />
            <div className="flex gap-2">
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700" onClick={confirmReject}>Reject</button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200" onClick={() => setShowRejectModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-semibold flex items-center gap-2 ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
          {toast.type === "success" ? <CheckCircleIcon className="w-5 h-5" /> : <XCircleIcon className="w-5 h-5" />}
          {toast.msg}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
