import WordleBoard from '../WordleBoard.vue'
import { mount } from '@vue/test-utils'
import { DEFEAT_MESSAGE, MAX_GUESSES_COUNT, VICTORY_MESSAGE, WORD_SIZE } from '@/settings'
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

    describe.each(
      Array.from({ length: MAX_GUESSES_COUNT + 1 }, (_, numberOfGuesses) => ({
        numberOfGuesses,
        shouldSeeDefeatMessage: numberOfGuesses === MAX_GUESSES_COUNT,
      })),
      //   [
      //   { numberOfGuesses: 0, shouldSeeDefeatMessage: false },
      //   { numberOfGuesses: 1, shouldSeeDefeatMessage: false },
      //   { numberOfGuesses: 2, shouldSeeDefeatMessage: false },
      //   { numberOfGuesses: 3, shouldSeeDefeatMessage: false },
      //   { numberOfGuesses: 4, shouldSeeDefeatMessage: false },
      //   { numberOfGuesses: 5, shouldSeeDefeatMessage: false },
      //   { numberOfGuesses: MAX_GUESSES_COUNT, shouldSeeDefeatMessage: true },
      // ]
    )(
      `a defeat message should appear when the user makes incorrect guesses ${MAX_GUESSES_COUNT} times in a row`,
      ({ numberOfGuesses, shouldSeeDefeatMessage }) => {
        test(`therefore for ${numberOfGuesses} guess(es), a defeat message should ${shouldSeeDefeatMessage ? '' : 'not'} appear`, async () => {
          for (let i = 0; i < numberOfGuesses; i++) {
            await playerSubmitsGuess('WRONG')
          }

          if (shouldSeeDefeatMessage) {
            expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
          } else {
            expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
          }
        })
      },
    )

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
    test('remains in focus the entire time', async () => {
      document.body.innerHTML = `<div id="app"></div>`
      wrapper = mount(WordleBoard, {
        props: { wordOfTheDay },
        attachTo: '#app',
      })

      expect(
        wrapper.find<HTMLInputElement>('input[type="text"]').attributes('autofocus'),
      ).not.toBeUndefined()

      await wrapper.find('input[type=text]').trigger('blur')
      expect(document.activeElement).toBe(wrapper.find('input[type=text]').element)
    })

    test('the input gets cleared after each submission', async () => {
      await playerSubmitsGuess('WRONG')
      expect(wrapper.find<HTMLInputElement>('input[type="text"]').element.value).toEqual('')
    })

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

    test('non-letter characters do not render on the screen while being typed', async () => {
      await playerSubmitsGuess('12')
      await playerSubmitsGuess('123')
      expect(wrapper.find<HTMLInputElement>('input[type="text"]').element.value).toEqual('')
    })
  })

  test('all previous guesses done by the player are visible on the page', async () => {
    const guesses = ['WRONG', 'GUESS', 'HELLO', 'WORLD', 'HAPPY', 'CODER']

    for (const guess of guesses) {
      await playerSubmitsGuess(guess)
    }

    for (const guess of guesses) {
      expect(wrapper.text()).toContain(guess)
    }
  })
})
