import Image from 'next/image'

// Development branch test
export default function Home() {
  return (
    <main className="page-wrapper">
      {/* Hero Section - Template Pages Hero */}
      <section className="section template-pages-hero">
        <div className="container-default w-container">
          {/* Text Block (top) */}
          <div className="text-center">
            <p className="color-neutral-400 mg-bottom-40px">
              <span className="text-span">
                <strong className="bold-text">Quantum Growth</strong> helps tech-enabled founders (SaaS, coaches, and agency owners) unlock revenue growth at 
              </span>
              <span className="text-span-2"> AI speed </span>
              <br />
              <span className="subheading-text">
                Combining strategic consulting, DFY systems and proprietary AI workflows to generate maximum output with minimal input.
              </span>
            </p>
          </div>
          
          {/* Image Block (bottom) */}
          <div className="image-container">
            <Image 
              src="/dddd (2000 x 1400 px).svg" 
              loading="lazy" 
              alt="AI Brain Graphic" 
              className="image"
              width={800}
              height={560}
            />
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="container-default w-container">
          <div className="footer-content">
            <Image 
              src="/qgp-logo.svg" 
              alt="QGP Logo" 
              className="footer-logo"
              width={200}
              height={69}
            />
          </div>
        </div>
      </footer>
    </main>
  )
} 