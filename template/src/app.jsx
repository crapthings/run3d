import { Scene } from '@/scenes'
import { Ui } from '@/ui'
import { useTranslation } from 'react-i18next'

// Keep the full-screen scene and portal-based HTML interface in the same React tree.
export function App () {
  const { t } = useTranslation()

  return (
    <>
      <main className='fixed inset-0 bg-slate-900' aria-label={t('scene.label')}>
        <Scene />
      </main>
      <Ui />
    </>
  )
}
