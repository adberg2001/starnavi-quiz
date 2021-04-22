import React, {useEffect, useState} from "react";
import "./app.scss"

export default function App() {
  const [fields, setFields] = useState(null)
  const [mode, setMode] = useState('easyMode')
  const [blocks, setBlocks] = useState([])
  const fieldSizeByMode = (fields?.[mode]?.field || 5) * 10
  const [colors, setColors] = useState([])

  useEffect(() => {
    fetch('https://demo1030918.mockable.io/')
      .then(res => res.json())
      .then(data => setFields(data))
      .catch(error => alert(error.message))
  }, [])

  useEffect(() => {
    setBlocks([])
    setColors([])
    for (let i = 0; i < 25; i++) {
      setBlocks(s => [...s, i])
      setColors(s => ({...s, [i]: true}))
    }
  }, [])

  return (
    <div className="App">
      <div className="actions">
        <select name='field-set' value={mode} onChange={e => setMode(e.target.value)}>
          <option value="easyMode">Easy mode</option>
          <option value="normalMode">Normal mode</option>
          <option value="hardMode">Hard mode</option>
        </select>
        <button>START</button>
      </div>
      <div className="table">
        {blocks.length && blocks.map((b, i) =>
          <div key={`${i}-table-blocks`}
               style={{
                 width: fieldSizeByMode,
                 height: fieldSizeByMode,
                 backgroundColor: colors[i] ? "#005cff" : "#fff"
               }}
               onMouseEnter={() => setColors(s => ({...s, [i]: !s[i]}))}
               className="blocks"/>
        )}
      </div>
    </div>
  );
}
