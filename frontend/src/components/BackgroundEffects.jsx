const BackgroundEffects = () => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -right-40 -top-32 h-[480px] w-[480px] rounded-full blur-[60px] theme-transition"
        style={{ backgroundColor: "var(--glow-orange)" }}
      />
      <div
        className="absolute right-[15%] top-[20%] h-64 w-64 rounded-full blur-[40px] theme-transition"
        style={{ backgroundColor: "var(--glow-neutral)" }}
      />
    </div>
  );
};

export default BackgroundEffects;
