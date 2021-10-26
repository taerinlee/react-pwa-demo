import { Route, Switch } from 'react-router-dom';

import List from "./views/List";

const CustomRoute = () => (
  <Switch>
    <Route exact path="/" component={List}/>
  </Switch>
)

export default CustomRoute;