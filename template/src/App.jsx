import { Scene } from '@/Scenes'
import { useTranslation } from 'react-i18next'

// The starter scene fills the viewport against the favicon's dark background.
export function App () {
  const { t } = useTranslation()

  return (
    <main className='fixed inset-0 bg-slate-900' aria-label={t('scene.label')}>
      <Scene />
    </main>
  )
}
