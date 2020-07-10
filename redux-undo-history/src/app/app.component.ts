import { Component, OnInit } from '@angular/core';
import { createStore } from 'redux';
import { enhancedUndoableReducer } from './redux/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'redux-undo-history';

/**
 * Metoda createStore nie musi przyjmować stanu początkowego i tutaj nie musi bo sam reducer zadba o obsługę stanu początkowego.
 */
  store = createStore(enhancedUndoableReducer);

  ngOnInit(): void {
    this.store.dispatch({
      type: 'ADD_TODO',
      text: 'Use Redux'
    });
    console.log('First dispatch: ', this.store.getState().present);

    this.store.dispatch({
      type: 'ADD_TODO',
      text: 'Implement Undo'
    });
    console.log('Second dispatch: ', this.store.getState());

    this.store.dispatch({
      type: 'UNDO'
    });
    console.log('Third dispatch: ', this.store.getState());

  }

}
