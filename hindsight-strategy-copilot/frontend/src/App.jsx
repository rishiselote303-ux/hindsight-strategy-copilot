import React, { useState } from 'react'
import StrategyCanvas from './components/StrategyCanvas'
import ChatPanel from './components/ChatPanel'
import MemoryInspector from './components/MemoryInspector'

export default function App() {
  const [chartData, setChartData] = useState([
    { month: 'Jan', sales: 120000, projected_impact: 120000 },
    { month: 'Feb', sales: 115000, projected_impact: 115000 },
    { month: 'Mar', sales: 98000, projected_impact: 98000 },
    { month: 'Apr', sales: 92000, projected_impact: 92000 },
    { month: 'May', sales: 105000, projected_impact: 105000 },
    { month: 'Jun', sales: 110000, projected_impact: 110000 }
  ])

  const [memoryLogs, setMemoryLogs] = useState([])

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'Inter, system-ui, sans-serif',
      overflow: 'hidden'
    }}>
      {/* Left Main Dashboard View */}
      <div style={{
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #334155',
        overflowY: 'auto'
      }}>
        {/* Strategy Canvas / Dynamic Projections */}
        <div style={{ flex: 1, padding: '20px', borderBottom: '1px solid #334155' }}>
          <StrategyCanvas chartData={chartData} />
        </div>

        {/* Conversational Co-Pilot Panel */}
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#1e293b' }}>
          <ChatPanel 
            setChartData={setChartData} 
            setMemoryLogs={setMemoryLogs} 
          />
        </div>
      </div>

      {/* Right Hindsight Memory Inspector Sidebar */}
      <div style={{
        flex: 1,
        minWidth: '340px',
        maxWidth: '420px',
        backgroundColor: '#020617',
        padding: '20px',
        overflowY: 'auto'
      }}>
        <MemoryInspector memoryLogs={memoryLogs} />
      </div>
    </div>
  )
}