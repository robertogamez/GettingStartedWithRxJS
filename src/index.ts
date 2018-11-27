import { Observable } from 'rxjs';
import { load } from './loader';

// let source = Observable.onErrorResumeNext(
//     Observable.of(1),
//     Observable.from([2, 3, 4]),
//     Observable.throw(new Error("Stop!")),
//     Observable.of(5)
// );
// let source = Observable.merge(
//     Observable.of(1),
//     Observable.from([2, 3, 4]),
//     Observable.throw(new Error("Stop!")),
//     Observable.of(5)
// ).catch(e => {
//     console.log(`caught: ${e}`);

//     return Observable.of(10);
// });

// source.subscribe(
//     value => console.log(`value: ${value}`),
//     error => console.log(`error: ${error}`),
//     () => console.log('complete')
// );

let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(button, 'click');

function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement('div');
        div.innerText = m.title;
        output.appendChild(div);
    });
}

// click.flatMap(e => load('movies.json'))
//     .subscribe(o => console.log(o));

click.flatMap(e => load('moviess.json'))
    .subscribe(
        renderMovies,
        e => console.log(`error: ${e}`),
        () => console.log('complete')
    );

let subscription = load('movies.json')
        .subscribe(
            renderMovies,
            e => console.log(`error: ${e}`),
            () => console.log('complete')
        );

console.log(subscription);
subscription.unsubscribe();