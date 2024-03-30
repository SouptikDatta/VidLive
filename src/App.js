import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import store from './utils/store';
import Body from './components/Body';
import Header from './components/Header';
import WatchPage from './components/WatchPage';
import MainContainer from './components/MainContainer';
import './App.css';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Body />,
    children: [
      {
        path: '/',
        element: <MainContainer />
      },
      {
        path: '/watch',
        element: <WatchPage />
      }
    ]
  }
])

/**
 * Header
 * Body 
 *  Sidebar
 *    Menu Items
 *  Main container 
 *    ButtonList
 *    VideoContainer
 *      VideoCard
 */
function App() {
  return (
    <Provider store={store} >
      <div className="App">
        <Header />
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;
