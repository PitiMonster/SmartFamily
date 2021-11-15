import { Switch, Route, BrowserRouter } from "react-router-dom";

import ChatPage from "./ChatPage";

const Router: React.FC = () => {
  return (
    <BrowserRouter basename="/chats">
      <Switch>
        <Route path="/" exact={true}>
          <ChatPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
