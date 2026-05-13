export default function CareerLoading() {
  return (
    <main>
      <section className="section" style={{ paddingTop: '12rem', background: '#f8faf8' }}>
        <div className="container">
          <div style={{ width: '50%', height: '2.5rem', background: 'rgba(0, 0, 0, 0.08)', borderRadius: '8px', marginBottom: '1rem' }} />
          <div style={{ width: '70%', height: '1rem', background: 'rgba(0, 0, 0, 0.04)', borderRadius: '4px', marginBottom: '3rem' }} />
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1rem' }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ padding: '1.5rem 2rem', background: 'rgba(0, 0, 0, 0.02)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(0, 0, 0, 0.05)' }}>
                <div>
                  <div style={{ width: '200px', height: '1.2rem', background: 'rgba(0, 0, 0, 0.06)', borderRadius: '4px', marginBottom: '0.5rem' }} />
                  <div style={{ width: '300px', height: '0.8rem', background: 'rgba(0, 0, 0, 0.03)', borderRadius: '4px' }} />
                </div>
                <div style={{ width: '100px', height: '36px', background: 'rgba(0, 0, 0, 0.06)', borderRadius: '6px' }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
