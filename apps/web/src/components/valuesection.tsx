export default function ValuesSection() {
  const values = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" fill="#059669"/>
        </svg>
      ),
      title: "Financial Education",
      description: "Simplifying complex markets into actionable steps for everyone.",
    },
    {
      icon: (
        <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 0L0 18.29L0.71 19L7.5 16L14.29 19L15 18.29L7.5 0Z" fill="#059669"/>
        </svg>
      ),
      title: "Confidence",
      description: "Building the inner strength to make bold financial decisions.",
    },
    {
      icon: (
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 0L0 4V10C0 15.55 3.84 20.74 9 22C14.16 20.74 18 15.55 18 10V4L9 0ZM9 10.99H16C15.47 15.11 12.72 18.78 9 19.93V11H2V5.3L9 2.19V10.99Z" fill="#059669"/>
        </svg>
      ),
      title: "Transparency",
      description: "Honest, bias-free guidance with no hidden agendas or fees.",
    },
    {
      icon: (
        <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 6C16.66 6 17.99 4.66 17.99 3C17.99 1.34 16.66 0 15 0C13.34 0 12 1.34 12 3C12 4.66 13.34 6 15 6ZM7 6C8.66 6 9.99 4.66 9.99 3C9.99 1.34 8.66 0 7 0C5.34 0 4 1.34 4 3C4 4.66 5.34 6 7 6ZM7 8C4.67 8 0 9.17 0 11.5V14H14V11.5C14 9.17 9.33 8 7 8ZM15 8C14.71 8 14.38 8.02 14.03 8.05C15.19 8.89 16 10.02 16 11.5V14H22V11.5C22 9.17 17.33 8 15 8Z" fill="#059669"/>
        </svg>
      ),
      title: "Community",
      description: "Growing together through shared experiences and support.",
    },
  ];

  return (
    <section className="w-full bg-[#f5f0e8] py-20 px-8 flex flex-col items-center relative overflow-hidden">

      {/* Background SVG lines */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <svg width="100%" height="100%" viewBox="0 0 1000 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <line x1="-100" y1="500" x2="900" y2="100" stroke="#677E73" strokeOpacity="0.2" strokeWidth="1"/>
          <line x1="-100" y1="600" x2="900" y2="200" stroke="#677E73" strokeOpacity="0.15" strokeWidth="1"/>
        </svg>
      </div>

      {/* Heading */}
      <div className="text-center mb-4 relative z-10">
        <h2 className="text-3xl font-bold text-[#1a3a2a]">
          What Drives Money Mati
        </h2>
        <div className="w-12 h-1 bg-[#10B981] mx-auto mt-3 rounded-full" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-5 max-w-5xl w-full mt-10 relative z-10">
        {values.map(({ icon, title, description }) => (
          <div
            key={title}
            className="bg-white rounded-2xl p-6 flex flex-col items-center text-center gap-4 shadow-sm"
          >
            {/* Icon */}
            <div className="bg-[#ECFDF5] p-3 rounded-xl w-fit flex items-center justify-center">
              {icon}
            </div>

            {/* Text */}
            <h3 className="text-sm font-bold text-[#1a3a2a]">{title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>

    </section>
  );
}