import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <div className="text-on-surface antialiased font-body-md min-h-screen flex flex-col bg-background">
      {/* TopNavBar */}
      <nav className="bg-surface/80 dark:bg-surface/80 backdrop-blur-md fixed top-0 w-full z-50 bg-surface-bright/50 dark:bg-surface-dim/50 border-b border-outline-variant/30 shadow-sm flex justify-between items-center h-20 px-gutter max-w-container-max mx-auto left-0 right-0">
        <div className="flex items-center gap-xl">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined fill">hub</span>
            </div>
            <div>
              <h1 className="font-headline-md text-headline-md font-bold text-primary">VendorBridge</h1>
              <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mt-1 hidden sm:block">Enterprise Procurement</p>
            </div>
          </Link>
          <div className="hidden md:flex gap-md font-body-md text-body-md"></div>
        </div>
        <div className="flex items-center gap-sm">
          <Link to="/login" className="font-body-md text-body-md text-on-surface hover:text-primary transition-colors hidden sm:block">Sign In</Link>
          <Link to="/signup" className="bg-primary-container text-on-primary-container rounded-btn px-4 py-2 font-body-md text-body-md font-medium hover:bg-primary-fixed transition-colors shadow-sm focus:ring-2 focus:ring-primary-container focus:outline-none">Get Started</Link>
        </div>
      </nav>

      {/* Main Canvas */}
      <main className="flex-grow pt-[120px] pb-xl px-gutter max-w-container-max mx-auto w-full flex flex-col gap-[80px]">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
          <div className="flex flex-col gap-lg max-w-2xl">
            <h1 className="font-display-lg text-display-lg text-on-surface">Procurement, seamlessly connected.</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">A centralized procurement hub streamlining vendor relations, RFQ cycles, and financial compliance.</p>
            <div>
              <Link to="/signup" className="inline-block bg-primary-container text-on-primary-container rounded-btn px-6 py-3 font-body-lg text-body-lg font-medium hover:bg-primary-fixed transition-colors shadow-sm focus:ring-2 focus:ring-primary-container focus:outline-none">Start for free.</Link>
            </div>
          </div>
          <div className="relative w-full aspect-[4/3] rounded-card overflow-hidden shadow-ambient bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center">
            <img alt="Procurement and connectivity 3D illustration" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZPjHQrRkRFp8y9q2BhOwTy3INayTLTbGLY60-Vay7UMZyTzWUdIXV5Ko9983qnwr-CkNUyciivJv8N7bk0W08d4DyOrX0C9YlY6K_oS9jI2eBDtaVcCOXHzE1BZtouHgZNJZ7dt6jn7BXWvdKV-H-1_1XxVFVwBudQZ7lHz2EqRhp-NzjjnH-7Ksue9JHPAKeL75CW3BJhfKtvMuFAQv-jzw_rSFbtS7hI-OkOcvw0tizQb_3BIHd8m7y52yFR7Kz_SR8vhpXzWaP" />
          </div>
        </section>

        {/* Features Grid */}
        <section className="flex flex-col gap-lg">
          <h2 className="font-headline-lg text-headline-lg text-on-surface text-center">Turn complex workflows into effortless tasks.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            {/* Card 1 */}
            <div className="bg-surface-container-lowest rounded-card p-lg shadow-ambient flex flex-col gap-sm border border-transparent hover:border-outline-variant/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary-fixed/30 flex items-center justify-center text-primary-container mb-2">
                <span className="material-symbols-outlined">hub</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Smart Vendor Registry</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Searchable, filterable database of all registered suppliers with compliance scores.</p>
            </div>
            {/* Card 2 */}
            <div className="bg-surface-container-lowest rounded-card p-lg shadow-ambient flex flex-col gap-sm border border-transparent hover:border-outline-variant/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-secondary-fixed/30 flex items-center justify-center text-secondary mb-2">
                <span className="material-symbols-outlined">compare_arrows</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Automated Bid Matrix</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Side-by-side matrix of vendor bids with automated lowest-price highlighting.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-surface-container-lowest rounded-card p-lg shadow-ambient flex flex-col gap-sm border border-transparent hover:border-outline-variant/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-tertiary-fixed/30 flex items-center justify-center text-tertiary mb-2">
                <span className="material-symbols-outlined">analytics</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Instant Audit Hub</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Automated PDF generation interface and chronological audit log.</p>
            </div>
          </div>
        </section>

        {/* Pipeline Section */}
        <section className="bg-[#EFF6FF] rounded-[24px] p-xl flex flex-col gap-lg items-center text-center shadow-ambient">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">The VendorBridge Pipeline</h2>
          <div className="flex flex-col md:flex-row w-full justify-between items-center gap-md relative">
            <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-outline-variant/40 -translate-y-1/2 z-0"></div>
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-xs z-10 bg-[#EFF6FF] px-2">
              <div className="w-10 h-10 rounded-full bg-surface-container-lowest border-2 border-primary-container text-primary-container flex items-center justify-center font-bold font-data-mono shadow-sm">1</div>
              <span className="font-body-md text-body-md font-medium text-on-surface mt-2">Create RFQ</span>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center gap-xs z-10 bg-[#EFF6FF] px-2 relative">
              <div className="w-10 h-10 rounded-full bg-surface-container-lowest border-2 border-primary-container text-primary-container flex items-center justify-center font-bold font-data-mono shadow-sm">2</div>
              <span className="font-body-md text-body-md font-medium text-on-surface mt-2">Compare Bids</span>
              <div className="absolute -top-8 right-[-20px] bg-secondary-container text-on-secondary-container text-[10px] px-2 py-1 rounded-full font-label-caps flex items-center gap-1 shadow-sm"><span className="material-symbols-outlined text-[12px]">trending_down</span> Lowest Found</div>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center gap-xs z-10 bg-[#EFF6FF] px-2">
              <div className="w-10 h-10 rounded-full bg-surface-container-lowest border-2 border-primary-container text-primary-container flex items-center justify-center font-bold font-data-mono shadow-sm">3</div>
              <span className="font-body-md text-body-md font-medium text-on-surface mt-2">Award Contract</span>
            </div>
            {/* Step 4 */}
            <div className="flex flex-col items-center gap-xs z-10 bg-[#EFF6FF] px-2 relative">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container border-2 border-primary-container flex items-center justify-center font-bold font-data-mono shadow-sm"><span className="material-symbols-outlined">check</span></div>
              <span className="font-body-md text-body-md font-medium text-on-surface mt-2">Generate Invoice</span>
              <div className="absolute -bottom-8 right-[-10px] bg-surface-container-lowest border border-outline-variant text-on-surface-variant text-[10px] px-2 py-1 rounded-md font-label-caps flex items-center gap-1 shadow-sm"><span className="material-symbols-outlined text-[12px]">picture_as_pdf</span> PDF Ready</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-surface-container-lowest rounded-[24px] p-xl flex flex-col items-center justify-center gap-md text-center shadow-popover max-w-3xl mx-auto w-full border border-outline-variant/20 mt-lg">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Ready to stop drowning in spreadsheets?</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">Experience a unified procurement workspace designed for speed and compliance.</p>
          <form className="flex flex-col sm:flex-row gap-xs w-full max-w-md mt-4" onSubmit={(e) => e.preventDefault()}>
            <input className="flex-grow rounded-btn border border-outline-variant px-4 py-3 font-body-md text-body-md focus:border-primary focus:ring-2 focus:ring-primary-container/30 focus:outline-none transition-all" placeholder="Enter your work email" required="" type="email" />
            <button className="bg-primary-container text-on-primary-container rounded-btn px-6 py-3 font-body-md text-body-md font-medium hover:bg-primary-fixed transition-colors shadow-sm focus:ring-2 focus:ring-primary-container focus:outline-none whitespace-nowrap" type="submit">Request Demo</button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest dark:bg-surface-container-lowest w-full py-lg bg-surface-container-high dark:bg-surface-container-highest flex flex-col md:flex-row justify-between items-center px-gutter max-w-container-max mx-auto gap-md border-t border-outline-variant/20 mt-auto">
        <div className="font-headline-md text-headline-md font-bold text-on-surface text-primary dark:text-inverse-primary">VendorBridge</div>
        <div className="font-body-sm text-body-sm text-on-surface-variant dark:text-surface-variant">© 2024 VendorBridge ERP. All rights reserved.</div>
        <div className="flex gap-sm font-body-sm text-body-sm">
          <Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-secondary-fixed transition-colors hover:underline" to="#">Privacy Policy</Link>
          <Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-secondary-fixed transition-colors hover:underline" to="#">Terms of Service</Link>
          <Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-secondary-fixed transition-colors hover:underline" to="#">Cookie Settings</Link>
          <Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-secondary-fixed transition-colors hover:underline" to="#">Contact Sales</Link>
        </div>
      </footer>
    </div>
  );
}
