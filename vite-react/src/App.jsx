import { useState, useEffect } from 'react'
import './App.css'

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function calculateWinner(sq) {
  for (let [a, b, c] of LINES) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) return sq[a]
  }
  return null
}

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  )
}

function evaluate(sq, depth) {
  const w = calculateWinner(sq)
  if (w === 'O') return 10 - depth
  if (w === 'X') return -10 + depth
  return 0
}

function minimax(sq, depth, isMaximizing) {
  const winner = calculateWinner(sq)
  if (winner || sq.every(Boolean)) return evaluate(sq, depth)

  if (isMaximizing) {
    let best = -Infinity
    for (let i = 0; i < 9; i++) {
      if (!sq[i]) {
        sq[i] = 'O'
        best = Math.max(best, minimax(sq, depth + 1, false))
        sq[i] = null
      }
    }
    return best
  } else {
    let best = Infinity
    for (let i = 0; i < 9; i++) {
      if (!sq[i]) {
        sq[i] = 'X'
        best = Math.min(best, minimax(sq, depth + 1, true))
        sq[i] = null
      }
    }
    return best
  }
}

function findBestMove(sq) {
  let bestScore = -Infinity
  let move = -1
  for (let i = 0; i < 9; i++) {
    if (!sq[i]) {
      sq[i] = 'O'
      const score = minimax(sq, 0, false)
      sq[i] = null
      if (score > bestScore) {
        bestScore = score
        move = i
      }
    }
  }
  return move
}

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true) // human is X

  const winner = calculateWinner(squares)

  function handleClick(i) {
    if (winner || squares[i] || !xIsNext) return
    const next = squares.slice()
    next[i] = 'X'
    setSquares(next)
    setXIsNext(false)
  }

  useEffect(() => {
    if (!xIsNext && !winner && !squares.every(Boolean)) {
      const id = setTimeout(() => {
        const mv = findBestMove(squares.slice())
        if (mv >= 0) {
          const next = squares.slice()
          next[mv] = 'O'
          setSquares(next)
        }
        setXIsNext(true)
      }, 250)
      return () => clearTimeout(id)
    }
  }, [xIsNext, squares, winner])

  function reset(aiStarts = false) {
    setSquares(Array(9).fill(null))
    setXIsNext(!aiStarts)
  }

  const status = winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? 'Draw'
    : `Next: ${xIsNext ? 'X (you)' : 'O (computer)'}`

  return (
    <div className="game-root">
      <h1>Tic‑Tac‑Toe (vs Computer)</h1>
      <div className="game">
        <div className="board">
          {squares.map((s, i) => (
            <Square key={i} value={s} onClick={() => handleClick(i)} />
          ))}
        </div>
        <div className="info">
          <div className="status">{status}</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="reset" onClick={() => reset(false)}>Reset (You start)</button>
            <button className="reset" onClick={() => reset(true)}>Reset (AI starts)</button>
          </div>
        </div>
      </div>
    </div>
  )
}
