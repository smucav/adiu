export default function AboutLoading() {
  return (
    <main>
      <section style={{ 
        minHeight: '80vh', 
        background: 'linear-gradient(135deg, var(--hero-bg-start) 0%, var(--hero-bg-end) 100%)', 
        position: 'relative', 
        padding: '15vh 0 6rem' 
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' as const }}>
            <div style={{ width: '70%', height: '3rem', background: 'rgba(255,255,255,0.12)', borderRadius: '8px', margin: '0 auto 1.5rem' }} />
            <div style={{ width: '90%', height: '1rem', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', margin: '0 auto 0.5rem' }} />
            <div style={{ width: '60%', height: '1rem', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', margin: '0 auto' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginTop: '4rem' }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ textAlign: 'center' as const }}>
                <div style={{ width: '80px', height: '2.5rem', background: 'rgba(255,255,255,0.12)', borderRadius: '6px', margin: '0 auto 0.5rem' }} />
                <div style={{ width: '120px', height: '0.8rem', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
