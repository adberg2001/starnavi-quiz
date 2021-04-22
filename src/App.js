import React, {useEffect, useState} from "react";
import "./app.scss"

export default function App() {
  const [fields, setFields] = useState(null)
  const [mode, setMode] = useState('easyMode')
  const [blocks, setBlocks] = useState([])
  const fieldSizeByMode = (fields?.[mode]?.field || 5) * 10
  const [colors, setColors] = useState([])
  const [history, setHistory] = useState([])
  const [start, setStart] = useState(false)

  useEffect(() => {
    fetch('https://demo1030918.mockable.io/')
      .then(res => res.json())
      .then(data => setFields(data))
      .catch(error => alert(error.message))
  }, [])

  useEffect(() => {
    setBlocks([])
    setColors([])
    setHistory([])
    for (let i = 0; i < 25; i++) {
      setBlocks(s => [...s, i])
      setColors(s => ({...s, [i]: true}))
    }
  }, [])
  console.log(history)
  return (
    <div className="App">
      <div className="actions">
        <select name='field-set' value={mode} onChange={e => setMode(e.target.value)}>
          <option value="easyMode">Easy mode</option>
          <option value="normalMode">Normal mode</option>
          <option value="hardMode">Hard mode</option>
        </select>
        <button onClick={() => setStart(s => !s)}>{start ? "END" : "START"}</button>
      </div>
      <div className="body">
        <div className="table">
          {blocks.length && blocks.map((b, i) =>
            <div key={`${i}-table-blocks`}
                 style={{
                   width: fieldSizeByMode,
                   height: fieldSizeByMode,
                   backgroundColor: start ? colors[i] ? "#005cff" : "#fff" : "#707070"
                 }}
                 onMouseEnter={() => {
                   start && setColors(s => ({...s, [i]: !s[i]}))
                   start && setHistory( s => [...s, i])
                 }}
                 className="blocks"/>
          )}
        </div>
        <div className="window">
          {history.map( h => (
            <div className="el">
              row: {Math.floor(h / 5) + 1},
              col: {(h % 5) + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
