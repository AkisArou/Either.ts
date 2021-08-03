interface FoldObject<L extends Error, R> {
    onSuccess(val: R): void;
    onFailure(err: L): void;
}


class Either<L extends Error, R> {
    constructor(
        private readonly error: L,
        private readonly value: R) {
    }

    fold(foldObject: FoldObject<L, R>): void {
        return this instanceof Left
            ? foldObject.onFailure(this.error)
            : foldObject.onSuccess(this.value);
    }
}

class Left<L extends Error, R> extends Either<L, unknown> {
    constructor(error: L) {
        super(error, null);
    }
}

class Right<L extends Error, R> extends Either<L, R> {
    constructor(value: R) {
        super(null, value);
    }
}

function left<L extends Error, R> (x: L): Either<L, R> {
    return new Left(x) as Either<L, R>;
}


function right<L extends Error, R> (x: R): Either<L, R> {
    return new Right(x) as Either<L, R>;
}


// EXAMPLE
// class MyError extends Error {}
//
// function getAll(): Either<MyError, string> {
//     return right("Hello");
// }
//
// function test() {
//     const all = getAll();
//
//     all.fold(new class implements FoldObject<MyError, string> {
//         onFailure(err: MyError): void {
//             console.log(err);
//         }
//
//         onSuccess(val: string): void {
//             console.log(val);
//         }
//     })
// }
//
//
// test();