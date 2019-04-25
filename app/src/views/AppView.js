import React from 'react';

import Navigator from './navigation/RootNavigation';

export default AppView = () => {
  return <Navigator onNavigationStateChange={() => {}} uriPrefix="/app" />;
}
