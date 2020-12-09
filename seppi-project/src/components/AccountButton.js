import React from 'react';
import '../css/AccountButton.css';

const AccountButton = (props) => {
	return (
		<button className="btn btn-light text-black" onClick={props.onClick} id="buttonContainer">
			<span class="button-text">{props.title}</span>
			<img src={require('../images/right-arrow.png')} />
		</button>
	);
}

export default AccountButton;