import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useUrl } from "../context/UrlContext";
import { FaGlobe, FaDesktop, FaChartLine, FaArrowLeft } from "react-icons/fa";
import { StatCard } from "../components/StatCard";

const getTopCountries = (visits) => {
  const countries = {};
  visits.forEach(visit => {
    if (visit.country) {
      countries[visit.country] = (countries[visit.country] || 0) + 1;
    }
  });
  return countries;
};

const getDeviceStats = (visits) => {
  const devices = {};
  visits.forEach(visit => {
    const device = visit.device || 'unknown';
    devices[device] = (devices[device] || 0) + 1;
  });
  return devices;
};

const getRefererStats = (visits) => {
  const referrers = {};
  visits.forEach(visit => {
    if (visit.referer) {
      try {
        const domain = new URL(visit.referer).hostname;
        referrers[domain] = (referrers[domain] || 0) + 1;
      } catch (e) {
        referrers[visit.referer] = (referrers[visit.referer] || 0) + 1;
      }
    }
  });
  return referrers;
};

export const UrlDetails = () => {
  const { id } = useParams();
  const [link, setLink] = useState(null);
  const [visits, setVisits] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getLinkDetails } = useUrl();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLinkDetails(id);
        setLink(data.link);
        setVisits(data.visits);
        setStats(data.stats);
      } catch (err) {
        console.error("Error fetching link details:", err);
        setError(err.response?.status === 403 ? "Unauthorized" : "Failed to load link details");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, getLinkDetails]);

  useEffect(() => {
    document.title = `${id} | Stats | Shortener`;
  }, [id]);

  if (loading) {
    return (
      <div className="grow flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-text">Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (error === "Unauthorized") {
    return (
      <div className="grow flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-red-400 text-xl mb-2">Access Denied</h2>
          <p className="text-text mb-4">You don't have permission to view this link's statistics.</p>
          <Link to="/dashboard" className="text-accent hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!link) {
    return (
      <div className="grow flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-text-h text-xl mb-2">Link not found</h2>
          <Link to="/dashboard" className="text-accent hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-text hover:text-accent transition mb-4"
        >
          <FaArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        
        <h1 className="text-3xl font-bold text-text-h mb-2">
          {link.shortUrl}
        </h1>
        <p className="text-text break-all">
          Original:{" "}
          <a 
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-accent hover:underline"
          >
            {link.url}
          </a>
        </p>
        <div className="flex gap-4 mt-4">
          <div className="bg-accent-bg rounded-lg px-4 py-2">
            <span className="text-2xl font-bold text-accent">{stats?.totalClicks || link.clicks || 0}</span>
            <span className="text-text ml-2">total clicks</span>
          </div>
          <div className="bg-accent-bg rounded-lg px-4 py-2">
            <span className="text-2xl font-bold text-accent">{stats?.uniqueVisits || 0}</span>
            <span className="text-text ml-2">unique visitors</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<FaGlobe className="text-accent" />}
          title="Top Countries"
          data={stats?.countries || getTopCountries(visits)}
        />
        <StatCard 
          icon={<FaDesktop className="text-accent" />}
          title="Devices"
          data={stats?.devices || getDeviceStats(visits)}
        />
        <StatCard 
          icon={<FaChartLine className="text-accent" />}
          title="Top Referrers"
          data={stats?.referrers || getRefererStats(visits)}
        />
      </div>

      

      <div className="border border-border rounded-xl overflow-hidden">
        <div className="bg-card/50 px-6 py-4 border-b border-border">
          <h2 className="font-semibold text-text-h">Recent visits</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-accent-bg/30">
              <tr className="text-text text-sm">
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">IP</th>
                <th className="px-6 py-3 text-left">Location</th>
                <th className="px-6 py-3 text-left">Device</th>
                <th className="px-6 py-3 text-left">Browser</th>
               </tr>
            </thead>
            <tbody>
              {visits.length > 0 ? (
                visits.slice(0, 20).map((visit) => (
                  <tr key={visit.id} className="border-t border-border">
                    <td className="px-6 py-3 text-text text-sm">
                      {new Date(visit.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-3 text-text font-mono text-sm">
                      {visit.ip || '-'}
                    </td>
                    <td className="px-6 py-3 text-text">
                      {visit.city && visit.country ? `${visit.city}, ${visit.country}` : visit.country || '-'}
                    </td>
                    <td className="px-6 py-3 text-text">
                      {visit.device && visit.os ? `${visit.device} · ${visit.os}` : visit.device || '-'}
                    </td>
                    <td className="px-6 py-3 text-text">
                      {visit.browser || '-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-text/50">
                    No visits yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};