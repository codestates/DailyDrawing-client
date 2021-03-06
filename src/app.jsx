import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CommunityPage from "./pages/communityPage/communityPage";
import EnterPage from "./pages/enterPage/enterPage";
import { useState } from "react";

const App = () => {
  const [showSignModal, setShowSignModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showParticipateModal, setShowParticipateModal] = useState(false);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <EnterPage
            showParticipateModal={showParticipateModal}
            setShowParticipateModal={setShowParticipateModal}
            showProfileModal={showProfileModal}
            setShowProfileModal={setShowProfileModal}
            setShowSignModal={setShowSignModal}
            showSignModal={showSignModal}
          ></EnterPage>
        </Route>
        <Route path="/community">
          <CommunityPage
            showParticipateModal={showParticipateModal}
            setShowParticipateModal={setShowParticipateModal}
            showProfileModal={showProfileModal}
            setShowProfileModal={setShowProfileModal}
            setShowSignModal={setShowSignModal}
            showSignModal={showSignModal}
          ></CommunityPage>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
