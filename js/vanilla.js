/**
 * Returns the 1st HTMLElement or <null>, which corresponds to the <query>,
 * @param query - CSS selector as a string
 * @returns {HTMLElement} - the 1st element found
 */
const $ = query => document.querySelector(query)
const $$ = query => Array.from(document.querySelectorAll(query))

/**
 * Binds an event handler (=function) to a DOM element
 * @param element - the target element, e.g. button
 * @param event - the event, e.g. 'click'
 * @param func - the function to be called, e.g. handleValidation
 * @returns {*} - the target element
 */
const $on = (element, event, func) => {
  Array.isArray(element)
    ? element.forEach(arrayElement => $on(arrayElement, event, func))
    : element.addEventListener(event, func)
  return element
}

/**
 * Runs through the HTML document and renders all handlebars script tags
 * @param data - the data to be rendered
 * @returns {Promise<void>}
 */
const render = async (data) => {
  const templates = $$('[type="text/x-handlebars-template"]')

  for (const source of templates) {
    await loadPartials(source)
    const template = Handlebars.compile(source.innerHTML)
    const target = source.parentElement
    target.insertAdjacentHTML('beforeend', template(data))
  }
}

/**
 * Loads partials with the file extension '.html' from the same directory
 * @param code - the source code to be parsed
 * @returns {Promise<void>}
 */
async function loadPartials(code) {
  const partialNames = code.innerText.match(/(?<={{(#>|>)).+?(?=\s)/g)
  if (partialNames) {
    for (let name of partialNames) {
      name = name.trim()
      const fileName = name + '.html'
      const partialCode = await fetch(fileName).then(response => response.text())
      Handlebars.registerPartial(name, partialCode)
    }
  }
}
