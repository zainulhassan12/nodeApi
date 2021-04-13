// import auth from '../Auth.js'
import { getUsers } from '../Auth'
describe('Auth', () => {
    it('shold return a array of user objects', () => {

        const result = getUsers()
        expect(result).toEqual(expect.arrayContaining([{}]))

    })

})