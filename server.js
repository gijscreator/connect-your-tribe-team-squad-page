import express from 'express'
import { Liquid } from 'liquidjs'

const app = express()
const engine = new Liquid()
const PORT = process.env.PORT || 8000
const API_BASE = 'https://fdnd.directus.app/items'

// config for all roles
const ROLE_MAP = {
  'teachers': 1, 'leaders': 2, 'tribes': 3, 'students': 4,
  'experts': 5, 'owners': 6, 'officers': 7
}

// config for filters
const SORT_MAP = {
  'baldness': 'is_bold', 'a-z': 'name', 'shoe-size': 'shoe_size',
  'season': 'fav_season', 'age': 'birthdate', 'fav-css': 'fav_property',
  'nickname': 'nickname', 'git-handle': 'github_handle',
  'fav-color': 'fav_color', 'residency': 'residency', 'z-a': '-name'
}

// express engine
app.engine('liquid', engine.express())
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// fetch helper
async function fetchItems(endpoint, queryParams = {}) {
  const defaultParams = {
    'filter[squads][squad_id][cohort]': '2526',
    'fields': '*,squads.*'
  }
  const mergedParams = new URLSearchParams({ ...defaultParams, ...queryParams })
  
  try {
    const response = await fetch(`${API_BASE}/${endpoint}?${mergedParams}`)
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`)
    const json = await response.json()
    return json.data || []
  } catch (err) {
    console.error(err)
    return []
  }
}

// load squads
const squadsData = await fetchItems('squad', { 'filter[tribe][name]': 'FDND Jaar 1' })
app.locals.squads = squadsData 

// helper for sorting
const getSortField = (querySort) => SORT_MAP[querySort] || 'name'


// define cart items (default = empty)

let squadCart = [];

// define message items (default = empty)
let messages = ["test, test"];

// all routes 

// home page
app.get('/', async (request, response) => {
  const persons = await fetchItems('person', {
    'sort': getSortField(request.query.sort),
    'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1'
  })
  response.render('index.liquid', { persons })
})

// add to cart post function
app.post('/add-to-cart', (request, response) => {
  const personId = request.body.id;
  
  // Only add if it's not already in the cart
  if (!squadCart.includes(personId)) {
    squadCart.push(personId);
  }
  
  // Redirect back to the /cart page when adding was succesful
  response.redirect('/cart');
});

// remove from cart post function
app.post('/remove-from-cart', (request, response) => {
  const personId = request.body.id;

  // 1. Remove the person from the array
  squadCart = squadCart.filter(id => id !== personId);

  // 2. Decide where to go:
  if (squadCart.length === 0) {
    // If no one is left, go home
    response.redirect('/');
  } else {
    // If people are still there, stay on the cart page
    response.redirect('/cart');
  }
});

app.get('/berichten', async function (request, response) {

  const params = {
    'filter[for]': 'Team Happy',
  }
  
  // Maak hiermee de URL aan, zoals we dat ook in de browser deden
  const apiURL = 'https://fdnd.directus.app/items/messages?' + new URLSearchParams(params)
  const messagesResponse = await fetch(apiURL)
  
  // Zet de JSON daarvan om naar een object
  const messagesResponseJSON = await messagesResponse.json()
  
  // Die we vervolgens doorgeven aan onze view
  response.render('messages.liquid', {
    messages: messagesResponseJSON.data
  })
})

app.post('/berichten', async function (request, response) {
  // data naar de api
  await fetch('https://fdnd.directus.app/items/messages', {
    method: 'POST',

    body: JSON.stringify({
      for: 'Team Happy',
      text: request.body.message,
      from: request.body.from
    }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })

  // redirect to messages 
  response.redirect(303, '/berichten')
})

app.get('/cart', async (request, response) => {
  // If the cart is empty, just render an empty list
  if (squadCart.length === 0) {
    return response.render('cart.liquid', { cart_items: [] });
  }

  // Filter Directus to only give us people in our squadCart array
  const cart_items = await fetchItems('person', {
    'filter[id][_in]': squadCart.join(',')
  });

  response.render('cart.liquid', { cart_items });
});

app.post('/search', (request, response) => {
  const searchTerm = request.body.search?.trim()
  response.redirect(303, searchTerm ? `/search/${encodeURIComponent(searchTerm)}` : '/')
})

app.get('/search/:searchTerm', async (request, response) => {
  const { searchTerm } = request.params
  
  // --- The Easter Egg Logic ---
  const isEasterEgg = searchTerm.toLowerCase() === 'koop'
  
  const searchFields = [
    'name', 'nickname', 'github_handle', 'residency', 
    'fav_season', 'fav_animal', 'fav_property', 'vibe_emoji', 'custom'
  ]
  
  const query = {}
  searchFields.forEach((field, index) => {
    query[`filter[_or][${index}][${field}][_icontains]`] = searchTerm
  })

  const persons = await fetchItems('person', query)

  // Choose the template based on the search term
  const template = isEasterEgg ? 'koop.liquid' : 'search.liquid'
  
  response.render(template, { persons, searchTerm })
})

app.get('/student/:id', async (request, response) => {
  // Single items don't need the list filters, so we use fetch directly or a modified helper
  const person = await fetchItems(`person/${request.params.id}`)
  response.render('student.liquid', { person })
})

app.get('/:roleSlug', async (request, response, next) => {
  const roleId = ROLE_MAP[request.params.roleSlug]
  if (!roleId) return next()

  const persons = await fetchItems('person', {
    'filter[role][role_id]': roleId,
    'sort': getSortField(request.query.sort),
    'limit': -1
  })

  const roleName = persons[0]?.role?.[0]?.role_id?.name || request.params.roleSlug
  response.render('all.liquid', { persons, roleName })
})

// 404 route
app.use((request, response) => {
  response.status(404).render('404.liquid', { 
    path: request.path 
  });
});

app.listen(PORT, () => console.log(`App: http://localhost:${PORT}`))