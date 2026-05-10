import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { CartSlidePanel } from '@/components/cart/CartSlidePanel'
import { MobileNavPanel } from '@/components/shared/MobileNavPanel'
import { SizeGuideModal } from '@/components/shared/SizeGuideModal'
import { GrainOverlay } from '@/components/shared/GrainOverlay'
import { ToastContainer } from '@/components/shared/Toast'
import { SkipLink } from '@/components/shared/SkipLink'

export const Route = createRootRoute({ component: RootComponent })

function RootComponent() {
  return (
    <>
      <SkipLink />
      <AnnouncementBar />
      <Navbar />
      <main id="main-content" className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <CartSlidePanel />
      <MobileNavPanel />
      <SizeGuideModal />
      <GrainOverlay />
      <ToastContainer />
    </>
  )
}
