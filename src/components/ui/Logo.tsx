import { APP_CONFIG } from '@/config/appConfig';

interface LogoProps {
  showSlogan?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ showSlogan = true, size = 'md' }: LogoProps) {
  const iconSize = size === 'sm' ? 36 : size === 'lg' ? 64 : 48;

  return (
    <div className="logo">
      <svg
        className="logo__icon"
        width={iconSize}
        height={iconSize}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="64" height="64" rx="14" fill="url(#logoGrad)" />
        <path
          d="M12 38C12 34 15 30 20 28L24 26C26 25 28 25 30 26L34 28C39 30 42 34 42 38V42H12V38Z"
          fill="#0A1628"
          opacity="0.9"
        />
        <circle cx="18" cy="42" r="5" fill="#0A1628" stroke="#FF6B00" strokeWidth="2" />
        <circle cx="36" cy="42" r="5" fill="#0A1628" stroke="#FF6B00" strokeWidth="2" />
        <path
          d="M22 28L26 18H34L38 28"
          stroke="#FF6B00"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M44 22L50 16M50 22L44 16"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="47" cy="19" r="8" stroke="#FFFFFF" strokeWidth="1.5" fill="none" opacity="0.6" />
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="64" y2="64">
            <stop stopColor="#FF6B00" />
            <stop offset="1" stopColor="#CC5500" />
          </linearGradient>
        </defs>
      </svg>
      <div className="logo__text">
        <span className="logo__name">{APP_CONFIG.name}</span>
        {showSlogan && <span className="logo__slogan">{APP_CONFIG.slogan}</span>}
      </div>
    </div>
  );
}
