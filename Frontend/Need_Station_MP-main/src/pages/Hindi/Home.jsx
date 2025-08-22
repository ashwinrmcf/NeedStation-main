import React from "react";
import HindiSearchbarContainer from './HindiSearchbarContainer.jsx'
import HindiCards from './HindiCards.jsx'
import HindiHomeHowItWorks from './HindiHomeHowItWorks.jsx'
import HindiHomeSatisfactionContainer from './HindiHomeSatisfactionContainer.jsx'
import HindiHomeReview from './HindiHomeReview.jsx'
import HindiGetStarted from './HindiGetStarted.jsx'
import "../../components/Hindi/left-align.css" // Using updated CSS with centered layout

// Hindi version with properly centered layout matching English design
const HindiHome = () => {
  return <>
    <div className="content-wrapper">
      <HindiSearchbarContainer/>
      <HindiCards/>
      <HindiHomeHowItWorks/>
      <HindiHomeSatisfactionContainer/>
      <HindiHomeReview/>
      <HindiGetStarted/>
    </div>
  </>
}

export default HindiHome;
