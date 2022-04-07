import React, { useState, useRef } from 'react'

let arr = ['', '', '', '', '', '', '', '', '']
const Board = () => {
	const [state, setState] = useState(() => Array(9).fill(''))
	// const [boardHistory, setBoardHistory] = useState([state])
	const [step, setStep] = useState(0)
	const [player, setPlayer] = useState('O')
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
		// console.log('temp: ', temp);

		setState(temp)
		setStep(step + 1)
		// setBoardHistory(prevState => ([...prevState, temp]))
	    // console.log(boardHistory)

	}

	React.useEffect(() => {
		let res = checkWinner()
		if (!res && step !== 8) {
			player === 'X' ? setPlayer('O') : setPlayer('X')
		}
		else if (!res && step === 8) {
			setStatus("Nobody Wons!")
		}
		else {
			setWinner(`Winner: Player ${res}`)

		}
	}, [state, step])

	const onRestart = () => {
		setState(() => Array(9).fill(''))
		// setBoardHistory([state])

		setStep(0)
		setWinner('')
		setPlayer('O')
	}


	return (
		<div className='boardWrapper'>
			{(!winner && step <= 8) ? <h2 className='text-light'>It's your turn Player <span>{player}</span> </h2> : <h2 className='text-light'>{winner || status} </h2>}

			<div className="boxWrapper">
				{state.map((e, i) => {
					return (
						<button key={i} className='box' value={i} disabled={e || winner} onClick={handleClick}>{e}</button>
					)
				})}
			</div>
			<button className="btn btn-info my-3" disabled={state.every((e)=>e==='')} onClick={onRestart}>Restart</button>
			{/* <div className="d-flex flex-wrap justify-content-center p-1 m-2">
				{moves}
			</div> */}
		</div>
	)
}

export default Board