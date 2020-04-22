import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Counter from '../src/demo.vue'
import val from '../src/index'
describe('demo.vue', () => {
  it('innerHTML', () => {
    const wrapper = shallowMount(Counter)
    expect(wrapper.html()).contains('demo')
  })
})

describe('index.ts', () => {
  it('index.ts', () => {
    expect(val).eq(3)
  })
})
