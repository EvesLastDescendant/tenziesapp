import React, {useState, useEffect} from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti";
import Die from "./Die"

export default function App() {
    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [roll, setRoll] = useState(0)
    const [gameTime, setGameTime] = useState(0)
    const [topTime, setTopTime] = useState(
        JSON.parse(localStorage.getItem("topTime")) || null
    )

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }


    function allNewDice() {
        const newDice = []
        for ( let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    useEffect(() => {
        const playerTopTime = localStorage.getItem("topTime")
        if (tenzies) {
            if (!playerTopTime) {
                localStorage.setItem("topTime", JSON.stringify(gameTime))
            } else if (gameTime < playerTopTime) {
                setTopTime(topTime)
            }
        }
    }, [tenzies, topTime])

    useEffect(() => {
        if (!tenzies) {
            let sec = setInterval(() => {
                setGameTime(prevTime => prevTime + 1)
            }, 1000)
            return () => {
                clearInterval(sec)
            }
        } else {
            setGameTime((prevTime) => prevTime)
        }
    }, [tenzies])

    useEffect(() => {
        const firstValue = dice[0].value
        const allHeld = dice.every(die => die.isHeld)
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice]
    )
    

    function rollDice() {
        if (!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                die : 
                generateNewDie()
            }))
            setRoll(prevRoll => prevRoll + 1)
        } else {
            setDice(allNewDice())
            setTenzies(false)
            setRoll(0)
            setGameTime(0)
        }
    }

    function holdDice(id) {
        // using dice.map
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?
                {...die, isHeld: !die.isHeld} : die
        }))
    }

    const diceElements = dice.map(die => {
        return(
            <Die
                key={die.id}
                value={die.value}
                held={die.isHeld}
                hold={() => holdDice(die.id)} 
            />
        )
    })
    
    return (
        <React.StrictMode>
            <main>
                {tenzies && <Confetti />}
                <div className="header">
                    {tenzies && <span className="head">{roll} Rolls</span>}
                    {tenzies && <span className="head">{parseFloat(gameTime)} seconds</span> }
                </div>
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same. 
                    Click each die to freeze it at its current value between 
                    rolls.
                </p>
                <div className="container">
                    {diceElements}
                </div>
                <button 
                    className="roll--reset"
                    onClick={rollDice}
                >
                    {tenzies ? "New Game": "Roll"}
                </button>
            </main>
        </React.StrictMode>
    )
    
}
