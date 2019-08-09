/*
 * ============s
 *    Setup
 * ============
 */
const index = require('../index');

/*
 * ============
 *  Test Cases
 * ============
 */
describe('helloWorld', () => {
    test('it returns a successful response', () => {
        const req = {}
        const res = {
            send: (payload) => {
                expect(payload).toBe("Hello from Firebase!")
            }
        }

        index.helloWorld(req, res)
    })
})