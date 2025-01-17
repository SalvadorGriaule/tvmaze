import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Result from './Componants/Result'
import './App.css'
import { useRef } from 'react'
import { useCallback } from 'react'

function App() {
  let catgInput = useRef()
  let searchInput = useRef()

  let [input,setInput] = useState({catg: "",search: ""})
  
  const send = useCallback(() => {
    setInput({catg: catgInput.current.value,search : searchInput.current.value})
  })

  return (
    <main>
      <section className='space-x-2 ml-2 h-8'>
        <select className='p-1 h-full bg-zinc-300' ref={catgInput} name="catg" id="">
          <option value="Nom">Nom</option>
          <option value="acteur">Acteur</option>
        </select>
        <input className='border-black border-solid border-2 p-1 h-full' ref={searchInput} type="text" placeholder='Recherche' />
        <input className='bg-zinc-300 p-1 rounded-md h-full' onClick={send} type="submit" value="Cherche" />
      </section>
      <section>
      <Result catg={input.catg} search={input.search}/>
      </section>
    </main>
  )
}

export default App
