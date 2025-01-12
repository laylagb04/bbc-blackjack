
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import dealCards from './components/deal'
import stand from './Components/stand'
import hit from './Components/hit'
import bust from './components/bust'



function App() {

  const [currentCards, setCurrentCards] = useState([])
  const [gameStatus, setGameStatus] = useState('Not Playing')
const [totalScore, setTotalScore] = useState(0)
const [losingDisplay, setLosingDisplay] = useState(false)
const [acePresent, setAcePresent] = useState(false)

  const [allCards, setAllCards] = useState(["Ace of Diamonds", "2 of Diamonds", "3 of Diamonds", "4 of Diamonds", "5 of Diamonds", "6 of Diamonds", "7 of Diamonds", "8 of Diamonds", "9 of Diamonds", "10 of Diamonds", "Jack of Diamonds", "Queen of Diamonds", "King of Diamonds", 
    "Ace of Hearts", "2 of Hearts", "3 of Hearts", "4 of Hearts", "5 of Hearts", "6 of Hearts", "7 of Hearts", "8 of Hearts", "9 of Hearts", "10 of Hearts", "Jack of Hearts", "Queen of Hearts", "King of Hearts", 
    "Ace of Clubs", "2 of Clubs", "3 of Clubs", "4 of Clubs", "5 of Clubs", "6 of Clubs", "7 of Clubs", "8 of Clubs", "9 of Clubs", "10 of Clubs", "Jack of Clubs", "Queen of Clubs", "King of Clubs", 
    "Ace of Spades", "2 of Spades", "3 of Spades", "4 of Spades", "5 of Spades", "6 of Spades", "7 of Spades", "8 of Spades", "9 of Spades", "10 of Spades", "Jack of Spades", "Queen of Spades", "King of Spades"])



    useEffect(()=> {
      if (totalScore > 21){
        setGameStatus('Not Playing');
        setCurrentCards([])
          
          setLosingDisplay(true)
          setAllCards(["Ace of Diamonds", "2 of Diamonds", "3 of Diamonds", "4 of Diamonds", "5 of Diamonds", "6 of Diamonds", "7 of Diamonds", "8 of Diamonds", "9 of Diamonds", "10 of Diamonds", "Jack of Diamonds", "Queen of Diamonds", "King of Diamonds", 
            "Ace of Hearts", "2 of Hearts", "3 of Hearts", "4 of Hearts", "5 of Hearts", "6 of Hearts", "7 of Hearts", "8 of Hearts", "9 of Hearts", "10 of Hearts", "Jack of Hearts", "Queen of Hearts", "King of Hearts", 
            "Ace of Clubs", "2 of Clubs", "3 of Clubs", "4 of Clubs", "5 of Clubs", "6 of Clubs", "7 of Clubs", "8 of Clubs", "9 of Clubs", "10 of Clubs", "Jack of Clubs", "Queen of Clubs", "King of Clubs", 
            "Ace of Spades", "2 of Spades", "3 of Spades", "4 of Spades", "5 of Spades", "6 of Spades", "7 of Spades", "8 of Spades", "9 of Spades", "10 of Spades", "Jack of Spades", "Queen of Spades", "King of Spades"])
        
      }
    }, [totalScore])


    
function handleDeal(){
const {drawnCards, updatedDeck, totalValue }  = dealCards(allCards)
setTotalScore(totalValue)

setCurrentCards(drawnCards)
setAllCards(updatedDeck)
setGameStatus('Playing')


const aces = drawnCards.filter(card => card.includes('Ace'))
setAcePresent(aces.length > 0)


}



function handleHit(){
  const {drawnCards, updatedDeck, totalValue} = hit(allCards)
  
setAllCards(updatedDeck)
setCurrentCards(prevCards => [...prevCards, ...drawnCards])

setTotalScore(prevScore => prevScore + totalValue)

const aces = drawnCards.filter(card => card.includes('Ace'))
setAcePresent(aces.length > 0)

}

function handleLoss(){
  setLosingDisplay(false)
  setTotalScore(0)
  
}

function handleAce(value){
  if (value === 1){
    setTotalScore(totalScore + 1)
    setAcePresent(false)
  }
  if (value === 11)
    setTotalScore(totalScore + 11)
  setAcePresent(false)
  
}



return (
  <>
  <h1> Blackjack</h1>

{ acePresent ? (
      <div>
        <h2> Choose the value of the Ace</h2>
        <h2> Your current score is {totalScore} </h2>
        <button onClick={() => handleAce(1)}> 1</button>
        <button onClick={()=> handleAce(11)}> 11 </button>
      </div> 
    ) : (
        
     losingDisplay ? (
       <div>
        <h2> You lost with {totalScore} </h2>
         <button onClick={handleLoss}> Play again </button>
      </div>
    ) :  (
          gameStatus === 'Not Playing'  ? ( 
           <button onClick={handleDeal } > Deal </button>
              ) : (
            <div>
                 <button onClick={handleHit}>Hit</button>
                 <button onClick={stand}> Stand</button>
                  <h3> Your total is {totalScore} </h3>
            </div>
  )
)
)}
</>
)
}

export default App

