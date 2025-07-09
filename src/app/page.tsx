import Image from 'next/image'

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
              <span style={{ fontSize: '20px', fontWeight: 500, lineHeight: '1.6' }}>
                Combining strategic consulting, DFY systems and proprietary AI workflows to generate maximum output with minimal input.
              </span>
            </p>
          </div>
          
          {/* Image Block (bottom) */}
          <div className="image-container">
            <Image 
              src="/AI BRAIN.svg" 
              loading="lazy" 
              alt="AI Brain Graphic" 
              className="image"
              width={400}
              height={400}
            />
          </div>
        </div>
      </section>
    </main>
  )
} 