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
import { itemType, setItems } from './redux/slices/ItemsSlice';

export interface AppContextInteface {
  setText: (a: string) => string;
  text: string | undefined;
  inputText: string;
  setinputText: (a: string) => string;
  setItemsPerPage: (a: number) => void;

  totalItems: number;
  itemsPerPage: number;
  currentItems: itemType[];
  paginate?: (a: number) => number;
  filterFunc: (a: itemType[]) => itemType[];
}

export const AppContext = React.createContext<AppContextInteface | {}>({});

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.itemsReducer.items);

  const [text, setText] = React.useState<string>('');
  const [inputText, setinputText] = React.useState<string>('');
  const [opened, setOpened] = React.useState<boolean>(false);

  const filterFunc = (array: itemType[]) => {
    let filtered = array.filter((obj) => {
      let lowerObj = obj.title.toLowerCase();
      const text1 = text ? text : '';
      if (lowerObj.includes(text1.toLowerCase())) {
        return true;
      }
      return false;
    });
    console.log('Filtered', filtered);
    return filtered;
  };

  //Pagination variables
  const currentPage = useAppSelector((state) => state.filterReducer.currentPage);
  const [itemsPerPage, setItemsPerPage] = React.useState(3);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filterFunc(items).slice(firstItemIndex, lastItemIndex);
  let totalItems = filterFunc(items).length;
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
        setText,
        text,
        inputText,
        setinputText,
        totalItems,
        itemsPerPage,
        currentItems,
        paginate,
        setItemsPerPage,
        filterFunc,
      }}>
      <div className="App">
        <Navbar setOpened={() => setOpened(true)} />

        <div className="wrapper">
          {opened ? (
            <BurgerMenu
              opened={opened}
              onClose={() => setOpened(false)}
              onOpen={() => setOpened(true)}
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
