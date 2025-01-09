function hit (deck){

    const updatedCards = [...deck]

    let index1 = Math.floor(Math.random() * updatedCards.length)
    let card1 = updatedCards.splice(index1,1)[0]
    
    let value1

    if (card1.includes('2')){
    value1 = 2
}
if (card1.includes('3')){
    value1 = 3
}
if (card1.includes('4')){
    value1 = 4
}
if (card1.includes('5')){
    value1 = 5

}
if (card1.includes('6')){
    value1 = 6
}
if (card1.includes('7')){
    value1 = 7

}
if (card1.includes('8')){
    value1 = 8
}
if (card1.includes('9')){
    value1 = 9
}
if (card1.includes('10') || card1.includes('Jack') || card1.includes('Queen') || card1.includes('King')){
    value1 = 10
}

if(card1.includes('Ace')){
    value1 = 0
    }

return { drawnCards: [card1],
    updatedDeck: updatedCards,
    totalValue: value1
}
   
}


export default hit