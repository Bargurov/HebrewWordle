import React from "react";

const Modal = ({ turn, isCorrect, solution }) => {
	return (
		<div className="modal">
			{isCorrect && (
				<div>
					<h1>ניצחת!</h1>
					<p className="solution">{solution}</p>
					<p>גילית את התשובה ב{turn} ניחושים</p>
				</div>
			)}
			{!isCorrect && (
				<div>
					<h1>הפסדת!</h1>
					<p className="solution">{solution} התשובה היא</p>
				</div>
			)}
		</div>
	);
};

export default Modal;
