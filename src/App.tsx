import { useState, useEffect, useMemo, useRef } from 'react';

// Transition
import {
  CSSTransition
} from 'react-transition-group';

// i18n
import { IntlProvider, FormattedMessage } from 'react-intl';
import messages from './i18n/messages';

// CSS
import './App.css';

// Components
import AppList from '@/components/AppList/AppList';
import SearchBar from '@/components/SearchBar/SearchBar';
import RecommendedApps from '@/components/RecommendedApps';
import Loading from '@/components/Loading';
import { LangSwitcher } from './components/LangSwitcher';

// Services
import {
  fetchFreeAppIDs,  
  fetchRecommendedApps,
  fetchFreeApps,
} from '@/services/AppService';
import { 
  getLangFromStorage, 
  setLangToStorage 
} from './services/LangService';

// Utils
import chunk from '@/utils/chunk';

// Types
import { FreeAppID, AppItemObj, FreeAppsResponse, Locale, Lang } from '@/types';
import ObserverObject from './components/ObserverObject';

const pageSize = 10;

const App = () => {
  const [currentLang, setCurrentLang] = useState<Lang>(getLangFromStorage())
  const [freeApps, setFreeApps] = useState<AppItemObj[]>([])
  const [recommendedApps, setRecommendedApps] = useState<FreeAppsResponse[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const [ids, setIDs] = useState<FreeAppID[]>([])
  const [keyword, setKeyword] = useState<string>('')

  const observerTarget = useRef(null)
  const loadingInfoRef = useRef(null)

  const isFirstPage = useMemo<boolean>(() => page === 0, [page])
  const chunkedList = useMemo<FreeAppID[]>(() => (chunk(ids.filter(item => Object.values(item).join('').indexOf(keyword) != -1), pageSize) as FreeAppID[][])[page] , [keyword, ids, page])
  const filteredRecommendedApps = useMemo<FreeAppsResponse[]>(() => recommendedApps.filter(item => Object.values(item).join('').indexOf(keyword) != -1), [keyword, recommendedApps])
  const locale = useMemo<Locale>(() => {
    switch (currentLang) {
      case 'zh':
        return 'hk';
      case 'ja-JP':
        return 'jp';
      default:
        return 'us';
    }
  }, [currentLang])

  const onChangeKeyword = (keyword: string) => {
    setKeyword(keyword);
    setPage(0);
    setFreeApps([]);
    if(keyword === ''){
      setIDs([]);
    }
  }

  const onChangeCurrentLang = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as Lang;

    // Reset all states
    setKeyword('');
    setPage(0);
    setFreeApps([]);
    setRecommendedApps([]);
    setIDs([]);
    
    setLangToStorage(value);
    setCurrentLang(value);
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    const init = async () => {
      try {
        scrollToTop();
        const [ids, recommendedApps] = await Promise.all([fetchFreeAppIDs(locale), fetchRecommendedApps(locale)]);

        setTimeout(async () => {
          setIDs(ids);
          setRecommendedApps(recommendedApps);
        }, 1000);
        
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    if(isFirstPage && keyword === "") {
      setIsLoading(true);
      init()
    }
  }, [isFirstPage, page, keyword, locale]);

  const fetchMore = async () => {
    if(chunkedList && chunkedList.length > 0){
      const list = [];

      for await (const response of fetchFreeApps(chunkedList, locale)) {
        list.push(response.data);
        loadingInfoRef.current.innerText = `${ (list.length / chunkedList.length * 100).toFixed() } %`;
      }
      
      setFreeApps((prevFreeApps) => [...prevFreeApps, ...list]);
      loadingInfoRef.current.innerText = '';

      if(chunkedList !== undefined){ 
        setPage(page + 1);
      }
    }
  }

  return (
    <>
      <IntlProvider messages={messages[currentLang]} locale={currentLang} defaultLocale={'en'}>
        <CSSTransition appear name='app-container' timeout={500}>
          {
            (isLoading === false) ? 
              <div className="max-w-lg mx-auto">
                <nav className="sticky top-0 border border-b p-2 bg-slate-100 z-10">
                  <div className="flex">
                    <SearchBar duration={1000} onChange={onChangeKeyword} />
                    <LangSwitcher onChange={onChangeCurrentLang} currentLang={currentLang}/>
                  </div>
                </nav>
                
                <div>
                  <FormattedMessage id="recommendedApps.title"/>
                  <div className="w-lg border-b m-2 overflow-y-scroll">
                    <RecommendedApps list={filteredRecommendedApps}></RecommendedApps>
                  </div>
                </div>

                <AppList list={freeApps} />

                {
                  (chunkedList !== undefined) ? 
                  <ObserverObject 
                    observerTarget={observerTarget} 
                    callback={fetchMore}
                    content={<><FormattedMessage id="loading.message"/><span ref={loadingInfoRef}></span></>}
                  /> : null
                }
              </div>
            : <Loading />
          }
        </CSSTransition>
      </IntlProvider>
    </>
  )
}

export default App
