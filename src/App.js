import React, { useEffect, useState } from "react";
import Wordle from "./components/Wordle";

const App = () => {
	const [solution, setSolution] = useState(null);
	useEffect(() => {
		fetch("http://localhost:3001/solutions")
			.then((res) => res.json())
			.then((json) => {
				const random = json[Math.floor(Math.random() * json.length)];
				setSolution(random.word);
			});
	}, [setSolution]);
	return (
		<div className="app">
			<h1>וורדל</h1>
			{solution && <Wordle solution={solution} />}
		</div>
	);
};

export default App;
