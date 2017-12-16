class Dom {
  constructor () {

  }

  static isScrollBottom () {
    let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop

    return document.body.scrollHeight - scrollTop <= document.body.clientHeight
  }
}

export default Dom
