import { handleSubmit } from '../client/js/formHandler';

describe('the function handleSubmit() expect it to be a Defined', () => {
    test('It should be defined', async () => {
        expect( handleSubmit).toBeDefined();
    });
});