import { Coffee2BackedLogoCard } from '@/components/sections/coffee2/coffee2-backed-logo-card'
import { Coffee2BackedPanel } from '@/components/sections/coffee2/coffee2-backed-panel'
import { coffee2Manifesto } from '@/lib/content/coffee-manifesto'

export function Coffee2ManifestoPanel() {
  return (
    <Coffee2BackedPanel
      title={coffee2Manifesto.panelTitle}
      ariaLabelledBy="coffee2-manifesto-panel-title"
      stackPosition="top"
      panelVariant="minimal"
    >
      <div className="coffee2-manifesto-panel__logos">
        {coffee2Manifesto.brandLogos.map((logo) => (
          <Coffee2BackedLogoCard
            key={logo.src}
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            variant={logo.variant}
          />
        ))}
      </div>
    </Coffee2BackedPanel>
  )
}
