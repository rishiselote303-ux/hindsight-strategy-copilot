import React, { useState } from 'react'

export default function ChatPanel({ setChartData, setMemoryLogs }) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: 'Hello! I am your Strategy Co-Pilot. Click "Ingest 6-Month Data" or ask a strategic question to begin.'
    }
  ])
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return
    const userMsg = input
    setInput('')
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }])
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      })
      const data = await res.json()

      setMessages((prev) => [
        ...prev,
        { sender: 'assistant', text: data.response || JSON.stringify(data) }
      ])

      if (data.chart_data) setChartData(data.chart_data)
      if (data.recalled_memories) setMemoryLogs(data.recalled_memories)
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'assistant', text: 'Error connecting to FastAPI backend.' }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleIngest = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/ingest', { method: 'POST' })
      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: data.status || 'Data successfully ingested into Hindsight Memory Banks!'
        }
      ])
      if (data.memories) setMemoryLogs(data.memories)
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'assistant', text: 'Failed to ingest data.' }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h3 style={{ margin: 0, color: '#f8fafc' }}>Autonomous Strategy Panel</h3>
        <button
          onClick={handleIngest}
          style={{
            backgroundColor: '#0284c7',
            color: '#fff',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Ingest 6-Month Data
        </button>
      </div>

      {/* Messages Scroll Container */}
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '10px', paddingRight: '5px' }}>
        {messages.map((m, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: '10px',
              textAlign: m.sender === 'user' ? 'right' : 'left'
            }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: '8px 12px',
                borderRadius: '8px',
                backgroundColor: m.sender === 'user' ? '#2563eb' : '#334155',
                color: '#f8fafc',
                maxWidth: '80%',
                textAlign: 'left'
              }}
            >
              {m.text}
            </span>
          </div>
        ))}
        {loading && <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Processing strategy request...</div>}
      </div>

      {/* Chat Input Area */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask strategic question (e.g., Q3 pricing strategy)..."
          style={{
            flex: 1,
            padding: '8px 12px',
            backgroundColor: '#0f172a',
            border: '1px solid #475569',
            borderRadius: '4px',
            color: '#f8fafc'
          }}
        />
        <button
          onClick={handleSend}
          style={{
            backgroundColor: '#16a34a',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}