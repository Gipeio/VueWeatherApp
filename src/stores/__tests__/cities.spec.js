import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCitiesStore } from '@/stores/cities'

describe('Data Store Test', () => {
  let store = null

  beforeEach(() => {
    // create a fresh Pinia instance and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())

    // create an instance of the data store
    store = useCitiesStore()
  })
  
  it('initializes with zero cities', () => {
    expect(store.getNumberOfCities).toEqual(0)
  })

  it('test adding a new city', () => {
    // Call the 'addCity' action
    store.addCity('Chicago', 'Illinois', 'US', 'cloudy', 75.6, 78.9, 65.2)

    // Check that the city was added
    expect(store.getNumberOfCities).toEqual(1)
    expect(store.weatherData.length).toEqual(1)
    expect(store.weatherData[0]).toEqual({
      'cityName': 'Chicago',
      'stateName': 'Illinois',
      'countryAbbreviation': 'US',
      'weatherSummary': 'cloudy',
      'currentTemperature': 75.6,
      'dailyHigh': 78.9,
      'dailyLow': 65.2
    })
  })

  it('test adding a duplicate city', () => {
    // Call the 'addCity' action
    store.addCity('New Orleans', 'Louisiana', 'US', 'sunny', 87.6, 78.9, 65.2)

    // Check that the city was added
    expect(store.weatherData.length).toEqual(1)
    expect(store.weatherData[0].cityName).toMatch('New Orleans')

    // Attempt to add the same city
    store.addCity('New Orleans', 'Louisiana', 'US', 'sunny', 87.6, 78.9, 65.2)

    // Check that only 1 instance of the city name is saved
    expect(store.weatherData.length).toEqual(1)
    expect(store.weatherData[0].cityName).toMatch('New Orleans')
  })
  
  it('test removing all cities', () => {
    // Add two cities to the data store
    store.addCity('New Orleans', 'Louisiana', 'US', 'sunny', 87.6, 78.9, 65.2)
    store.addCity('Denver', 'Colorado', 'US', 'windy', 94.5, 95.6, 56.7)

    // Check that the cities were added
    expect(store.weatherData.length).toEqual(2)

    // Remove a city
    store.clearAllCities()

    // Check that zero cities remain in the data store
    expect(store.weatherData.length).toEqual(0)
  })
})
