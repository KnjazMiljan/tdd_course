import WordleBoard from "../WordleBoard.vue";
import {mount} from "@vue/test-utils";
import {VICTORY_MESSAGE} from "@/settings";

describe('WordleBoard', () => {
    test('a victory message appears when the user makes a guess that matches the word of the day', async() => {
        // Arrange phase
        const wrapper = mount(WordleBoard, { props: { wordOfTheDay: "TESTS" }})

        // Act phase
        const guessInput = wrapper.find('input[type=text]');
        await guessInput.setValue("TESTS");
        await guessInput.trigger('keydown.enter');

        // Assertion phase
        expect(wrapper.text()).toContain(VICTORY_MESSAGE);
    })

    test('a defeat message appears when the user makes guess that is incorrect', async() => {
        // Arrange phase
        const wrapper = mount(WordleBoard, { props: { wordOfTheDay: "TESTS" }})

        // Act phase
        const guessInput = wrapper.find('input[type=text]');
        await guessInput.setValue("WRONG");
        await guessInput.trigger('keydown.enter');

        // Assertion phase
        expect(wrapper.text()).toContain("Better luck next time");
    });
    test.todo('no end-of-game message appears if the user has not yed made a guess');
})