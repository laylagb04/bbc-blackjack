function dealCards(cards){
   
    const updatedCards = [...cards]

let index1 = Math.floor(Math.random() * updatedCards.length)
let card1 = updatedCards.splice(index1,1)[0]


let index2 = Math.floor(Math.random() * updatedCards.length)
let card2 = updatedCards.splice(index2,1)[0]


let value1;
let value2; 
let valuesArray = []



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
if (card2.includes('2')){
    value2 = 2
}
if (card2.includes('3')){
    value2 = 3
}
if (card2.includes('4')){
    value2 = 4
}
if (card2.includes('5')){
    value2 = 5

}
if (card2.includes('6')){
    value2 = 6
}
if (card2.includes('7')){
    value2 = 7

}
if (card2.includes('8')){
    value2 = 8
}
if (card2.includes('9')){
    value2 = 9
}
if (card2.includes('10') || card2.includes('Jack') || card2.includes('Queen') || card2.includes('King')){
    value2 = 10
}
if(card2.includes('Ace')){
value2 = 0
}
if(card1.includes('Ace')){
    value1 = 0
    }
   
let totalValue = value1+value2


return { drawnCards: [card1, card2],
    updatedDeck: updatedCards,
    totalValue
}


    }
export default dealCards