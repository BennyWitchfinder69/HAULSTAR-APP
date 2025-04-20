import { Goal } from "../types";

interface GoalItemProps {
  goal: Goal;
}

export default function GoalItem({ goal }: GoalItemProps) {
  return (
    <div className="goal-item">
      <div className="flex justify-between items-start mb-1">
        <div>
          <h4 className="font-medium text-neutral-800">{goal.name}</h4>
          <p className="text-sm text-neutral-500">
            {goal.name === "Take a Week Off" 
              ? "Emergency fund for time off" 
              : `Added ${new Date().toLocaleDateString()}`}
          </p>
        </div>
        <div className="text-right">
          <p className="font-semibold">${goal.amount}</p>
          {goal.name === "Take a Week Off" ? (
            <p className="text-xs text-neutral-500">$140/day × 7 days</p>
          ) : goal.deadline ? (
            <p className="text-xs text-neutral-500">Due by {new Date(goal.deadline).toLocaleDateString()}</p>
          ) : null}
        </div>
      </div>
      <div className="h-2 rounded bg-neutral-300 overflow-hidden">
        <div 
          className="h-full rounded bg-primary" 
          style={{ width: `${goal.progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs mt-1">
        <span className="text-neutral-500">${goal.saved} saved</span>
        <span className="text-primary">
          {goal.progress >= 100 
            ? "Completed!" 
            : goal.progress > 0 
              ? `${Math.ceil((goal.amount - goal.saved) / (goal.saved / goal.progress))} weeks to goal` 
              : "Just started"}
        </span>
      </div>
    </div>
  );
}
