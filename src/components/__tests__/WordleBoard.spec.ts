import WordleBoard from "../WordleBoard.vue";
import {mount} from "@vue/test-utils";
import {VICTORY_MESSAGE, DEFEAT_MESSAGE} from "@/settings";

describe('WordleBoard', () => {
    const wordOfTheDay = "TESTS"

    test('a victory message appears when the user makes a guess that matches the word of the day', async() => {
        // Arrange phase
        const wrapper = mount(WordleBoard, { props: { wordOfTheDay }})

        // Act phase
        const guessInput = wrapper.find('input[type=text]');
        await guessInput.setValue(wordOfTheDay);
        await guessInput.trigger('keydown.enter');

        // Assertion phase
        expect(wrapper.text()).toContain(VICTORY_MESSAGE);
    })

    test('a defeat message appears when the user makes guess that is incorrect', async() => {
        // Arrange phase
        const wrapper = mount(WordleBoard, { props: { wordOfTheDay }})

        // Act phase
        const guessInput = wrapper.find('input[type=text]');
        await guessInput.setValue("WRONG");
        await guessInput.trigger('keydown.enter');

        // Assertion phase
        expect(wrapper.text()).toContain(DEFEAT_MESSAGE);
    });
    test.todo('no end-of-game message appears if the user has not yed made a guess');
})