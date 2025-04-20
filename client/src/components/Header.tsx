import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Header() {
  const { state } = useContext(AppContext);
  
  return (
    <header className="bg-secondary text-white p-4 shadow-md relative z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Trucker Finance</h1>
        <button id="profileButton" className="p-2 rounded-full hover:bg-neutral-700 transition">
          <span className="material-icons">
            {state.signedIn ? "account_circle" : "person_outline"}
          </span>
        </button>
      </div>
    </header>
  );
}
