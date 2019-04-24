import React from 'react';

import Navigator from './navigation/RootNavigation';

export default function AppView() {
  return <Navigator onNavigationStateChange={() => {}} uriPrefix="/app" />;
}
