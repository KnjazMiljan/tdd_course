import WordleBoard from "../WordleBoard.vue";
import {mount} from "@vue/test-utils";

describe('WordleBoard', () => {
    it('renders correctly', () => {
        const wrapper = mount(WordleBoard, {props: {msg: "Hello Vitest"}})
        expect(wrapper.text()).toContain('Hello Vitest')
    })
})