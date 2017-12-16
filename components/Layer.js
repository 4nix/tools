class Layer {
  constructor () {
    if (Layer.instance !== undefined) {
      return Layer.instance
    }

    this.mask = null

    this.initMask()

    Layer.instance = this
  }

  initMask () {
    if (this.mask) {
      return
    }

    let dom = document.createElement('div')
    dom.style.position = 'fixed'
    dom.style.width = '100%'
    dom.style.height = '100%'
    dom.style.zIndex = 900
    dom.style.left = 0
    dom.style.right = 0
    dom.style.backgroundColor = '#333'
    dom.style.opacity = 0.4

    document.body.append(dom)
  }
}

export default Layer
