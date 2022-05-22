import "./style.css";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import SideMenu from "./Components/SideMenu/SideMenu";
import Header from "./Components/Header/Header";
import HomePage from "./pages/HomePage";
import LikedPage from "./pages/LikedPage";
import React from "react";

function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [sneakersArr, setSneakersArr] = React.useState([]); // sneakers on the page
  const [sneakersCartArr, setSneakersCartArr] = React.useState([]); // sneakers in the card
  const [sneakersLikedArr, setSneakersLikedArr] = React.useState([]); // liked sneakers
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    fetch("https://626e76ade58c6fabe2df4f7c.mockapi.io/sneakers")
      .then((response) => response.json())
      .then((commits) => {
        setSneakersArr(commits);
      });
    axios
      .get("https://626e76ade58c6fabe2df4f7c.mockapi.io/sneakersCard")
      .then((res) => {
        setSneakersCartArr(res.data);
      });
    axios // get zapros click on liked
      .get("https://626e76ade58c6fabe2df4f7c.mockapi.io/likedSneakers")
      .then((res) => {
        setSneakersLikedArr(res.data);
      });
  }, []);

  return (
    <div className="container">
      {cartOpened ? (
        <SideMenu
          closeCardClick={() => {
            setCartOpened(false);
          }}
          sneakersCartArr={sneakersCartArr}
          updateCardArr={setSneakersCartArr}
        />
      ) : null}

      <Header
        priceClick={() => {
          axios // get zaprov click on card
            .get("https://626e76ade58c6fabe2df4f7c.mockapi.io/sneakersCard")
            .then((res) => {
              setSneakersCartArr(res.data);
            });
          setCartOpened(true);
        }}
        favouriteClick={() => {
          axios // get zapros click on liked
            .get("https://626e76ade58c6fabe2df4f7c.mockapi.io/likedSneakers")
            .then((res) => {
              setSneakersLikedArr(res.data);
            });
        }}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              sneakersArr={sneakersArr}
              sneakersLikedArr={sneakersLikedArr}
              setSneakersLikedArr={setSneakersLikedArr}
              setSneakersCartArr={setSneakersCartArr}
            />
          }
        ></Route>
        <Route
          path="/liked"
          element={<LikedPage sneakersLikedArr={sneakersLikedArr}/>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
