export default function ProjectsLoading() {
  return (
    <main>
      <section className="section" style={{ paddingTop: '12rem', background: '#f8faf8' }}>
        <div className="container" style={{ textAlign: 'center' as const }}>
          <div style={{ width: '50%', height: '2.5rem', background: 'rgba(0, 0, 0, 0.06)', borderRadius: '8px', margin: '0 auto 1.5rem' }} />
          <div style={{ width: '70%', height: '1rem', background: 'rgba(0, 0, 0, 0.04)', borderRadius: '4px', margin: '0 auto 3rem' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[1,2,3,4,5,6].map(i => (
              <div key={i} style={{ height: '350px', background: 'rgba(0, 0, 0, 0.02)', borderRadius: '16px', border: '1px solid rgba(0, 0, 0, 0.05)' }} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
