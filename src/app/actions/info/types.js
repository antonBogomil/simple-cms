export const OPEN_WINDOW = 'OPEN_WINDOW';
export const CLOSE_WINDOW = 'CLOSE_WINDOW';

export const openWindowDispatch = message => {
    return {
        type: OPEN_WINDOW,
        payload: message
    }
};