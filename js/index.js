const secret_key = '?6kA]#m:A8+F7~:^?4tq9tevBrAnw\LtP?Z;Bs;"'

const setName = () => {
  const name_container = document.getElementById("name")

  if(!existsToken("name")) {
    const url_string = window.location.href
    const url = new URL(url_string)
    const token = url.searchParams.get('token')

    if(token !== null) {
      const name = decryptName(token)

      setCookie("name", token)
      document.title = `Te Quiero ${name}`
      name_container.innerHTML = name
    } else {
      document.title = 'Te Quiero...'
    }
  } else {
    const name = decryptName(getCookie('name'))

    document.title = `Te Quiero ${name}`
    name_container.innerHTML = name
  }
}

const drawStars = () => {
  let height = window.innerHeight
  let width = window.innerWidth

  for(let index=0; index<300; index++) {
    let random_height = Math.floor(Math.random() * height)
    let random_width = Math.floor(Math.random() * width)
    let star = document.createElement("div")
    star.setAttribute("class", "star")
    star.style.bottom = `${random_height}px`
    star.style.right = `${random_width}px`
    document.body.appendChild(star)
  }
}

const getUrl = name => {
  const encrypted = objectToGetParams({ token: CryptoJS.AES.encrypt(name, secret_key) });
  return encrypted
}

const objectToGetParams = object => {
  return Object.keys(object)
    .filter(key => !!object[key])
    .map(key => `${key}=${encodeURIComponent(object[key])}`)
    .join('&');
}

const decryptName = token => {
  name = CryptoJS.AES.decrypt(token.toString(), secret_key).toString(CryptoJS.enc.Utf8);
  return name
}

const setCookie = (name, content) => {
  document.cookie = `${name}=${content}`
}

const getCookie = name => {
  name = `${name}=`
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')

  for(let index = 0; index <ca.length; index++) {
    let c = ca[index]

    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }

  return null
}

const existsToken = name => {
  return getCookie(name) !== null ? true : false
}

window.onload = () => {
  setName()
  drawStars()
}
