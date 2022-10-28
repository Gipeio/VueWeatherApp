import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import WeatherBanner from '../WeatherBanner.vue'

describe('WeatherBanner.vue Implementation Test', () => {
  let wrapper = null

  // SETUP - run prior to each unit test
  beforeEach(() => {
    // Do Nothing - render the components in each unit test
  })

  // TEARDOWN - run after each unit test
  afterEach(() => {
    wrapper.unmount()
  })

  it('initializes with correct elements', () => {
    // render the component
    wrapper = shallowMount(WeatherBanner, {
      propsData: {
        bannerMessage: '',
        bannerType: ''
      }
    })

    // check that each element of the user is initialized to empty strings
    expect(wrapper.vm.bannerMessage).toMatch('')
    expect(wrapper.vm.bannerType).toMatch('')
    expect(wrapper.vm.bannerBackgroundColor).toMatch('blue')
  })

  it('initializes with error message', () => {
    // render the component
    wrapper = shallowMount(WeatherBanner, {
      propsData: {
        bannerMessage: 'Banner message 123',
        bannerType: 'Error'
      }
    })

    // check that each element of the user is initialized to empty strings
    expect(wrapper.vm.bannerMessage).toMatch('Banner message 123')
    expect(wrapper.vm.bannerType).toMatch('Error')
    expect(wrapper.vm.bannerBackgroundColor).toMatch('red')
  })

  it('initializes with success message', () => {
    // render the component
    wrapper = shallowMount(WeatherBanner, {
      propsData: {
        bannerMessage: 'Banner message 456',
        bannerType: 'Success'
      }
    })

    // check that each element of the user is initialized to empty strings
    expect(wrapper.vm.bannerMessage).toMatch('Banner message 456')
    expect(wrapper.vm.bannerType).toMatch('Success')
    expect(wrapper.vm.bannerBackgroundColor).toMatch('green')
  })

  it('initializes with info message', () => {
    // render the component
    wrapper = shallowMount(WeatherBanner, {
      propsData: {
        bannerMessage: 'Banner message 789',
        bannerType: 'Info'
      }
    })

    // check that each element of the user is initialized to empty strings
    expect(wrapper.vm.bannerMessage).toMatch('Banner message 789')
    expect(wrapper.vm.bannerType).toMatch('Info')
    expect(wrapper.vm.bannerBackgroundColor).toMatch('blue')
  })

  it('emits an event when the clear button is clicked', () => {
    // render the component
    wrapper = shallowMount(WeatherBanner, {
      propsData: {
        bannerMessage: 'Banner message 123',
        bannerType: 'Error'
      }
    })

    // trigger an event when the 'Clear' button is clicked
    wrapper.find('span').trigger('click')

    // check that 1 occurrence of the event has been emitted
    expect(wrapper.emitted('clear-banner')).toBeTruthy()
    expect(wrapper.emitted('clear-banner').length).toBe(1)
  })
})
