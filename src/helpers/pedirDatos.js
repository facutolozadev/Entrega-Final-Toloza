import MOCK_DATA from '../services/MOCK_DATA.json'

export const pedirDatos = () => {
    return new Promise((res, rej) => {
        res(MOCK_DATA)
    })
}