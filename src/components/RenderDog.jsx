import React from 'react'

const Dog = ({ dog, GoodBadDogBtn }) => {
    return <>
        <img src={dog.image} alt={dog.name} />
        <h2>{dog.name}</h2>
        <button onClick={() => GoodBadDogBtn(dog.id)}>{dog.isGoodDog ? 'Good' : 'Bad'} Dog!</button>
    </>
}

export default Dog

