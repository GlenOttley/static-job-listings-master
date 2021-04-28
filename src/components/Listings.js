import React from 'react';
import backgroundImgMobile from "../background-images/bg-header-mobile.svg";

export const Listings = ({ listings, filters, filterRole, filterLevel, filterLanguages, removeFilter, clearFilter }) => {

	return (
		<div>

			<div 
				className='header-img'
				style={{  
				  backgroundImage: "url(" + backgroundImgMobile + ")",
				  backgroundPosition: 'center',
				  backgroundSize: 'cover',
				  backgroundRepeat: 'no-repeat'
				}}>
			</div>

			<div className="filters row">
				{Object.entries(filters).map((filter, filterIndex) => {
					return (
						<button 
							className={filter[1] ? "filter__btn" : "hidden"}
							key={filterIndex}
							objectkey={filter[0]}
							onClick={removeFilter}>
							{filter[1]}
						</button>
						)
				})
			}
			</div>

			<div className="listings column">
				{listings.map(listing => {
				return (
					<div 
						className="listing column"
						key={listing.id}
					>

						<img 
							className="listing__logo" 
							src={listing.logo}
							alt="company logo" 
						/>

						<div className="row listing__header">
							<h2 className="listing__company">
								{listing.company}
							</h2>

							<button className={listing.new ? "btn btn--new" : "hidden"}>
								NEW!
							</button>

							<button className={listing.featured ? "btn btn--featured" : "hidden"}>
								FEATURED
							</button>
						</div>

						<h1 className="listing__position">
							{listing.position}
						</h1>

						<div className="row listing__details">
							<p>
								{listing.postedAt}
							</p>

							<p>•</p>

							<p>
								{listing.contract}
							</p>

							<p>•</p>

							<p>
								{listing.location}
							</p>
						</div>

						<hr className="listing__hr"></hr>

						<div className="row listing__filters">
							<button 
								className="listing__filter__item"
								key={listing.role}
								onClick={filterRole}>
								{listing.role}
							</button>

							<button 
								className="listing__filter__item"
								key={listing.level}
								onClick={filterLevel}>
								{listing.level}
							</button>		

							{listing.languages.map((language, languageIndex) => {
								return (
									<button 
										className="listing__filter__item"
										key={languageIndex}
										onClick={filterLanguages}>
										{language}
									</button>
									)
								})
							}
						</div>

					</div>
					)
				}
			)}
			</div>
		</div>
	)
}