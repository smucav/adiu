export default function ContactLoading() {
  return (
    <main>
      <section className="section" style={{ paddingTop: '12rem', background: '#f8faf8' }}>
        <div className="container" style={{ textAlign: 'center' as const }}>
          <div style={{ width: '40%', height: '2.5rem', background: 'rgba(0, 0, 0, 0.08)', borderRadius: '8px', margin: '0 auto 1rem' }} />
          <div style={{ width: '60%', height: '1rem', background: 'rgba(0, 0, 0, 0.04)', borderRadius: '4px', margin: '0 auto 3rem' }} />
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <div style={{ width: '250px', padding: '2rem', background: 'rgba(0, 0, 0, 0.02)', borderRadius: '12px', border: '1px solid rgba(0, 0, 0, 0.05)' }}>
              <div style={{ width: '60%', height: '1rem', background: 'rgba(0, 0, 0, 0.06)', borderRadius: '4px', marginBottom: '0.5rem' }} />
              <div style={{ width: '80%', height: '0.8rem', background: 'rgba(0, 0, 0, 0.03)', borderRadius: '4px' }} />
            </div>
            <div style={{ width: '250px', padding: '2rem', background: 'rgba(0, 0, 0, 0.02)', borderRadius: '12px', border: '1px solid rgba(0, 0, 0, 0.05)' }}>
              <div style={{ width: '60%', height: '1rem', background: 'rgba(0, 0, 0, 0.06)', borderRadius: '4px', marginBottom: '0.5rem' }} />
              <div style={{ width: '80%', height: '0.8rem', background: 'rgba(0, 0, 0, 0.03)', borderRadius: '4px' }} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
