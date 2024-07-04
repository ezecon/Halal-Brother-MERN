export default function HeroSection() {
  return (
    <div>
      <section id="hero" className="min-h-[80vh] p-20 md:p-20 flex items-center">
        <div className="hero container mx-auto">
          <div className="text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">Hello, <span></span></h1>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">Welcome to <span></span></h1>
            <h1 className="mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">Halal Brothers <span></span></h1>
            <a className="mb-10 text-white get-button">Get Started</a>
          </div>
        </div>
      </section>
    </div>
  )
}
