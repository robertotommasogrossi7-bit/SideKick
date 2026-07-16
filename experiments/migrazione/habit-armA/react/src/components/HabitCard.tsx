import type { Habit } from '../types';
import {
  calculateCurrentStreak,
  calculateLongestStreak,
  getLatestBadges,
  getNextBadge,
} from '../logic';

interface Props {
  habit: Habit;
  onAddOccurrence: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onViewBadges: () => void;
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

export function HabitCard({ habit, onAddOccurrence, onEdit, onDelete, onViewBadges }: Props) {
  const latestBadges = getLatestBadges(habit, 3);
  const nextBadge = getNextBadge(habit);
  const currentStreak = calculateCurrentStreak(habit);
  const longestStreak = calculateLongestStreak(habit);

  return (
    <div className="habit-card" data-id={habit.id}>
      <div className="habit-header">
        <h3 className="habit-name">{habit.name}</h3>
        <div className="habit-actions">
          <button className="icon-btn add-occurrence" title="Add Occurrence" onClick={onAddOccurrence}>
            +
          </button>
          <button className="icon-btn edit" title="Edit Habit" onClick={onEdit}>
            ✏️
          </button>
          <button className="icon-btn delete" title="Delete Habit" onClick={onDelete}>
            🗑️
          </button>
        </div>
      </div>

      <div className="streak-info">
        <div className="streak-item">
          <div className="streak-label">Current Streak</div>
          <div className="streak-value">{currentStreak}</div>
        </div>
        <div className="streak-item">
          <div className="streak-label">Longest Streak</div>
          <div className="streak-value">{longestStreak}</div>
        </div>
        <div className="streak-item">
          <div className="streak-label">Occurrences</div>
          <div className="streak-value occurrences">{habit.occurrences.length}</div>
        </div>
      </div>

      {latestBadges.length > 0 && (
        <div className="badge-display">
          <div className="badge-items">
            {latestBadges.map((badge, i) => (
              <span key={badge.id} className="badge-item">
                <BadgeImg id={badge.id} name={badge.name} /> {badge.name}
                {i < latestBadges.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
          {habit.earnedBadges.length > 3 && (
            <button className="view-all-badges" onClick={onViewBadges}>
              View All Badges
            </button>
          )}
        </div>
      )}

      {nextBadge ? (
        <div className="next-badge">
          <span className="next-badge-label">Next Badge:</span>
          <span className="next-badge-name">⭐ {nextBadge.name}</span>
          <span className="next-badge-time">in {nextBadge.formattedTimeRemaining}</span>
        </div>
      ) : (
        <div className="next-badge all-earned">
          <span className="next-badge-label">🏆 All badges earned! Amazing!</span>
        </div>
      )}
    </div>
  );
}
