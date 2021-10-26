import { Route, Switch } from 'react-router-dom';

import List from "./views/List";
import Detail from "./views/Detail";

const CustomRoute = () => (
  <Switch>
    <Route exact path="/" component={List}/>
    <Route exact path="/:id" component={Detail}/>
  </Switch>
)

export default CustomRoute;