import "./ContentPagesPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { pageDefinitions } from "../../../constants/pageDefinitions";
import { seedContent } from "../../../services/contentService";
import {
  Home,
  Users,
  Briefcase,
  Building,
  Mail,
  DollarSign,
  FileText,
  Shield,
  Smartphone,
  Code,
  Database,
} from "lucide-react";
import Alert from "../../../shared/Alert/Alert";

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home size={28} />,
  Users: <Users size={28} />,
  Briefcase: <Briefcase size={28} />,
  Building: <Building size={28} />,
  Mail: <Mail size={28} />,
  DollarSign: <DollarSign size={28} />,
  FileText: <FileText size={28} />,
  Shield: <Shield size={28} />,
  Smartphone: <Smartphone size={28} />,
  Code: <Code size={28} />,
};

export default function ContentPagesPage() {
  const navigate = useNavigate();
  const [seeding, setSeeding] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSeed() {
    setSeeding(true);
    setAlert(null);
    try {
      const result = await seedContent();
      setAlert({ type: "success", message: result.message });
    } catch (err) {
      setAlert({ type: "error", message: err instanceof Error ? err.message : "Seed failed" });
    } finally {
      setSeeding(false);
    }
  }

  return (
    <div className="content-pages">
      <div className="content-pages__header">
        <div>
          <h1 className="content-pages__title">Content Management</h1>
          <p className="content-pages__subtitle">
            Edit text and images for each page. Page designs stay fixed.
          </p>
        </div>
        <button
          className="content-pages__seed-btn"
          onClick={handleSeed}
          disabled={seeding}
        >
          <Database size={16} />
          {seeding ? "Seeding..." : "Seed Content"}
        </button>
      </div>

      {alert && (
        <Alert variant={alert.type}>
          {alert.message}
        </Alert>
      )}

      <div className="content-pages__grid">
        {pageDefinitions.map((page) => (
          <button
            key={page.slug}
            className="content-page-card"
            onClick={() => navigate(`/admin/content/${page.slug}`)}
          >
            <div className="content-page-card__icon">
              {iconMap[page.icon] || <FileText size={28} />}
            </div>
            <h3 className="content-page-card__title">{page.title}</h3>
            <p className="content-page-card__desc">{page.description}</p>
            <span className="content-page-card__sections">
              {page.sections.length} sections
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
