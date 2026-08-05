import WordleBoard from '../WordleBoard.vue'
import { mount } from '@vue/test-utils'
import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '@/settings'

describe('WordleBoard', () => {
  const wordOfTheDay = 'TESTS'
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    // Arrange phase
    wrapper = mount(WordleBoard, { props: { wordOfTheDay } })
  })

  async function playerSubmitsGuess(guess: string) {
    // Act phase
    const guessInput = wrapper.find('input[type=text]')
    await guessInput.setValue(guess)
    await guessInput.trigger('keydown.enter')
  }

  test('a victory message appears when the user makes a guess that matches the word of the day', async () => {
    // Act phase
    await playerSubmitsGuess(wordOfTheDay)

    // Assertion phase
    expect(wrapper.text()).toContain(VICTORY_MESSAGE)
  })

  test('a defeat message appears when the user makes guess that is incorrect', async () => {
    // Act phase
    await playerSubmitsGuess('WRONG')

    // Assertion phase
    expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
  })

  test('no end-of-game message appears if the user has not yed made a guess', () => {
    // Assertion phase
    expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
    expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
  })
})
