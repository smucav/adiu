export default function BlogLoading() {
  return (
    <main>
      <section className="section" style={{ paddingTop: '12rem', background: '#f8faf8' }}>
        <div className="container">
          <div style={{ width: '40%', height: '2.5rem', background: 'rgba(0, 0, 0, 0.08)', borderRadius: '8px', marginBottom: '1rem' }} />
          <div style={{ width: '60%', height: '1rem', background: 'rgba(0, 0, 0, 0.04)', borderRadius: '4px', marginBottom: '3rem' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {[1,2,3,4,5,6].map(i => (
              <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(0, 0, 0, 0.05)', background: '#fff' }}>
                <div style={{ width: '100%', height: '200px', background: 'rgba(0, 0, 0, 0.02)' }} />
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ width: '80%', height: '1.2rem', background: 'rgba(0, 0, 0, 0.06)', borderRadius: '4px', marginBottom: '0.5rem' }} />
                  <div style={{ width: '40%', height: '0.8rem', background: 'rgba(0, 0, 0, 0.03)', borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
