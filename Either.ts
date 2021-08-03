interface FoldObject<L, R> {
    onSuccess(val: R): void;
    onFailure(err: L): void;
}


class Either<L, R> {
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

class Right<R> extends Either<unknown, R> {
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



// function test() {
//     const all = getAll();
//
//     let output = "";
//
//     all.fold(new class implements FoldObject<Error, string> {
//         onSuccess(val: string) {
//             console.log(val);
//             output = val;
//         }
//         onFailure(err: Error) {
//             console.error(err)
//         }
//     });
//
//
//     console.log("output:", output)
// }
//
// function getAll(): Either<Error, string> {
//     return right("Hello");
// }
//
// test();