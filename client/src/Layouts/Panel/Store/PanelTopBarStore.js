import {makeAutoObservable} from 'mobx'

class PanelTopBarState{
  PanelTopBar = false
  constructor(){
    makeAutoObservable(this)
  }

  changePanelTopBar(){
    this.PanelTopBar = !this.PanelTopBar
  }
}

export default new PanelTopBarState()