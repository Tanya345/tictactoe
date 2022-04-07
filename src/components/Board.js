import React, { useState, useRef } from 'react'
import Box from './Box'

let arr = ['', '', '', '', '', '', '', '', '']
const Board = () => {
	const [state, setState] = useState(() => Array(9).fill(''))
	const [boardHistory, setBoardHistory] = useState([state])
	const [step, setStep] = useState(0)
	const [player, setPlayer] = useState('X')
	const [winner, setWinner] = useState('')
	const [status, setStatus] = useState('')

	const checkWinner = () => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (state[a] && state[a] === state[b] && state[a] === state[c]) {
				return state[a];
			}
		}
		return false;
	}

	const handleClick = (e) => {
		let temp = [...state]
		temp[e.target.value] = player
		setState(temp)
		setStep(step + 1)
		// setBoardHistory(prevState => ([...prevState, state]))
		console.log(state)
		// console.log(boardHistory)
		let res = checkWinner()
		if (!res && step !== 8) {
			player === 'X' ? setPlayer('O') : setPlayer('X')
		}
		else if (!res && step === 8) {
			setStatus("Nobody Wons!")
		}
		else {
			setWinner(`Winner: Player ${res}`)
			console.log('winner', winner)
		}
	}

	const onRestart = () => {
		setState(() => Array(9).fill(''))
		setBoardHistory([state])
		console.log('Restart', state)
		setStep(0)
		setWinner('')
		setPlayer('X')
	}

	// const jumpTo = (jumpStep) => {
	// const tempStep = step;
	// 	const stepDiff = tempStep - jumpStep
	// 	setBoardHistory(prevState => {
	// 		let tempHist = [...prevState];
	// 		tempHist.splice(tempHist.length - stepDiff, stepDiff)
	// 		return tempHist
	// 	})
	// 	console.log('jumpTo', boardHistory);
	// 	setStep(jumpStep);
	// 	step % 2 === 0 ? setPlayer('X') : setPlayer('O');
	// 	setWinner('')
	// }

	// const moves = boardHistory.map((step, move) => {
	// 	const dest = move ? `#${move}` : "0";
	// 	return (
	// 		// <li className="mx-2" key={move} style={{ listStyle: 'none' }}>
	// 		<button key={move} className='btn btn-sm text-info btn-dark m-2 d-flex align-items-center' style={{ height: '28px', borderRadius: '18px' }} onClick={() => jumpTo(move)}>{dest}</button>
	// 		// </li>
	// 	)
	// });

	return (
		<div className='boardWrapper'>
			{(!winner && step <= 8) ? <h2 className='text-light'>It's you turn Player <span>{player}</span> </h2> : <h2 className='text-light'>{winner || status} </h2>}

			<div className="boxWrapper">
				{state.map((e, i) => {
					return (
						<button key={i} className='box' value={i} disabled={e} onClick={handleClick}>{e}</button>
					)
				})}
			</div>
			<button className="btn btn-info my-3" onClick={onRestart}>Restart</button>
			{/* <div className="d-flex flex-wrap justify-content-center p-1 m-2">
				{moves}
			</div> */}
		</div>
	)
}

export default Board