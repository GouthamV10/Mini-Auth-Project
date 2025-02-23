import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./view/Auth";
import Home from "./view/Home";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Auth />} />
			<Route path="/home" element={<Home />} />
		</Routes>
	);
}

export default App;
