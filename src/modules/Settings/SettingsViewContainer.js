import { compose, withState } from 'recompose';

import ComponentsScreen from './SettingsView';

export default compose(
  withState('radioGroupsState', 'setRadioGroupsState', [0, 0]),
)(ComponentsScreen);
