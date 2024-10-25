import Card from "./components/Card"

function App() {
  return (
    <main className="bg-green-700 min-h-screen p-10">
      <Card symbole="CLOVER" value="A" />
      <Card symbole="HEART" value={2} />
      <Card symbole="SPADE" value={3} />
      <Card symbole="DIAMOND" value={4} />
    </main>
  )
}

export default App
