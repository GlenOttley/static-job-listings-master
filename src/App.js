import React, {useEffect, useState} from 'react';
import './App.css';
import data from './data.json';
import { Listings } from "./components/Listings.js";


function App() {

	const [listings, setListings] = useState([]);
	const [filters, setFilters] = useState({
		role: null,
		level: null,
		languages: null
	});


	useEffect(() => {
		let filterValues = !Object.values(filters).every(i => i === null);

		function compareRole() {
			let tmp = listings.filter(listing => 
				listing.role === filters.role)
			return tmp
		}

		function compareLevel() {
			let tmp = listings.filter(listing =>
				listing.level === filters.level)
			return tmp
		}

		function compareLanguages() {
			let tmp = [];
				for (let i = 0; i < listings.length; i++) {
					let containsAll = filters.languages.every(language => 
						listings[i].languages.includes(language))
					if (containsAll) {
						tmp.push(listings[i])
					}
				}
				return tmp
			}

			function compareRoleLevel() {
				let roleFiltered = compareRole()
				let levelFiltered = compareLevel()
				let tmp = roleFiltered.filter(listing =>
					roleFiltered.id === levelFiltered.id)
				return tmp
			}

		if (!filterValues) {
			setListings(data) 
		}

		else {
			console.log(filters)

			if (filters.role && filters.level && filters.languages) {
				let roleLevelFiltered = compareRoleLevel()
				let languagesFiltered = compareLanguages()
				let tmp = roleLevelFiltered.filter(listing =>
					roleLevelFiltered.id === languagesFiltered.id)
				setListings(tmp)
			}

			// else if (filters.role && filters.languages) {
			// 	console.log('filtering by role & languages')
			// 	let roleFiltered = compareRole()
			// 	let languagesFiltered = compareLanguages()
			// 	let tmp = roleFiltered.filter(listing =>
			// 		roleFiltered.id === languagesFiltered.id)
			// 	setListings(tmp)
			// }

			else if (filters.role && filters.level) {
				let filteredListings = compareRoleLevel()
				setListings(filteredListings)
			}

			else if (filters.role) {
				let filteredListings = compareRole()
				setListings(filteredListings)
			} 

			else if (filters.level) {
				let filteredListings = compareLevel()
				setListings(filteredListings)
			}

			else if (filters.languages) {
				let filteredListings = compareLanguages()
				setListings(filteredListings)
			}
		}
	}, [filters]);


  function filterRole({target}) {
  	setFilters(prevFilters => ({...prevFilters, role: target.innerHTML}));
  }


  function filterLevel({target}) {
  	setFilters(prevFilters => ({...prevFilters, level: target.innerHTML}));
  }

  function filterLanguages({target}) {
  	if (filters.languages) {
  		setFilters(prevFilters => ({ ...prevFilters, languages: [...prevFilters.languages, target.innerHTML] }))
  	} else {
  		setFilters(prevFilters => ({ ...prevFilters, languages: [target.innerHTML] }));
  	}
  }

  function removeFilter({target}) {
  	let objectkey = target.getAttribute('objectkey')
  	setListings(data)
  	setFilters(prevFilters => ({...prevFilters, [objectkey]: null}));
  }

  function clearFilters() {
  	setFilters({
  		role: null,
			level: null,
			languages: null
  	});
  }


  return (
  	<div className="App">
      <Listings 
      listings={listings}
      filters={filters}
      filterRole={filterRole}
      filterLevel={filterLevel}
      filterLanguages={filterLanguages}
      removeFilter={removeFilter}
      clearFilters={clearFilters}
      />
    </div>
  )
}

export default App;
