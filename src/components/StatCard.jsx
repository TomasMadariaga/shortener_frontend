export const StatCard = ({ title, icon, data, emptyMessage = "No data yet" }) => {
  return (
    <div className="border border-border rounded-xl p-4">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="font-semibold text-text-h">{title}</h3>
      </div>
      {data && Object.keys(data).length > 0 ? (
        <div className="space-y-2">
          {Object.entries(data)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([key, value]) => (
              <div key={key} className="flex justify-between text-text">
                <span className="capitalize">{key}</span>
                <span className="text-accent">{value} clicks</span>
              </div>
            ))}
        </div>
      ) : (
        <p className="text-text/50 text-sm">{emptyMessage}</p>
      )}
    </div>
  );
};