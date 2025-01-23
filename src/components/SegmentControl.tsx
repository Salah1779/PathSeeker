import React, { useRef, useState, useEffect } from "react"
import type { CellType } from "../utils/types"
import "../styles/SegmentControl.css"

interface Segment {
  value: CellType
  label: string
  color: string
}

interface SegmentedControlProps {
  name: string
  segments: Segment[]
  callback: (value: CellType, index: number) => void
  defaultIndex?: number
}

const SegmentControl: React.FC<SegmentedControlProps> = ({ name, segments, callback, defaultIndex = 1 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)
  const controlRef = useRef<HTMLDivElement>(null)
  const [segmentRefs] = useState(() => segments.map(() => React.createRef<HTMLDivElement>()))

  useEffect(() => {
    const activeSegmentRef = segmentRefs[activeIndex]
    if (controlRef.current && activeSegmentRef.current) {
      const { offsetWidth, offsetLeft } = activeSegmentRef.current
      const { style } = controlRef.current

      style.setProperty("--highlight-width", `${offsetWidth}px`)
      style.setProperty("--highlight-x-pos", `${offsetLeft}px`)
      style.setProperty("--highlight-color", segments[activeIndex].color)
    }
  }, [activeIndex, segmentRefs, segments])

  const onInputChange = (value: CellType, index: number) => {
    setActiveIndex(index)
    callback(value, index)
  }

  return (
    <div className="controls-container" ref={controlRef}>
      <div className="controls">
        {segments.map((item, i) => (
          <div key={item.value} className={`segment ${i === activeIndex ? "active" : "inactive"}`} ref={segmentRefs[i]}>
            <input
              type="radio"
              value={item.value}
              id={`${name}-${item.label}`}
              name={name}
              onChange={() => onInputChange(item.value, i)}
              checked={i === activeIndex}
            />
            <label htmlFor={`${name}-${item.label}`}>{item.label}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SegmentControl;

