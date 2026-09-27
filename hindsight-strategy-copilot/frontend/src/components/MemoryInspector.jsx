import React from 'react'

export default function MemoryInspector({ memoryLogs = [] }) {
  return (
    <div>
      <h3 style={{ marginTop: 0, color: '#a855f7' }}>Hindsight Memory Inspector</h3>
      <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
        Grounding LLM reasoning via active Experience & World Memory networks.
      </p>

      {memoryLogs && memoryLogs.length > 0 ? (
        <div style={{ marginTop: '15px' }}>
          {memoryLogs.map((mem, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#1e293b',
                padding: '10px',
                borderRadius: '6px',
                marginBottom: '10px',
                borderLeft: '3px solid #a855f7'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#38bdf8', marginBottom: '4px' }}>
                Bank: {mem.bank || 'Experience'}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#f1f5f9' }}>
                {typeof mem === 'string' ? mem : mem.fact || mem.text}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#0f172a',
            border: '1px dashed #334155',
            borderRadius: '6px',
            color: '#64748b',
            fontSize: '0.85rem'
          }}
        >
          No active memories recalled yet. Ingest data or query the co-pilot to view ground facts.
        </div>
      )}
    </div>
  )
}