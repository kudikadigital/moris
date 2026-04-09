// components/ads/SidebarAd.tsx — VERSÃO ACTUALIZADA com props da DB

interface SidebarAdProps {
  title: string;
  description?: string;
  linkUrl: string;
  ctaText?: string;
  bgColor?: string;
}

export function SidebarAd({
  title,
  description,
  linkUrl,
  ctaText = "Saber Mais",
  bgColor = "#0f172a",
}: SidebarAdProps) {
  return (
    <a
      href={linkUrl}
      target={linkUrl.startsWith("http") ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="block p-6 rounded-3xl text-white sticky top-24 border border-white/10 hover:scale-[1.01] transition-transform"
      style={{ backgroundColor: bgColor }}
    >
      <div className="w-12 h-1 bg-orange-500 mb-6" />
      <p className="text-xs uppercase tracking-widest font-bold mb-2 text-orange-400">
        Destaque
      </p>
      <h4 className="text-xl font-bold mb-3">{title}</h4>
      {description && (
        <p className="text-white/70 text-sm mb-4 leading-relaxed">{description}</p>
      )}
      <span className="inline-block w-full py-3 bg-orange-600 rounded-xl font-bold text-sm text-center hover:bg-orange-700 transition-colors">
        {ctaText}
      </span>
    </a>
  );
}
