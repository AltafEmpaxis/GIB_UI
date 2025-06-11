import { Suspense } from 'react';

import PropTypes from 'prop-types';

// project import
import Loader from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component) => {
  const LoadableComponent = (props) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

  // Add display name for dev tools
  LoadableComponent.displayName = `Loadable(${Component.displayName || Component.name || 'Component'})`;

  return LoadableComponent;
};

Loadable.propTypes = {
  Component: PropTypes.elementType
};

export default Loadable;
