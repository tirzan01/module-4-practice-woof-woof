import React from 'react';
import './App.css';
import RenderDog from './components/RenderDog'

class App extends React.Component {

  constructor() {
    super()

    this.state = {
      dogs: [],
      selectedDog: undefined,
      goodDogFilter: false
    }
  }

  selectDog = id => {
    console.log(this.state.dogs.filter(dog => dog.id === id))
    this.setState({
      selectedDog: this.state.dogs.filter(dog => dog.id === id)[0]
    })
  }

  filterGoodDogs = () => {
    this.setState(prevState => {
      console.log()
      return {
        goodDogFilter: prevState.goodDogFilter ? false : true
      }
    })
  }

  GoodBadDogBtn = id => {
    let dogs = [...this.state.dogs]
    console.log(dogs[id].isGoodDog)
    dogs[id - 1].isGoodDog = dogs[id - 1].isGoodDog ? false : true
    console.log(dogs)
    fetch(`http://localhost:3001/pups/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dogs[id - 1])
    })
      .then(resp => {
        this.setState({dogs})
      })
  }

  render() {
    return (
      <div className="App">
        <div id="filter-div">
        <button id="good-dog-filter" onClick={this.filterGoodDogs}>filter good dogs</button>
        </div>
        <div id="dog-bar">
          {this.state.goodDogFilter ?
          this.state.dogs.filter(dog => dog.isGoodDog).map(dog => <span key={dog.id} onClick={() => this.selectDog(dog.id)}>{dog.name}</span>)
          :
          this.state.dogs.map(dog => <span key={dog.id} onClick={() => this.selectDog(dog.id)}>{dog.name}</span>)
          }
        </div>
        <div id="dog-summary-container">
          <h1>DOGGO:</h1>
          <div id="dog-info">
            {this.state.selectedDog ? <RenderDog dog={this.state.selectedDog} GoodBadDogBtn={this.GoodBadDogBtn} /> : null}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    fetch('http://localhost:3001/pups')
    .then(resp => resp.json())
    .then(dogs => {
      this.setState({dogs})
    })
  }
}

export default App;
