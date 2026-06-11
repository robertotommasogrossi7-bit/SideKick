import type { Habit } from '../types';
import { formatBadgeDate } from '../logic';

interface Props {
  habit: Habit;
  onClose: () => void;
}

function BadgeImg({ id }: { id: string; name: string }) {
  return (
    <img
      src={`/images/badge_${id}_image.png`}
      width={32}
      height={32}
      alt={id}
      className="badge-icon"
      onError={(e) => {
        const target = e.currentTarget as HTMLImageElement;
        target.outerHTML = '🔥';
      }}
    />
  );
}

export function BadgesModal({ habit, onClose }: Props) {
  return (
    <div className="modal active" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>All Badges — {habit.name}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="badges-list">
            {habit.earnedBadges.length === 0 ? (
              <p className="no-badges">No badges earned yet. Keep going!</p>
            ) : (
              habit.earnedBadges.map((badge) => (
                <div key={badge.id} className="badge-row">
                  <span className="badge-name">
                    <BadgeImg id={badge.id} name={badge.name} /> {badge.name}
                  </span>
                  <span className="badge-date">
                    {formatBadgeDate(new Date(badge.earnedAt))}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
