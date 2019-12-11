import React from 'react';
import { Route } from 'react-router';
import routes from '../Routes/routes';

const DashRoutes = () => {
  const renderSubroutes = subroutes => {
    if (subroutes) {
      return (
        <div>
          {Object.values(subroutes).map(subroute => {
            return (
              <Route key={subroute.text} exact path={subroute.link} render={subroute.render} />
            );
          })}
        </div>
      );
    }
    return null;
  };

  const routeArray = Object.values(routes());

  return (
    <div>
      {routeArray.map(route => {
        return (
          <div key={route.text}>
            <Route exact path={route.link} render={route.render} />
            {renderSubroutes(route.subroutes)}
          </div>
        );
      })}
    </div>
  );
};

export default DashRoutes;
