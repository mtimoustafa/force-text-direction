'use babel';

import packageConfig from './config-schema.json';
import { CompositeDisposable } from 'atom';

export default {

  modalPanel: null,
  subscriptions: null,

  config: packageConfig,

  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'force-text-direction:disable':  () => this.disable()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'force-text-direction:forceLTR': () => this.forceLTR()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'force-text-direction:forceRTL': () => this.forceRTL()
    }));

    var config = atom.config.get('force-text-direction');

    if ( config.enabled ) {
        switch ( config.forceDirection ) {
            case 'LTR':
                this.forceLTR();
                break;
            case 'RTL':
                this.forceRTL();
                break;
            default:
                console.log('Warning: Unknown direction. Check config.forceDirection.');

        }
    }

  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return null
  },

  disable () {

      var editors = document.querySelector('atom-pane-container atom-pane div.item-views');

      editors.classList.remove('force-text-direction-rtl');
      editors.classList.remove('force-text-direction-ltr');

      atom.config.set('force-text-direction.enabled', false);

      return null;

  },

  forceLTR () {

    var editors = document.querySelector('atom-pane-container atom-pane div.item-views');

    editors.classList.remove('force-text-direction-rtl');
    editors.classList.add('force-text-direction-ltr');

    atom.config.set('force-text-direction.forceDirection', 'LTR');
    atom.config.set('force-text-direction.enabled', true);

    return null;

  },

  forceRTL () {

      var editors = document.querySelector('atom-pane-container atom-pane div.item-views');

      // Force RTL.
      editors.classList.remove('force-text-direction-ltr');
      editors.classList.add('force-text-direction-rtl');

      atom.config.set('force-text-direction.forceDirection', 'RTL');
      atom.config.set('force-text-direction.enabled', true);

      return null;

  }

};
