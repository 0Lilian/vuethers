import { watch, ref } from "vue";
import { dapp } from "../index.js";

// export class StatusList {
//
//     add (name, states) {
//       if (Object.keys(dapp.status).includes(name)) {
//         throw(`You cannot add a new status called '${name}', this name is either reserved by Vuethers or already existing.`);
//       }
//       dapp.status[name] = new Status(name, states);
//     }
// }

export class Status {

  constructor (name, states) {
    this._name = name;
    this.states = [];

    // Ensure that the given states is an array of strings.
    if (!Array.isArray(states)) {
      throw(`The 'states' parameter of a Status instance '${name}' must an array of strings. Got: ${states}`)
    }
    for (const state of states) {
      this.states.push(this._formatState(state))
    }

    this._state = ref(this.states[0]);
  }

  _formatState(state) {
    return state.toString().toUpperCase();
  }

  _isStateValid(state) {
    if (this.states.includes(this._formatState(state))) {
      return true
    }
    return false
  }

  _areStatesValid(states) {
    for (const state of states) {
      if (!this._isStateValid(state)) {
        return false
      }
    }
    return true
  }

  get() {
    return this._state.value;
  }

  getRef() {
    return this.state;
  }

  set(state) {
    console.log(`status ${this._name} set to ${state}`)
    state = this._formatState(state);
    if (!this._isStateValid(state)) {
      throw(`The state given to the set() method of Status instance '${this._name}' must a value in ${this.states}. Got: ${state}`)
    }
    this._state.value = state;
  }

  is(state) {
    if (!this._isStateValid(state)) {
      throw(`The state given to the is() method of Status instance '${this._name}' must a value in ${this.states}. Got: ${state}`)
    }
    return this.get() == this._formatState(state);
  }

  isIn(states) {
    if (!this._areStatesValid(states)){
      throw(`The states given to the isIn() method of Status instance '${this._name}' must be an array with values in ${this.states}. Got: ${states}`)
    }
    for (const state of states) {
      if (this.is(state)) {
        return true
      }
    }
    return false
  }

  watch (states, callback) {
    let errorMessage = `The states given to the watch() method of Status instance '${this._name}' must be a string or an array with values in ${this.states}. Got: ${states}`;
    if (Array.isArray(states)) {
      if (!this._areStatesValid(states)) {
        throw(errorMessage)
      }
      watch(this._state, () => {
        if (states.includes(this._state)) {
          callback(this.get())
        }
      })
    }
    else {
      if (!this._isStateValid(states)) {
        throw(errorMessage)
      }
      watch(this._state, () => {
        if (states === this._state) {
          callback(this.get())
        }
      })
    }
  }

  watchAny(callback) {
    this.watch(this.states, callback);
  }
}
