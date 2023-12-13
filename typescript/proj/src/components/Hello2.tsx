import * as React from 'react';

export interface Props {
    name: string;
    enthusiasmLevel?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
}

function Hello2({name, enthusiasmLevel = 1, onIncrement, onDecrement}: Props) {
    if(enthusiasmLevel <= 0) {
        throw new Error('You could be a little more enthusiastic. :D')
    }

    return (
        <div className='hello2'>
            <div className="greeting">
                Hello {name + getExclamationMarks(enthusiasmLevel)}
            </div>
            <div>
                <button onClick={onDecrement}>-</button>
                <button onClick={onIncrement}>+</button>
            </div>
        </div>
    )
}

export default Hello2;

function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!')
}