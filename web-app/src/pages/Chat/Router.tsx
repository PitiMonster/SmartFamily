import { Switch, Route, BrowserRouter } from "react-router-dom";

import ChatPage from "./ChatPage";
import SpecificChatPage from "./SpecificChatPage";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route path="/chats/" exact={true}>
        <ChatPage />
      </Route>
      <Route path="/chats/:id" exact={true}>
        <SpecificChatPage />
      </Route>
    </Switch>
  );
};

export default Router;
