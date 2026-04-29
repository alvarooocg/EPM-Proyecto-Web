import { Link } from 'react-router-dom';

interface NavigationButtonProps {
  to: string;
  icon?: string;
  label?: string;
  onClick?: () => void;
}

export default function NavigationButton({ to, icon = "arrow_back_ios", label = "Volver", onClick }: NavigationButtonProps) {
  const content = (
    <>
      <span className="material-symbols-outlined text-2xl" aria-hidden="true">{icon}</span>
      <span className="sr-only">{label}</span>
    </>
  );

  const className = "fixed top-4 left-4 z-50 w-12 h-12 rounded-full bg-surface-container-highest border border-outline-variant/50 flex items-center justify-center bouncy-hover text-on-surface shadow-md hover:bg-secondary/20 hover:text-secondary focus:ring-4 focus:ring-secondary/50 outline-none";

  if (onClick) {
    return (
      <button onClick={onClick} aria-label={label} className={className}>
        {content}
      </button>
    );
  }

  return (
    <Link to={to} state={{ transitionType: 'push_back' }} aria-label={label} className={className}>
      {content}
    </Link>
  );
}
