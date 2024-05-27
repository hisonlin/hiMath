import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';
import './QuestionCard.css';

const QuestionCard = ({ id, type, problem, updateAnswers, buttonClicked, redBorder }) => {
    console.log(buttonClicked)
    const userAnswerRef = useRef(null);
    const problems = type;
    const num1 = String(problem[0]);
    const num2 = String(problem[1]);
    const answer = String(problem[2]);
    let symbol = '';

    if (problems === 'addition') {
        symbol = '+';
    } else if (problems === 'substraction') {
        symbol = '-';
    } else if (problems === 'multiplication') {
        symbol = 'x';
    } else {
        symbol = '÷';
    }

    const num1Length = num1.length;
    const num2Length = num2.length;
    const answerLength = answer.length;

    const handleInputChange = () => {
        const inputs = userAnswerRef.current.querySelectorAll('input');
        const values = Array.from(inputs).map(input => input.value);
        updateAnswers(id, values);
    };

    const handleInput = (e) => {
        if (e.target.value.length > 1) {
            e.target.value = e.target.value.slice(0, 1);
        }
        handleInputChange();
    };

    const inputStyle = {
        width: '20px',
        height: '30px',
        fontSize: '30px',
        textAlign: 'end',
        marginTop: '10px',
        padding: '0'
    };

    return (
        <Paper elevation={1} sx={{
            width: 'auto',
            height: 'auto',
            fontSize: '30px',
            padding: '20px',
            border: redBorder ? '4px solid red' : 'none'
        }}>
            <div style={{ display: "flex", justifyContent: "end", letterSpacing: "5px" }}>
                {problems === 'division' ? answer : num1}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #333" }}>
                <div>
                    {symbol}
                </div>
                <div style={{ paddingRight: "4px" }}>
                    {(num2.split('').map((digit, idx) => (
                        <React.Fragment key={idx}>
                            <input type="number"
                                onInput={handleInput}
                                disabled={buttonClicked}
                                style={{
                                    width: '5px',
                                    height: '10px',
                                    fontSize: '8px',
                                    textAlign: "end",
                                    padding: '0',
                                }} />
                            {digit}
                        </React.Fragment>
                    )))}
                </div>
            </div>
            {problems === 'multiplication' ?
                <div style={{ display: "flex", justifyContent: "end" }}>
                    {num2Length === 1 ?
                        <div style={{ display: "flex", justifyContent: "end", gap: '5px' }}>
                            {[...Array(answerLength)].map((_, index) => (
                                <input
                                    disabled={buttonClicked}
                                    key={index}
                                    type="number"
                                    onInput={handleInput}
                                    style={inputStyle}
                                />
                            ))}
                        </div> :
                        <>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', width: '100%' }}>
                                {[...Array(num2Length - 1)].map((_, index) => (
                                    <div key={index} style={{ display: "flex", justifyContent: "end", gap: '5px' }}>
                                        {[...Array(answerLength)].map((_, subIndex) => (
                                            <input
                                                disabled={buttonClicked}
                                                key={subIndex}
                                                type="number"
                                                onInput={handleInput}
                                                style={inputStyle}
                                            />
                                        ))}
                                    </div>
                                ))}
                                <div style={{ display: "flex", justifyContent: "space-between", width: '100%' }}>
                                    <div>+</div>
                                    <div style={{ display: "flex", justifyContent: "end", gap: '5px' }}>
                                        {[...Array(answerLength)].map((_, index) => (
                                            <input
                                                disabled={buttonClicked}
                                                key={index}
                                                type="number"
                                                onInput={handleInput}
                                                style={inputStyle}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div style={{ width: '100%', height: '5px', borderBottom: '2px solid #000' }}></div>
                                <div ref={userAnswerRef} className='userAnswer' style={{ display: "flex", justifyContent: "end", gap: '5px' }}>
                                    {[...Array(answerLength)].map((_, index) => (
                                        <input
                                            disabled={buttonClicked}
                                            key={index}
                                            id={index}
                                            type="number"
                                            style={inputStyle}
                                            onChange={handleInputChange}
                                            onInput={handleInput}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    }
                </div> :
                <div ref={userAnswerRef} className='userAnswer' style={{ display: "flex", justifyContent: "end", gap: '5px' }}>
                    {[...Array(problems === 'division' ? num2Length : answerLength)].map((_, index) => (
                        <input
                            disabled={buttonClicked}
                            key={index}
                            id={index}
                            type="number"
                            style={inputStyle}
                            onChange={handleInputChange}
                            onInput={handleInput}
                        />
                    ))}
                </div>
            }
        </Paper>
    );
}

QuestionCard.propTypes = {

};

export default QuestionCard;
