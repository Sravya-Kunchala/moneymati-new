\"use client\";

import { useEffect, useState } from \"react\";
import SideNav from \"@/components/sidenav\";
import TopNav from \"@/components/topnav\";

type Lead = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  occupation: string | null;
  createdAt: string;
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(\"/api/admin/leads\");
        const data = await res.json();
        setLeads(data.items ?? []);
      } catch (err) {
        setError(\"Failed to load leads\");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div style={{ display: \"flex\", height: \"100vh\", overflow: \"hidden\", fontFamily: \"'DM Sans', sans-serif\" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');
        .card { background: #ffffff; border-radius: 14px; border: 1px solid #e8ede9; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; font-size: 11px; letter-spacing: 0.06em; color: #9ab09e; padding: 10px 12px; border-bottom: 1px solid #f0f5f1; }
        td { padding: 12px; font-size: 13px; color: #1a3a22; border-bottom: 1px solid #f0f5f1; }
        tr:last-child td { border-bottom: none; }
      `}</style>

      <div className=\"sidenav-wrapper\">
        <SideNav />
      </div>

      <div style={{ flex: 1, display: \"flex\", flexDirection: \"column\", overflow: \"hidden\" }}>
        <TopNav />
        <main style={{ flex: 1, overflow: \"auto\", background: \"#f4f6f4\" }}>
          <div style={{ padding: \"20px\", display: \"flex\", flexDirection: \"column\", gap: \"14px\" }}>
            <div style={{ display: \"flex\", justifyContent: \"space-between\", alignItems: \"center\" }}>
              <div>
                <div style={{ fontSize: \"14px\", fontWeight: 700, color: \"#1a3a22\" }}>Leads</div>
                <div style={{ fontSize: \"12px\", color: \"#6b7280\" }}>
                  From personalize submissions
                </div>
              </div>
              <div style={{ fontSize: \"12px\", fontWeight: 600, color: \"#0e3d27\", background: \"#e8f0ea\", padding: \"6px 12px\", borderRadius: \"10px\" }}>
                Total: {leads.length.toLocaleString()}
              </div>
            </div>

            <div className=\"card\" style={{ padding: \"6px\" }}>
              {loading && <div style={{ padding: \"14px\", fontSize: 12, color: \"#6b7280\" }}>Loading leads…</div>}
              {error && !loading && <div style={{ padding: \"14px\", fontSize: 12, color: \"#dc2626\" }}>{error}</div>}
              {!loading && !error && (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Occupation</th>
                      <th>Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ textAlign: \"center\", padding: \"16px\", color: \"#6b7280\" }}>
                          No leads yet.
                        </td>
                      </tr>
                    ) : (
                      leads.map((lead) => (
                        <tr key={lead.id}>
                          <td style={{ fontWeight: 600 }}>{lead.fullName || \"—\"}</td>
                          <td>{lead.email}</td>
                          <td>{lead.phone || \"—\"}</td>
                          <td>{lead.occupation || \"—\"}</td>
                          <td style={{ fontSize: \"12px\", color: \"#6b7280\" }}>
                            {new Date(lead.createdAt).toLocaleString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
