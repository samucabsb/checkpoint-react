export default function ActivityCard({ icon, user, action, game, time }) {
  return (
    <div className="activity-card bg-[rgba(250,247,238,0.05)] rounded-xl p-6 border border-[rgba(250,247,238,0.15)] flex flex-col gap-4 transition-all hover:-translate-y-2 hover:shadow-xl">
      <div className="activity-user flex items-center gap-3">
        <div className="activity-avatar w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-xl">
          {icon}
        </div>
        <span className="activity-username font-semibold text-[#FAF7EE]">
          {user}
        </span>
      </div>

      <p className="activity-action text-[15px] text-[rgba(250,247,238,0.8)]">
        {action} <span className="activity-game font-bold text-yellow-400">{game}</span>
      </p>

      <span className="activity-timestamp text-sm text-[rgba(250,247,238,0.6)] mt-auto">
        {time}
      </span>
    </div>
  );
}
