import About from "./components/About"
import Header from "./components/Header"
import Hero from "./components/Hero"

const App = () => {
  return (
    <div className="bg-gray-900">
      <Header/>
      <Hero/>
      <About/>
    </div>
  )
}

export default App