import { Switch, Route, BrowserRouter } from "react-router-dom";

import ChatPage from "./ChatPage";
import SpecificChatPage from "./SpecificChatPage";

const Router: React.FC = () => {
  return (
    <BrowserRouter basename="/chats">
      <Switch>
        <Route path="/" exact={true}>
          <ChatPage />
        </Route>
      </Switch>
      <Switch>
        <Route path="/:id" exact={true}>
          <SpecificChatPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
