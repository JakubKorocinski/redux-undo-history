/**
 * If we wanted to implement Undo and Redo in such an app, we'd need to store more state so we can answer the following questions:
 *  Is there anything left to undo or redo?
 *  What is the current state?
 *  What are the past (and future) states in the undo stack?
 * It is reasonable to suggest that our state shape should change to answer these questions:
 */

const exampleState1 = {
    counter: {
      past: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      present: 10,
      future: []
    }
};

// Now, if user presses “Undo”, we want it to change to move into the past

const exampleState2 = {
    counter: {
      past: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      present: 9,
      future: [10]
    }
};

// And further yet

const exampleState3 = {
    counter: {
      past: [0, 1, 2, 3, 4, 5, 6, 7],
      present: 8,
      future: [9, 10]
    }
};

// When the user presses “Redo”, we want to move one step back into the future:

const exampleState4 = {
    counter: {
      past: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      present: 9,
      future: [10]
    }
};

// Finally, if the user performs an action (e.g. decrement the counter) while we're in the middle of the undo stack,
// we're going to discard the existing future:

const exampleState5 = {
    counter: {
      past: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      present: 8,
      future: []
    }
};

// The interesting part here is that it does not matter whether we want to keep an undo stack of numbers, strings, arrays, or objects.
// The structure will always be the same:

const exampleState6 = {
    counter: {
      past: [0, 1, 2],
      present: 3,
      future: [4]
    }
};

// OR

const exampleState7 = {
    todos: {
      past: [
        [],
        [{ text: 'Use Redux' }],
        [{ text: 'Use Redux', complete: true }]
      ],
      present: [
        { text: 'Use Redux', complete: true },
        { text: 'Implement Undo' }
      ],
      future: [
        [
          { text: 'Use Redux', complete: true },
          { text: 'Implement Undo', complete: true }
        ]
      ]
    }
};

// Conclusion: everything is just a set o arrays of objects of the same type

const exampleGenericState = {
    past: Array<T>,
    present: T,
    future: Array<T>
};

// NEXT: GOTO reducers implementation