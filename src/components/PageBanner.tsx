import { useTheme } from '../context/ThemeContext';

interface PageBannerProps {
  title: string;
  subtitle?: string;
}

export const PageBanner = ({ title, subtitle }: PageBannerProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/inventory-banner.mp4" type="video/mp4" />
      </video>
      <div
        className={`absolute inset-0 ${
          isDark
            ? 'bg-gradient-to-r from-black/70 via-black/40 to-transparent'
            : 'bg-gradient-to-r from-orange-900/80 via-orange-800/50 to-transparent'
        }`}
      />
      <div className="absolute inset-0 flex items-center px-8">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">{title}</h3>
          {subtitle && (
            <p className="text-white/80 text-sm md:text-base mt-1 drop-shadow-md">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
};
