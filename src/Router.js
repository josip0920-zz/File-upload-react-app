import React, { lazy, Suspense } from "react";

import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

const Home = lazy(() => import("./pages/Home"));

const history = createBrowserHistory({
    basename: "",
    forceRefresh: false,
});

const AppRouter = () => {
    return (
        <Router history={history}>
            <Suspense fallback={<div>...Loading...</div>}>
                <Switch>
                    <Route path="/" exact component={Home} />
                </Switch>
            </Suspense>
        </Router>
    )
}

export default AppRouter;