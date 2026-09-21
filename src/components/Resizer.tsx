import { useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'

type Props = {
  axis: 'x' | 'y'
  onDelta: (delta: number) => void
}

export function Resizer({ axis, onDelta }: Props) {
  const last = useRef(0)
  const elRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)

  const down = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.preventDefault()
    elRef.current?.setPointerCapture(e.pointerId)
    last.current = axis === 'x' ? e.clientX : e.clientY
    document.body.classList.add(axis === 'x' ? 'resizing-x' : 'resizing-y')
    setDragging(true)
  }

  const move = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!elRef.current?.hasPointerCapture(e.pointerId)) return
    const pos = axis === 'x' ? e.clientX : e.clientY
    onDelta(pos - last.current)
    last.current = pos
  }

  const up = (e: ReactPointerEvent<HTMLDivElement>) => {
    elRef.current?.releasePointerCapture(e.pointerId)
    document.body.classList.remove('resizing-x', 'resizing-y')
    setDragging(false)
  }

  return (
    <div
      ref={elRef}
      className={`splitter splitter-${axis}${dragging ? ' dragging' : ''}`}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
    />
  )
}
