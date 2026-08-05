import WordleBoard from '../WordleBoard.vue'
import { mount } from '@vue/test-utils'
import { DEFEAT_MESSAGE, VICTORY_MESSAGE, WORD_SIZE } from '@/settings'
import { describe } from 'vitest'

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

  describe('End of the game messages', () => {
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

  describe('Rules for defining the word of the day', () => {
    beforeEach(() => {
      console.warn = vi.fn()
    })

    test.each([
      { wordOfTheDay: 'FLY', reason: 'word of the day must be 5 characters long' },
      { wordOfTheDay: 'tests', reason: 'word of the day must be all uppercase' },
      { wordOfTheDay: 'AWQWQ', reason: 'word of the day must be a valid English word' },
    ])('Since $reason: $wordOfTheDay is invalid, a warning is emitted', ({ wordOfTheDay }) => {
      mount(WordleBoard, { props: { wordOfTheDay } })

      expect(console.warn).toHaveBeenCalled()
    })

    test('no warning is emitted if the word of the day provided is a real uppercase English word with 5 characters', () => {
      mount(WordleBoard, { props: { wordOfTheDay: 'TESTS' } })

      expect(console.warn).not.toHaveBeenCalled()
    })
  })

  describe('Player input', () => {
    test(`player guesses are limited to ${WORD_SIZE} letters`, async () => {
      await playerSubmitsGuess(wordOfTheDay + 'EXTRA')
      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })
    test('player guesses can only be submitted if they are real words', async () => {
      await playerSubmitsGuess('QWERT')
      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
    })
    test('player guesses are not case-sensitive', async () => {
      await playerSubmitsGuess(wordOfTheDay.toLowerCase())
      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })
    test('player guesses can only contain letters', async () => {
      await playerSubmitsGuess('QWE!RT1')

      expect(wrapper.find<HTMLInputElement>('input[type="text"]').element.value).toEqual('QWERT')
    })
  })
})
