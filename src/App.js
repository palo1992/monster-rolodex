import React, {useEffect, useState} from 'react';
import {CardList} from './components/card-list/card-list.component';
import {SearchBox} from './components/search-box/search-box.component';
import './App.css';

function App() {
  const [monsters, setMonsters] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(resp => resp.json())
        .then(response => setMonsters(response))
        .catch(err => {
          console.log(err);
        })
    }, []);
  
  const handleChange = event => {
    setSearchField(event.target.value);
  } 
  
  useEffect(() => {
    const results = monsters.filter(monster => 
      monster.name.toLowerCase().includes(searchField.toLocaleLowerCase()));
      setSearchResults(results);
  },[searchField,monsters]);
 
  return (
    <div className="App">
      <h1>Monsters Rolodex</h1>
      <SearchBox placeholder='search monsters' handleChange={handleChange} searchField={searchField}/>
      <CardList monsters={searchResults}/>
    </div>
  );
}

export default App;
