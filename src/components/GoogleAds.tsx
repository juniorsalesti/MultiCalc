import { useEffect } from 'react';

interface GoogleAdsProps {
  slot: string;
  format?: 'auto' | 'fluid';
  className?: string;
}

export function GoogleAds({ slot, format = 'auto', className = '' }: GoogleAdsProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('Adsbygoogle error', e);
    }
  }, []);

  return (
    <div className={`my-8 flex justify-center overflow-hidden bg-muted/30 rounded-lg p-4 ${className}`}>
      {/* Placeholder for Google Ads */}
      <div className="text-xs text-muted-foreground mb-2 text-center w-full">Publicidade</div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9374250998377227" // ID Real Atualizado
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
