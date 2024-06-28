import Today from '@/components/today/Today'

import './App.css'

const test = () => {
  Fetch.get('student').then((res) => {
    console.log(res)
    // Handle res
  })
}

function App() {
  return (
    <>
      <h1>记账工具</h1>
      <div className="card">
        <Today />
      </div>
      <button onClick={test}>test</button>
    </>
  )
}

export default App
