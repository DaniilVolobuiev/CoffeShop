import React from 'react';
import axios from 'axios';
import qs from 'qs';

import HeroImg from '../images/hero-image.png';
import Star from '../images/Star.png';
import Fig1 from '../images/Fig1.svg';

import Hero from '../components/Hero';
import Card from '../components/Card';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../skeleton/skeleton';
import { async } from '@firebase/util';

import { AppContext } from './../App';

import Pagination from '../components/Pagination';

import { useNavigate, useLocation } from 'react-router-dom';

import { setFilters, setCurrentPage } from '../redux/slices/FilterSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { AppContextInteface } from '../App';
import { itemType } from '../redux/slices/ItemsSlice';

import { axiosGetItems } from '../redux/slices/ItemsSlice';

function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isMounted = React.useRef(false);
  const popularNowRef = React.useRef();
  const [popular, setPopular] = React.useState<itemType[]>([]);
  const [isLoadingItems, setIsLoadingItems] = React.useState<boolean>(false);
  const [isLoadingPopular, setIsLoadingPopular] = React.useState<boolean>(false);

  const items = useAppSelector((state) => state.itemsReducer.items);
  const status = useAppSelector((state) => state.itemsReducer.status);
  const categoryId = useAppSelector((state) => state.filterReducer.categoryId);
  const activeSort = useAppSelector((state) => state.filterReducer.sort);
  const currentPage = useAppSelector((state) => state.filterReducer.currentPage);
  const sortList = useAppSelector((state) => state.filterReducer.sortList);
  const { text, inputText, currentCountry, totalItems, itemsPerPage }: Partial<AppContextInteface> =
    React.useContext(AppContext);
  const filterFunc = React.useCallback(
    (array: itemType[]) => {
      let filtered = array.filter((obj) => {
        let lowerObj = obj.title.toLowerCase();
        const text1 = text ? text : '';
        if (lowerObj.includes(text1.toLowerCase())) {
          return true;
        }
        return false;
      });

      return filtered;
    },
    [text],
  );
  // const filterFunc = (array) => {
  //   let filtered = array.filter((obj) => {
  //     let lowerObj = obj.title.toLowerCase();
  //     if (lowerObj.includes(text.toLowerCase())) {
  //       return true;
  //     }
  //     return false;
  //   });

  //   return filtered;
  // };

  React.useEffect(() => {
    setIsLoadingPopular(true);
    axios
      .get(
        `https://coffe-shop-32182-default-rtdb.firebaseio.com/Items.json?orderBy="rating"&limitToLast=3&print=pretty`,
      )
      .then((res) => setPopular(Object.values(res.data)));
    setIsLoadingPopular(false);
  }, []);

  React.useEffect(() => {
    dispatch(axiosGetItems({ categoryId, activeSort }));
  }, [categoryId, activeSort]);

  interface searchParamsType {
    sort: number;
    categoryId: number;
    currentPage: number;
  }

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as searchParamsType;
      dispatch(
        setFilters({
          ...params,
        }),
      );
    }
  }, []);
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: activeSort,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
      console.log(window.location.search);
    }
    isMounted.current = true;
  }, [categoryId, activeSort, currentPage]);

  return (
    <>
      <Hero />

      <div className="popular">
        <div className="cards">
          {isLoadingPopular
            ? [...Array(3)].map((obj, index) => <Skeleton key={index} />)
            : popular.map((obj) => <Card {...obj} key={obj.id} />)}
        </div>
      </div>

      <section className="menu">
        <p className="title">
          Special menu <span>for you</span>
        </p>
        <div className="content__top">
          <Categories />
          <Sort />
        </div>

        <div className="menu__cards">
          {status === 'loading'
            ? [...Array(3)].map((obj, index) => <Skeleton key={index} />)
            : currentCountry &&
              filterFunc(currentCountry).map((obj) => <Card {...obj} key={obj.id} />)}
        </div>
      </section>
      <Pagination />
    </>
  );
}

export default Home;
