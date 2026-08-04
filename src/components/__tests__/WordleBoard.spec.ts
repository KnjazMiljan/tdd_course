import WordleBoard from "../WordleBoard.vue";
import {mount} from "@vue/test-utils";

describe('WordleBoard', () => {
    test('a victory message appears when the user makes a guess that matches the word of the day', async() => {
        // Arrange phase
        const wrapper = mount(WordleBoard, { props: { wordOfTheDay: "TESTS" }})

        // Act phase
        const guessInput = wrapper.find('input[type=text]');
        await guessInput.setValue("TESTS");
        await guessInput.trigger('keydown.enter');

        // Assertion phase
        expect(wrapper.text()).toContain('You won!');
    })
})