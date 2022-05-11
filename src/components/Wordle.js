import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";

const Wordle = ({ solution }) => {
	const [showModal, setShowModal] = useState(false);
	const { currentGuess, handleEnter, guesses, isCorrect, turn, usedKeys } =
		useWordle(solution);
	useEffect(() => {
		window.addEventListener("keyup", handleEnter);

		if (isCorrect) {
			setTimeout(() => setShowModal(true), 2000);
			window.removeEventListener("keyup", handleEnter);
		}
		if (turn > 5) {
			setTimeout(() => setShowModal(true), 2000);
			window.removeEventListener("keyup", handleEnter);
		}
		return () => {
			window.removeEventListener("keyup", handleEnter);
		};
	}, [handleEnter, isCorrect, turn]);

	return (
		<div>
			current guess - {currentGuess}
			<div>solution -{solution}</div>
			<Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
			<Keypad usedKeys={usedKeys} />
			{showModal && (
				<Modal isCorrect={isCorrect} turn={turn} solution={solution} />
			)}
		</div>
	);
};

export default Wordle;
