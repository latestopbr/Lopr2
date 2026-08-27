export function SceneFallback() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-base" aria-hidden="true">
      <div
        className="absolute left-[10%] top-[15%] h-[420px] w-[420px] rounded-full opacity-30 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)' }}
      />
      <div
        className="absolute right-[8%] top-[35%] h-[480px] w-[480px] rounded-full opacity-25 blur-[130px]"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }}
      />
      <div
        className="absolute bottom-[5%] left-[30%] h-[380px] w-[380px] rounded-full opacity-20 blur-[110px]"
        style={{ background: 'radial-gradient(circle, #ec4899, transparent 70%)' }}
      />
    </div>
  )
}
