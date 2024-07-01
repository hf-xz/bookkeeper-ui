import Today from '@/components/today/Today'

function App() {
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1>记账工具</h1>
      <div className="card w-min">
        <Today />
      </div>
    </div>
  )
}

export default App
