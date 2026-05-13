import styles from "./page.module.css";

export default function HomeLoading() {
  return (
    <main>
      {/* Hero skeleton */}
      <section style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, var(--hero-bg-start) 0%, var(--hero-bg-end) 100%)', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '15vh', gap: '2rem' }}>
          <div style={{ flex: 1, maxWidth: '600px' }}>
            <div style={{ width: '80%', height: '3.5rem', background: 'rgba(255,255,255,0.12)', borderRadius: '8px', marginBottom: '1rem' }} />
            <div style={{ width: '60%', height: '3.5rem', background: 'rgba(255,255,255,0.08)', borderRadius: '8px', marginBottom: '2rem' }} />
            <div style={{ width: '90%', height: '1.2rem', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', marginBottom: '0.5rem' }} />
            <div style={{ width: '70%', height: '1.2rem', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', marginBottom: '2rem' }} />
            <div style={{ width: '180px', height: '48px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '500px', height: '400px', background: 'rgba(255,255,255,0.08)', borderRadius: '16px' }} />
          </div>
        </div>
      </section>

      {/* Features skeleton */}
      <section className="section" style={{ background: '#f8faf8' }}>
        <div className="container" style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{ width: '100%', height: '300px', background: 'rgba(0,0,0,0.04)', borderRadius: '12px', marginBottom: '1.5rem' }} />
            <div style={{ width: '60%', height: '2rem', background: 'rgba(0,0,0,0.06)', borderRadius: '6px', marginBottom: '1rem' }} />
            <div style={{ width: '80%', height: '1rem', background: 'rgba(0,0,0,0.03)', borderRadius: '4px' }} />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' as const, gap: '1rem' }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>
                <div style={{ width: '50%', height: '1.2rem', background: 'rgba(0,0,0,0.06)', borderRadius: '4px', marginBottom: '0.5rem' }} />
                <div style={{ width: '90%', height: '0.8rem', background: 'rgba(0,0,0,0.03)', borderRadius: '4px' }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
