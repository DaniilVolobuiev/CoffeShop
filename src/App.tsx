import './App.scss';

import React from 'react';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Error from './pages/Error';
import LoginPage from './pages/LoginPage';
import Register from './pages/RegisterPage';
import { BurgerMenu } from './components/BurgerMenu/index';

import { Routes, Route, useLocation } from 'react-router-dom';

import { setCurrentPage } from './redux/slices/FilterSlice';

import { useAppSelector, useAppDispatch } from './redux/hooks';
import { itemType } from './redux/slices/ItemsSlice';

export interface AppContextInteface {
  setText: (a: string) => string;
  text: string | undefined;
  inputText: string;
  setinputText: (a: string) => string;

  totalItems: number;
  itemsPerPage: number;
  currentCountry: itemType[];
  paginate?: (a: number) => number;
}

export const AppContext = React.createContext<AppContextInteface | {}>({});

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.itemsReducer.items);

  const [text, setText] = React.useState<string>('');
  const [inputText, setinputText] = React.useState<string>('');
  const [burgerOpened, setBurgerOpen] = React.useState<boolean>(false);

  //Pagination variables
  const currentPage = useAppSelector((state) => state.filterReducer.currentPage);
  const [itemsPerPage, setItemsPerPage] = React.useState(3);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  console.log(CSSTransition);
  const currentCountry = items.slice(firstItemIndex, lastItemIndex);
  let totalItems = items.length;
  const paginate = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };
  // React.useEffect(() => {
  //   if (document.body.scrollTop === 0) {
  //     userScrolledDown.current = true;
  //   } else {
  //     userScrolledDown.current = false;
  //   }
  // }, [document.body.scrollTop]);

  return (
    <AppContext.Provider
      value={{
        // setText,
        text,
        inputText,
        setinputText,

        totalItems,
        itemsPerPage,
        currentCountry,
        paginate,
      }}>
      <div className="App">
        <Navbar setOpened={() => setBurgerOpen(true)} />
        <div className="wrapper">
          {burgerOpened ? (
            <BurgerMenu
              opened={burgerOpened}
              onClose={() => setBurgerOpen(false)}
              onOpen={() => setBurgerOpen(true)}
            />
          ) : null}

          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/Cart" element={<Cart />} />
            <Route path="*" element={<Error />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
