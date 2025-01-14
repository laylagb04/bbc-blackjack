
import { useEffect, useState } from 'react'

import './App.css'
import dealCards from './components/deal'

import hit from './Components/hit'
import bust from './components/bust'

import CardImage from './components/CardImage'

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

    const [gameMode, setGameMode] = useState(null)

    const [computersHand, setComputersHand] = useState([])
    const [computersScore, setComputersScore] = useState(0)

const [turn, setTurn] = useState('Player')
const [winningDisplay, setWinningDisplay] = useState(false)
const [drawDisplay, setDrawDisplay] = useState(false)


    useEffect(()=> {
      if (totalScore > 21){
        setGameStatus('Not Playing');
          setLosingDisplay(true)
          resetDeck();
 
        
      }
    }, [totalScore])

    useEffect(()=> {
      if (computersScore === 21 ){
        setGameStatus('Not Playing');
       
          
          setLosingDisplay(true)
          resetDeck()
      }
    }, [computersScore])
    
    useEffect(()=> {
      if (computersScore > 21 && totalScore != 21){
        setGameStatus('Not Playing');
      
          
          setWinningDisplay(true)
          resetDeck()
      }
    }, [computersScore])

    useEffect(() => {
      if (turn === 'Computer' && computersScore < 17){
        const delay = setTimeout(() => {
          computerHit(allCards)
        }, 1000)
      
        return () => clearTimeout(delay)
    }
  }, [turn, computersScore, allCards])

  

  
  useEffect(() => {
    if (totalScore === 21 && computersScore !== 21){ 
      setGameStatus('Not Playing');
        setWinningDisplay(true)
        resetDeck()
    }
  }, [totalScore])
  
   
    
    
function resetDeck(){
  setAllCards(["Ace of Diamonds", "2 of Diamonds", "3 of Diamonds", "4 of Diamonds", "5 of Diamonds", "6 of Diamonds", "7 of Diamonds", "8 of Diamonds", "9 of Diamonds", "10 of Diamonds", "Jack of Diamonds", "Queen of Diamonds", "King of Diamonds", 
    "Ace of Hearts", "2 of Hearts", "3 of Hearts", "4 of Hearts", "5 of Hearts", "6 of Hearts", "7 of Hearts", "8 of Hearts", "9 of Hearts", "10 of Hearts", "Jack of Hearts", "Queen of Hearts", "King of Hearts", 
    "Ace of Clubs", "2 of Clubs", "3 of Clubs", "4 of Clubs", "5 of Clubs", "6 of Clubs", "7 of Clubs", "8 of Clubs", "9 of Clubs", "10 of Clubs", "Jack of Clubs", "Queen of Clubs", "King of Clubs", 
    "Ace of Spades", "2 of Spades", "3 of Spades", "4 of Spades", "5 of Spades", "6 of Spades", "7 of Spades", "8 of Spades", "9 of Spades", "10 of Spades", "Jack of Spades", "Queen of Spades", "King of Spades"])

}


function handleDeal(){
  
  if (gameMode === 'Computer'){
  const {drawnCards: drawnCards, updatedDeck: updatedDeck, totalValue: totalValue }  = dealCards(allCards)
  setCurrentCards(drawnCards)
  const {drawnCards: computersCards, updatedDeck: newDeck, totalValue: totalComputersValue} = dealCards(updatedDeck)



  setComputersHand(computersCards)
  setAllCards(newDeck)

  let playersAces = drawnCards.filter(card => card.includes('Ace'))
  let computersAces = computersCards.filter(card => card.includes('Ace'))

    setAcePresent(playersAces.length === 1)

let score = totalComputersValue

 if (computersAces.length === 1 ){

const acePossibilities = [1, 11]
const aceIndex =  Math.floor(Math.random() * acePossibilities.length)
const aceChoice = acePossibilities[aceIndex]

score += aceChoice
 } 
 else if (computersAces.length === 2) {
  score += 12
 }
setComputersScore(score)

setTotalScore(totalValue)

setGameStatus('Playing')



if (totalValue === 21 && computersScore === 21){

  setDrawDisplay(true)
}
}
else {
  
  const {drawnCards, updatedDeck, totalValue }  = dealCards(allCards)
  setTotalScore(totalValue)
setCurrentCards(drawnCards)
setAllCards(updatedDeck)
setGameStatus('Playing')
let aces = drawnCards.filter(card => card.includes('Ace'))
setAcePresent(aces.length === 1)
}
}





function handleHit(){

  if (gameMode === 'Computer' && turn === 'Player'){

        const {drawnCards, updatedDeck, totalValue} = hit(allCards)

         setAllCards(updatedDeck)
        setCurrentCards(prevCards => [...prevCards, ...drawnCards])
         setTotalScore(prevScore => prevScore + totalValue)

         const aces = drawnCards.filter(card => card.includes('Ace'))

         setAcePresent(aces.length > 0)

         if(computersScore >= 17){
          setTurn('Player')}
          else {setTurn('Computer')}
         
         }
      
       
                
        
        if (gameMode === 'Solo'){
          const {drawnCards, updatedDeck, totalValue} = hit(allCards)

        setAllCards(updatedDeck)
        setCurrentCards(prevCards => [...prevCards, ...drawnCards])

        setTotalScore((prevScore) => prevScore + totalValue)

        const aces = drawnCards.filter(card => card.includes('Ace'))
        setAcePresent(aces.length > 0)
        }

        }

function computerHit(updatedDeck){

  if (losingDisplay === true || winningDisplay === true){
    return
  }

  let currentScore = computersScore

  while(currentScore < 17){

  const {drawnCards: computersCards, updatedDeck: newDeck, totalValue: totalComputersValue} = hit(updatedDeck)

  setAllCards(newDeck)
  setComputersHand((prevCards) => [...prevCards, ...computersCards])

  let computersAces = computersCards.filter(card => card.includes('Ace'))

   let score = totalComputersValue

      if (computersAces.length ===1 ){

  const acePossibilities = [1, 11]
  const aceIndex =  Math.floor(Math.random() * acePossibilities.length)
  const aceChoice = acePossibilities[aceIndex]
score+=aceChoice
  
      }
      else if (computersAces.length ===1 ) score +=12
      currentScore+=score
    }
if (currentScore > 17 && totalScore > currentScore){

  setWinningDisplay(true)
}

  setTurn('Player')

      setComputersScore(currentScore)
 

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

function handleGameSelection(selection){
setGameMode( selection === 'Yes' ? 'Computer' : 'Solo')
   setGameStatus('Not Playing')

}

function handleDraw(){
  setDrawDisplay(true)
  setTotalScore(0)
  setComputersScore(0)
  setComputersHand([])
  setCurrentCards([])
  setTurn('Player')
  setAllCards(["Ace of Diamonds", "2 of Diamonds", "3 of Diamonds", "4 of Diamonds", "5 of Diamonds", "6 of Diamonds", "7 of Diamonds", "8 of Diamonds", "9 of Diamonds", "10 of Diamonds", "Jack of Diamonds", "Queen of Diamonds", "King of Diamonds", 
    "Ace of Hearts", "2 of Hearts", "3 of Hearts", "4 of Hearts", "5 of Hearts", "6 of Hearts", "7 of Hearts", "8 of Hearts", "9 of Hearts", "10 of Hearts", "Jack of Hearts", "Queen of Hearts", "King of Hearts", 
    "Ace of Clubs", "2 of Clubs", "3 of Clubs", "4 of Clubs", "5 of Clubs", "6 of Clubs", "7 of Clubs", "8 of Clubs", "9 of Clubs", "10 of Clubs", "Jack of Clubs", "Queen of Clubs", "King of Clubs", 
    "Ace of Spades", "2 of Spades", "3 of Spades", "4 of Spades", "5 of Spades", "6 of Spades", "7 of Spades", "8 of Spades", "9 of Spades", "10 of Spades", "Jack of Spades", "Queen of Spades", "King of Spades"])

}

function handleLoss(){
  setLosingDisplay(false)
  setWinningDisplay(false)
  setComputersHand([])
  setCurrentCards([])
  setTotalScore(0)
  setGameMode(null)
  setTurn('Player')

  setAllCards(["Ace of Diamonds", "2 of Diamonds", "3 of Diamonds", "4 of Diamonds", "5 of Diamonds", "6 of Diamonds", "7 of Diamonds", "8 of Diamonds", "9 of Diamonds", "10 of Diamonds", "Jack of Diamonds", "Queen of Diamonds", "King of Diamonds", 
    "Ace of Hearts", "2 of Hearts", "3 of Hearts", "4 of Hearts", "5 of Hearts", "6 of Hearts", "7 of Hearts", "8 of Hearts", "9 of Hearts", "10 of Hearts", "Jack of Hearts", "Queen of Hearts", "King of Hearts", 
    "Ace of Clubs", "2 of Clubs", "3 of Clubs", "4 of Clubs", "5 of Clubs", "6 of Clubs", "7 of Clubs", "8 of Clubs", "9 of Clubs", "10 of Clubs", "Jack of Clubs", "Queen of Clubs", "King of Clubs", 
    "Ace of Spades", "2 of Spades", "3 of Spades", "4 of Spades", "5 of Spades", "6 of Spades", "7 of Spades", "8 of Spades", "9 of Spades", "10 of Spades", "Jack of Spades", "Queen of Spades", "King of Spades"])


}

function stand(){
  setTurn('Computer')
}


return (
  <>
  <h1> Blackjack</h1>
  
  

{ gameMode === null ? (

  <div>
   <h2> Would you like to play against the dealer?</h2>
   <button onClick={() => handleGameSelection('Yes')}> Yes </button>
   <button onClick={() => handleGameSelection('No')}> No </button>
  </div>
    ) : acePresent ? (

      <div className='all-cards-display'>
        <div className='cards-container'>
        <div className='players-section'>
         <h3> Choose the value of the Ace below</h3>
          <h3> Your current score is {totalScore} </h3>
        
           <div className='actual-cards'>
           {currentCards.map((card, index) => (
                          <CardImage key={index} cardName={card} />
                        ))}
                        </div>
                        </div>
              <div className='dealers-section'> 
              <h3> The Dealer's total is {computersScore} </h3>
              <div className='dealers-cards'>
                             <h3> Dealer's cards  </h3>   
              <div className='actual-cards'>  
              {computersHand.map((card, index) => (
                            <CardImage key={index} cardName={card} /> 
                          ))}
                          </div>
                     </div>
                 </div>
                 </div>
                          <div className='ace-buttons'>
                          <button onClick={() => handleAce(1)}> 1</button>
                          <button  onClick={()=> handleAce(11)}> 11 </button>
                          </div>
                          
         
       </div> 
     
         ) :  losingDisplay && gameMode === 'Computer' ? (
          <div className='all-cards-display'>
          <div className='cards-container'> 
            <div className='players-section'>
              <h3> You lost with {totalScore} </h3>
              <div className='actual-cards'> 
              {currentCards.map((card, index) => (
                          <CardImage key={index} cardName={card} />
                        ))}
                        </div>
                      </div>
                    <div className='dealers-section'>
                      <h3> The dealer won with score {computersScore}</h3> 
                      <div className='actual-cards'> 
                      {computersHand.map((card, index) => (
                            <CardImage key={index} cardName={card} />
                          ))}
                          </div>
                         </div>
                      </div>
                  
              <button  onClick={handleLoss}> Play again </button>
             </div>

                 ) : losingDisplay && gameMode === 'Solo' ? (
                  <div className='all-cards-display'>
                  <div className='cards-container'> 
                    <div className='players-section'>
                      <h2> You lost with {totalScore} </h2>
                      <div className='actual-cards'> 
                      {currentCards.map((card, index) => (
                                  <CardImage key={index} cardName={card} />
                                ))}
                                </div>
                              </div>
                           
                             
                                   
                                 
                              </div>
                          
                      <button  onClick={handleLoss}> Play again </button>
                     </div>

                 ) : drawDisplay ? (
                  <div> 

                  <h3> You and the dealer both drew 21!</h3>
                  <button   onClick={handleDraw} > Play again </button>
                  </div>

                 ): winningDisplay && gameMode === 'Computer' ? (
                    <div className='all-cards-display'>
                      <div className='cards-container'> 
                        <div className='players-section'>
                         <h3> You won with a score of {totalScore}</h3>
                         <div className='actual-cards'> 
                         {currentCards.map((card, index) => (
                          <CardImage key={index} cardName={card} />
                             ))}
                         </div>
                        </div>
                      

                    <div className='dealers-section'>
                     <h3> The dealer lost with a score of {computersScore} </h3>
                        <div className='actual-cards'> 
                           {computersHand.map((card, index) => (
                            <CardImage key={index} cardName={card} />
                          ))}
                         </div>
                         </div>
                        </div>
                        <h3 onClick={handleLoss}> Play again</h3>
                       
                    </div>


                 ) : winningDisplay && gameMode === 'Solo' ? (
                  <div className='all-cards-display'>
                  <div className='cards-container'> 
                    <div className='players-section'>
                     <h3> You won with a score of {totalScore}</h3>
                     <div className='actual-cards'> 
                     {currentCards.map((card, index) => (
                      <CardImage key={index} cardName={card} />
                         ))}
                     </div>
                    </div>
                    <h3 onClick={handleLoss}> Play again</h3>
                   </div>
                </div>

                 ):  gameStatus === 'Not Playing' ? ( 
                      <button  onClick={handleDeal } > Deal </button>

                    ) : gameMode === 'Computer' ? (

                      <div className='all-cards-display'>
                        
                           <div className='cards-container'>
                              <div className='players-section'>
                              <h3> Your total is {totalScore} </h3>

                                 <div className='players-cards'>
                                 <h3> Your cards </h3>
                                 <div className='actual-cards'>
                                 {currentCards.map((card, index) => (
                                        <CardImage key={index} cardName={card} />
                                      ))}
                                 </div>
                               </div>
                            </div> 

                        <div className='dealers-section'>
                          <h3> The Dealer's total is {computersScore} </h3>
                           <div className='dealers-cards'>
                             <h3> Dealer's cards  </h3>
                                <div className='actual-cards'>
                                   {computersHand.map((card, index) => (
                                     <CardImage key={index} cardName={card} />
                                   ))}
                                 </div>
                              </div>
                            </div>
                           </div>
                           <div className='button-container'>
                           <button   onClick={handleHit}>Hit</button>
                           <button   onClick={stand}> Stand</button>
                           </div>

                               </div>

                                  ) : gameMode === 'Solo' ? (
                                    <div className='all-cards-display'>
                                    <div className='cards-container'>
                                    <div className='players-section'>
                                   
                                  <h3> Your total is {totalScore} </h3>
                                  <div className='players-cards'>
                                  <div className='actual-cards'>
                                   {currentCards.map((card, index) =>  (
                                  <CardImage key={index} cardName={card} />

                                      ))} 
                                         </div> 
                                     </div> 
                                 </div>
                                 </div>
                                 <div className='button-container'>
                                        <button   onClick={handleHit}>Hit</button>
                                        <button  onClick={stand}> Stand</button>   
                                </div>
                                </div>

                    ): null}
                    </>
)
            

}

export default App

