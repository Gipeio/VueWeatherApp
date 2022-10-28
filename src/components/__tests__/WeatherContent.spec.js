import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import WeatherContent from '../WeatherContent.vue'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { createTestingPinia } from '@pinia/testing'
import { useCitiesStore } from '@/stores/cities'

// Set the mock adapter for mocking the axios library
var mock = new MockAdapter(axios)

describe('WeatherContent.vue Tests with Successful HTTP GET calls', () => {
  let wrapper = null
  let store = null

  beforeEach(() => {
    // Mock any GET requests to the Geocoding API of Open Weather
    // NOTE: arguments for reply are (status, data, headers)
    const geocodingUrlBase = "https://api.openweathermap.org/geo/1.0/direct"
    const geocodingUrl = new RegExp(`${geocodingUrlBase}/*`);
    mock.onGet(geocodingUrl).reply(200, [
      {
        "name": "Chicago",
        "lat": 41.8755616,
        "lon": -87.6244212,
        "country": "US",
        "state": "Illinois"
      }
    ])

    // Mock any GET requests to the Current Weather Data API of Open Weather
    // NOTE: arguments for reply are (status, data, headers)
    const weatherUrlBase = "https://api.openweathermap.org/data/2.5/weather"
    const weatherUrl = new RegExp(`${weatherUrlBase}/*`);
    mock.onGet(weatherUrl).reply(200, {
        "weather": [
          {
            "main": "Cloudy"
          }
        ],
        "main": {
          "temp": 56.3,
          "temp_max": 58.6,
          "temp_min": 53.8
        }
      }
    )

    // render the component
    wrapper = shallowMount(WeatherContent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })
    
    // Create the data store using the testing pinia
    store = useCitiesStore()
  })

  afterEach(() => {
    mock.reset();
    wrapper.unmount()
  })

  it('renders sub-components when the component is created', () => {
    // check that all 3 child components are rendered
    const banner = wrapper.findAll('.banner')
    expect(banner.length).toEqual(1)
    const search = wrapper.findAll('.weather-search')
    expect(search.length).toEqual(1)
    const results = wrapper.findAll('.cities')
    expect(results.length).toEqual(1)
  })

  it('does load the weather data when a successful HTTP GET occurs', async () => {
    wrapper.vm.searchCity('Chicago')

    // Wait until all Promises are resolved and the DOM updates
    await flushPromises()

    // Check that two calls were made to axios.get()
    expect(mock.history.get.length).toBe(2)
    expect(mock.history.get[0].url).toMatch('https://api.openweathermap.org/geo/1.0/direct')
    expect(mock.history.get[0].method).toMatch('get')
    expect(mock.history.get[1].url).toMatch('https://api.openweathermap.org/data/2.5/weather')
    expect(mock.history.get[1].method).toMatch('get')

    // check that 1 call was made to `store.addCity`
    expect(store.addCity).toHaveBeenCalledTimes(1)
    expect(store.addCity).toHaveBeenLastCalledWith('Chicago', 'Illinois', 'US', 'Cloudy', 56.3, 58.6, 53.8)
  })

  it('resets the banner data when clearMessage() is called', () => {
    // set the input data for the user
    wrapper.vm.messageToDisplay = 'Great search results!'
    wrapper.vm.messageType = 'Success!!!'

    wrapper.vm.clearMessage()

    // check that the banner message is reset
    expect(wrapper.vm.messageToDisplay).toMatch(/^$/)
    expect(wrapper.vm.messageType).toMatch('Info')
  })
})

describe('WeatherContent.vue Tests with Failed HTTP GET call for coordinates', () => {
  let wrapper = null
  let store = null

  beforeEach(() => {
    // Mock any GET requests to the Geocoding API of Open Weather to fail (404 - Not Found)
    const geocodingUrlBase = "https://api.openweathermap.org/geo/1.0/direct"
    const geocodingUrl = new RegExp(`${geocodingUrlBase}/*`);
    mock.onGet(geocodingUrl).reply(404)

    // render the component
    wrapper = shallowMount(WeatherContent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })
    
    // Create the data store using the testing pinia
    store = useCitiesStore()
  })

  afterEach(() => {
    mock.reset();
    wrapper.unmount()
  })

  it('does not save the weather data when the first HTTP GET fails', async () => {
    wrapper.vm.searchCity('Chicago')

    // Wait until all Promises are resolved and the DOM updates
    await flushPromises()

    // Check that one call was made to axios.get()
    expect(mock.history.get.length).toBe(1)
    expect(mock.history.get[0].url).toMatch('https://api.openweathermap.org/geo/1.0/direct')
    expect(mock.history.get[0].method).toMatch('get')
    
    // check that 0 calls were made to `store.addCity`
    expect(store.addCity).toHaveBeenCalledTimes(0)

    // check that the banner message indicates failure
    expect(wrapper.vm.messageToDisplay).toMatch('ERROR! Unable to retrieve coordinates (latitude, longitude) for Chicago!')
    expect(wrapper.vm.messageType).toMatch('Error')
  })
})

describe('WeatherContent.vue Tests with Failed HTTP GET call for current weather data', () => {
  let wrapper = null
  let store = null

  beforeEach(() => {
    // Mock any GET requests to the Geocoding API of Open Weather
    // NOTE: arguments for reply are (status, data, headers)
    const geocodingUrlBase = "https://api.openweathermap.org/geo/1.0/direct"
    const geocodingUrl = new RegExp(`${geocodingUrlBase}/*`);
    mock.onGet(geocodingUrl).reply(200, [
      {
        "name": "Chicago",
        "lat": 41.8755616,
        "lon": -87.6244212,
        "country": "US",
        "state": "Illinois"
      }
    ])

    // Mock any GET requests to the Current Weather Data API of Open Weather to fail (404 - Not Found)
    const weatherUrlBase = "https://api.openweathermap.org/data/2.5/weather"
    const weatherUrl = new RegExp(`${weatherUrlBase}/*`);
    mock.onGet(weatherUrl).reply(404)

    // render the component
    wrapper = shallowMount(WeatherContent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })
    
    // Create the data store using the testing pinia
    store = useCitiesStore()
  })

  afterEach(() => {
    mock.reset();
    wrapper.unmount()
  })

  it('does not save the weather data when the second HTTP GET fails', async () => {
    wrapper.vm.searchCity('Chicago')

    // Wait until all Promises are resolved and the DOM updates
    await flushPromises()

    // Check that two calls were made to axios.get()
    expect(mock.history.get.length).toBe(2)
    expect(mock.history.get[0].url).toMatch('https://api.openweathermap.org/geo/1.0/direct')
    expect(mock.history.get[0].method).toMatch('get')
    expect(mock.history.get[1].url).toMatch('https://api.openweathermap.org/data/2.5/weather')
    expect(mock.history.get[1].method).toMatch('get')
    
    // check that 0 calls were made to `store.addCity`
    expect(store.addCity).toHaveBeenCalledTimes(0)

    // check that the banner message indicates failure
    expect(wrapper.vm.messageToDisplay).toMatch('ERROR! Unable to retrieve weather data for Chicago!')
    expect(wrapper.vm.messageType).toMatch('Error')
  })
})

// describe('Behavioral Test for App.vue with Successful HTTP GET', () => {
//   let wrapper = null

//   beforeEach(() => {
//     const responseGet = { data:
//       {
//         name: 'Chicago',
//         weather: [
//           {
//             main: 'Cloudy',
//             description: 'Cloudy with a chance of rain'
//           }
//         ],
//         main: {
//           temp: 56.3,
//           temp_min: 53.8,
//           temp_max: 58.6
//         }
//       }
//     }

//     // Set the mock call to GET to return a successful GET response
//     axios.get.mockResolvedValue(responseGet)

//     // render the component (including all sub-components)
//     wrapper = mount(App, {
//       global: {
//         plugins: [
//           createTestingPinia({
//             createSpy: vi.fn
//           })
//         ]
//       }
//     })
//   })

//   afterEach(() => {
//     axios.get.mockReset()
//     wrapper.unmount()
//   })


// })
