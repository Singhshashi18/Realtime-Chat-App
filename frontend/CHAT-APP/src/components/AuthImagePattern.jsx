
const AuthImagePattern = ({ title, subtitle }) => {
    return (
      <div className="lg:flex items-center justify-center bg-base-200 p-12">
        <div className="max-w-md text-center">
          {/* 3x3 Grid */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-2xl bg-gray-500 ${i % 2 === 0 ? "animate-pulse" : ""}`}
              />
            ))}
          </div>
          {/* Title & Subtitle */}
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-base-content/60">{subtitle}</p>
        </div>
      </div>
    );
  };
  export default AuthImagePattern;
  