import { useEffect, useState } from "react"

export const useVisualMode = (initialMode) => {
  
  const [mode, setMode] = useState(initialMode)
  const [history, setHistory] = useState([initialMode])

  const transition = (toMode, skipLast = false) => {
    setMode(toMode)
    if (skipLast){
      setHistory(prev => {
        let newPrev = [...prev]
        newPrev.pop()
        return [...newPrev, toMode]
      })
    } else {
      setHistory(prev => [...prev, toMode])

    }
  }
  const back = () => {
    if (history.length > 1) {
      setHistory(prev => {
        let callStack = [...prev]
        callStack.pop()
        return callStack
      })
    }
  }

  useEffect(() => setMode(history[history.length - 1]), [history])

  return {mode, transition, back}

}