import { Observable } from 'rxjs';

export function load(url: string) {
    return Observable.create(observer => {
        let xhr = new XMLHttpRequest();

        xhr.addEventListener('load', () => {

            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            } else {
                observer.error(xhr.statusText);
            }

        })

        xhr.open('get', url);
        xhr.send();
    }).retryWhen(retryStrategy({
        attempts: 3,
        delay: 1500
    }));
}

function retryStrategy({
    attempts = 3,
    delay = 1500
}){
    return function(errors) {
        return errors.scan((acc, value) => {
            console.log(acc, value);
            acc += 1;
            if(acc < attempts){
                return acc;
            } else {
                throw new Error(value);
            }
        }, 0)
        // .takeWhile(acc => acc < attempts)
        .delay(delay);
    }
}