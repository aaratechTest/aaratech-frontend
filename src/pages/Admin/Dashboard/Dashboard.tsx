import "./Dashboard.css";
import { useAuth } from "../../../contexts/AuthContext";
import { Users, Mail, Briefcase, Package, ArrowUpRight } from "lucide-react";

const stats = [
  { label: "Total Visitors", value: "12,845", icon: Users, change: "+12%" },
  { label: "Leads", value: "348", icon: Mail, change: "+8%" },
  { label: "Services", value: "6", icon: Briefcase, change: "" },
  { label: "Products", value: "5", icon: Package, change: "" },
];

const recentActivity = [
  { action: "New contact form submission", user: "john@example.com", time: "2 hours ago" },
  { action: "Services page updated", user: "Admin", time: "5 hours ago" },
  { action: "New lead from Landing page", user: "sarah@company.com", time: "1 day ago" },
  { action: "Product page content edited", user: "Admin", time: "2 days ago" },
  { action: "New contact form submission", user: "mike@startup.io", time: "3 days ago" },
];

export default function Dashboard() {
  const { admin } = useAuth();

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1 className="dashboard__welcome">
          Welcome back, {admin?.name ?? "Admin"}
        </h1>
        <p className="dashboard__subtitle">
          Here's what's happening with your website today.
        </p>
      </div>

      <div className="dashboard__stats">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <div className="stat-card__icon">
              <stat.icon size={24} />
            </div>
            <div className="stat-card__info">
              <span className="stat-card__value">{stat.value}</span>
              <span className="stat-card__label">{stat.label}</span>
            </div>
            {stat.change && (
              <span className="stat-card__change">
                <ArrowUpRight size={14} />
                {stat.change}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="dashboard__grid">
        <div className="dashboard__card">
          <h3 className="dashboard__card-title">Recent Activity</h3>
          <div className="activity-table">
            <table>
              <thead>
                <tr>
                  <th>Action</th>
                  <th>User</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((item, index) => (
                  <tr key={index}>
                    <td>{item.action}</td>
                    <td>{item.user}</td>
                    <td>{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dashboard__card">
          <h3 className="dashboard__card-title">Quick Actions</h3>
          <div className="quick-actions">
            <button className="quick-action-btn">Edit Home Page</button>
            <button className="quick-action-btn">View Leads</button>
            <button className="quick-action-btn">Update Services</button>
            <button className="quick-action-btn">Site Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
}
