import React, { useEffect, useState } from 'react'

const samples = ['saflk', 'test3', 'tese4']

export default function({
  suggestions = samples,
  onChange,
  onSelect,
  value = '',
  visible = true,
}) {
  const [sValue, setSValue] = useState(value)
  // allows prop change > local state change ie rerender 
  useEffect(() => {
    setSValue(value)
  }, [value])

  const onLChange = e => {
    setSValue(e.target.value)
    onChange(e)
  }
  return (
    <div className="c-ac">
      <input onChange={onLChange} className="c-ac__input" value={sValue} />

      {visible && suggestions.length > 0 && (
        <div className="c-ac__suggestions">
          {suggestions.map((item, i) => (
            <div
              key={i}
              onClick={() => onSelect(item)}
              className="c-suggestions__item"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
