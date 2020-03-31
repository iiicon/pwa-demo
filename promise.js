readFile(filename, (err, content) => {
  parseXML(content, (err, xml) => {})
})

readFile(filename).then(content=>parseXML(content)).then(xml=>{}).catch()

open().then(handle).finally(close)

Promise.resolve()
Promise.reject()
Promise.all('abc') // [a,b,c]
Promise.allSettled()
Promise.race() // a
