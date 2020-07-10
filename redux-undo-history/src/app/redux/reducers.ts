const initialState = {
    past: [],
    present: null, // (?) How do we initialize the present?
    future: []
};

export function undoableReducer(state = initialState, action) {
    const { past, present, future } = state;

    switch (action.type) {
      case 'UNDO':
        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);
        return {
          past: newPast,
          present: previous,
          future: [present, ...future]
        };
      case 'REDO':
        const next = future[0];
        const newFuture = future.slice(1);
        return {
          past: [...past, present],
          present: next,
          future: newFuture
        };
      case 'ADD_TODO':
        const oldPast = past;
        return {
            past: oldPast.concat(present),
            present: [action.text],
            future: []
        };
      default:
        // (?) How do we handle other actions?
        return state;
    }
}

/**
 * A reducer enhancer (or a higher order reducer) is a function that takes a reducer, and returns a new reducer
 * that is able to handle new actions, or to hold more state, delegating control to the inner reducer for the actions it doesn't understand.
 * This isn't a new pattern—technically, combineReducers() is also a reducer enhancer because it takes reducers and returns a new reducer.
 *
 * It's like a wrapper or higher order function
 */

 // EXAMPLE 1 - A reducer enhancer that adds NOTHING

function doNothingWithReducerEnhancer(reducer) {
    return (state, action) => {
      // Just call the passed reducer
      return reducer(state, action);
    };
}

/**
 * SECOND APPROACH - writing a reducer enhancer
 */

export function undoableReducerEnhancer(reducer) {
    // Call the reducer with empty action to populate the initial state
    const defaultInitialState = {
      past: [],
      present: reducer(undefined, {}), // MEGA WAŻNA Linia - tutaj używamy przekazanego reducera
      future: []
    };

    // Return a reducer that handles undo and redo
    return (state = defaultInitialState, action) => {

        const { past, present, future } = state;

        switch (action.type) {
            case 'UNDO':
                const previous = past[past.length - 1];
                const newPast = past.slice(0, past.length - 1);
                return {
                    past: newPast,
                    present: previous,
                    future: [present, ...future]
                };
            case 'REDO':
                const next = future[0];
                const newFuture = future.slice(1);
                return {
                    past: [...past, present],
                    present: next,
                    future: newFuture
                };
            default:
                // Delegate handling the action to the passed reducer
                const newPresent = reducer(present, action);  // MEGA WAŻNA Linia - tutaj używamy przekazanego reducera
                if (present === newPresent) {
                    return state;
                }
                return {
                    past: [...past, present],
                    present: newPresent,
                    future: []
                };
        }
    };
}

/**
 * Now we can enhance a reducer *undoableReducer* with undoableReducerEnhancer enhancer
 */

export const enhancedUndoableReducer = undoableReducerEnhancer(undoableReducer);
