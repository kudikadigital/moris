// components/ads/AdBannerInline.tsx — VERSÃO ACTUALIZADA com props da DB

interface AdBannerInlineProps {
  title: string;
  description?: string;
  linkUrl: string;
  ctaText?: string;
  bgColor?: string;
}

export function AdBannerInline({
  title,
  description,
  linkUrl,
  ctaText = "Reservar Agora",
  bgColor = "#ea580c",
}: AdBannerInlineProps) {
  return (
    <a
      href={linkUrl}
      target={linkUrl.startsWith("http") ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="block my-12 p-8 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative hover:opacity-95 transition-opacity"
      style={{ backgroundColor: bgColor }}
    >
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="z-10">
        <h4 className="text-2xl font-bold mb-2">{title}</h4>
        {description && (
          <p className="text-white/80 font-light text-sm">{description}</p>
        )}
      </div>
      <span className="whitespace-nowrap px-8 py-4 bg-white text-slate-900 font-black rounded-full hover:bg-slate-900 hover:text-white transition-all shadow-xl active:scale-95 z-10 text-sm">
        {ctaText.toUpperCase()}
      </span>
    </a>
  );
}
