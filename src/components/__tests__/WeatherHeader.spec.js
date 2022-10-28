import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import WeatherHeader from '../WeatherHeader.vue'


describe('WeatherHeader.vue Test', () => {
  it('renders message when component is created', () => {
    // render the component
    const wrapper = shallowMount(WeatherHeader, {
      propsData: {
        title: 'Vue Project'
      }
    })

    // check that the title is rendered
    expect(wrapper.text()).toMatch('Vue Project')
  })
})
