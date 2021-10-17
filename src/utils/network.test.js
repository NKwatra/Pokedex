const network = require("./network")
// @ponicode
describe("network.getPokemonData", () => {
    test("0", () => {
        let callFunction = () => {
            network.getPokemonData(0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            network.getPokemonData(512)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            network.getPokemonData(2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            network.getPokemonData(18)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            network.getPokemonData(4)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            network.getPokemonData(Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
