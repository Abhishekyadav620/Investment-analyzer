const PageContainer = ({ children, className = "" }) => {
  return (
    <div
      className={`mx-auto w-full max-w-[1400px] grid-cols-12 px-6 md:px-12 lg:px-20 ${className}`}
    >
      {children}
    </div>
  );
};

export default PageContainer;
