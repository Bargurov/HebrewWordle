import { useState } from "react";
const useWordle = (solution) => {
	const [turn, setTurn] = useState(0);
	const [currentGuess, setCurrentGuess] = useState("");
	const [guesses, setGuesses] = useState([...Array(6)]);
	const [history, setHistory] = useState([]);
	const [isCorrect, setIsCorrect] = useState(false);
	const [usedKeys, setUsedKeys] = useState({});
	const formatGuess = () => {
		let solutionArray = [...solution];
		let formattedGuess = [...currentGuess].map((l) => {
			return { key: l, color: "grey" };
		});
		formattedGuess.forEach((letter, i) => {
			if (solutionArray[i] === letter.key) {
				formattedGuess[i].color = "green";
				solutionArray[i] = null;
			}
		});
		formattedGuess.forEach((letter, i) => {
			if (solutionArray.includes(letter.key) && letter.color !== "green") {
				formattedGuess[i].color = "yellow";
				solutionArray[solutionArray.indexOf(letter.key)] = null;
			}
		});
		return formattedGuess;
	};
	const addNewGuess = (formattedGuess) => {
		if (currentGuess === solution) {
			setIsCorrect(true);
		}
		setGuesses((prevGuess) => {
			let newGuesses = [...prevGuess];
			newGuesses[turn] = formattedGuess;
			return newGuesses;
		});
		setHistory((prevHistory) => {
			return [...prevHistory, currentGuess];
		});
		setTurn((prevTurn) => {
			return prevTurn + 1;
		});
		setUsedKeys((pervUsedKeys) => {
			let newKeys = { ...pervUsedKeys };

			formattedGuess.forEach((l) => {
				const currentColor = newKeys[l.key];

				if (l.color === "green") {
					newKeys[l.key] = "green";
					return;
				}
				if (l.color === "yellow" && currentColor !== "green") {
					newKeys[l.key] = "yellow";
					return;
				}
				if (
					l.color === "grey" &&
					currentColor !== "green" &&
					currentColor !== "yellow"
				) {
					newKeys[l.key] = "grey";
					return;
				}
			});
			return newKeys;
		});
		setCurrentGuess("");
	};
	const handleEnter = ({ key }) => {
		if (key === "Enter") {
			if (turn > 5) {
				console.log("you used all your guesses");
				return;
			}
			if (history.includes(currentGuess)) {
				console.log("you already tries that word");
				return;
			}
			if (currentGuess.length !== 5) {
				console.log("word must be 5 chars long");
				return;
			}
			const formatted = formatGuess();
			addNewGuess(formatted);
		}
		if (key === "Backspace") {
			setCurrentGuess((prev) => {
				return prev.slice(0, -1);
			});
		}
		if (/^[\u0590-\u05FF]$/.test(key)) {
			if (currentGuess.length < 5) {
				setCurrentGuess((prev) => {
					return prev + key;
				});
			}
		}
	};

	return { turn, currentGuess, guesses, isCorrect, handleEnter, usedKeys };
};

export default useWordle;
