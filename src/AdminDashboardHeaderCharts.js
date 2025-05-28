import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip);

const revenueData = [
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

const listingsData = [
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

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
    title: { display: false },
  },
  scales: {
    x: {
      title: { display: true, text: "Month" },
      grid: { display: false },
    },
    y: {
      title: { display: true, text: "Revenue ($)" },
      beginAtZero: true,
      grid: { color: "#f3f4f6" },
    },
  },
};

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
    title: { display: false },
  },
  scales: {
    x: {
      title: { display: true, text: "Month" },
      grid: { display: false },
    },
    y: {
      title: { display: true, text: "Listings" },
      beginAtZero: true,
      grid: { color: "#f3f4f6" },
    },
  },
};

function AdminDashboardHeaderCharts() {
  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6 my-6">
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center" style={{ width: 400, height: 250 }}>
        <h3 className="text-base font-bold mb-2">Monthly Revenue</h3>
        <div style={{ width: 400, height: 200 }}>
          <Bar
            data={{
              labels: revenueData.map((r) => r.month),
              datasets: [
                {
                  label: "Revenue ($)",
                  data: revenueData.map((r) => r.revenue),
                  backgroundColor: "rgba(59, 130, 246, 0.7)",
                  borderRadius: 6,
                  barThickness: "flex",
                  maxBarThickness: 32,
                },
              ],
            }}
            options={barOptions}
            height={200}
            width={400}
          />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center" style={{ width: 400, height: 250 }}>
        <h3 className="text-base font-bold mb-2">Monthly Listings</h3>
        <div style={{ width: 400, height: 200 }}>
          <Line
            data={{
              labels: listingsData.map((l) => l.month),
              datasets: [
                {
                  label: "Listings",
                  data: listingsData.map((l) => l.listings),
                  borderColor: "rgba(16, 185, 129, 1)",
                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                  pointBackgroundColor: "rgba(16, 185, 129, 1)",
                  pointBorderColor: "#fff",
                  tension: 0.4,
                  fill: true,
                },
              ],
            }}
            options={lineOptions}
            height={200}
            width={400}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardHeaderCharts;
