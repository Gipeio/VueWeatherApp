import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import { createTestingPinia } from '@pinia/testing'

describe('App.vue Test', () => {
  it('renders the page', () => {
    // render the component
    const wrapper = mount(App, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })

    // check that all 3 sub-components are rendered
    expect(wrapper.getComponent({ name: 'WeatherHeader' }).exists()).toBeTruthy()
    expect(wrapper.getComponent({ name: 'WeatherContent' }).exists()).toBeTruthy()
    expect(wrapper.getComponent({ name: 'WeatherFooter' }).exists()).toBeTruthy()
  })
})
