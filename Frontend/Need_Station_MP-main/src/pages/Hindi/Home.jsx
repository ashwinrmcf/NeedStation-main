import SearchbarContainer from './SearchbarContainer.jsx'
import Cards from './Cards.jsx'
import HomeHowItWorks from './HomeHowItWorks.jsx'
import HomeSatisfactionContainer from './HomeSatisfactionContainer.jsx'
import HomeReview from './HomeReview.jsx'
import HindiGetStarted from '../../components/Hindi/HindiGetStarted.jsx'

const Home = () => {

  return <>
  {/* <Header/> */}
  <SearchbarContainer/>
  {/* <MainCarousel/> */}
  <Cards/>
  <HomeHowItWorks/>
  <HomeSatisfactionContainer/>
  <HomeReview/>
  <HindiGetStarted/>
  {/* <Footer/> */}
  </>
}

export default Home;
