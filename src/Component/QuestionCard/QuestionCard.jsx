import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';
import './QuestionCard.css';

const QuestionCard = ({ id, type, problem, updateAnswers }) => {
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

    return (
        <Paper elevation={1} sx={{ width: '220px', height: 'auto', fontSize: '30px', padding: '20px' }}>
            <div style={{ display: "flex", justifyContent: "end", letterSpacing: "5px" }}>
                {problems === 'division' ? answer : num1}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #333" }}>
                <div>
                    {symbol}
                </div>
                <div>
                    {(num2.split('').map((digit, idx) => (
                        <React.Fragment key={idx}>
                            <input type="text" style={{ width: '5px', height: '10px', fontSize: '8px', textAlign: "end", padding: '0' }} />
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
                                    key={index}
                                    type="number"
                                    style={{ width: '20px', fontSize: '30px', textAlign: "end", marginTop: "10px" }}
                                />
                            ))}
                        </div> :
                        <>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', width: '100%' }}>
                                {[...Array(num2Length - 1)].map((_, index) => (
                                    <div key={index} style={{ display: "flex", justifyContent: "end", gap: '5px' }}>
                                        {[...Array(answerLength)].map((_, subIndex) => (
                                            <input
                                                key={subIndex}
                                                type="number"
                                                style={{ width: '20px', fontSize: '30px', textAlign: "end", marginTop: "10px" }}
                                            />
                                        ))}
                                    </div>
                                ))}
                                <div style={{ display: "flex", justifyContent: "space-between", width: '100%' }}>
                                    <div>+</div>
                                    <div style={{ display: "flex", justifyContent: "end", gap: '5px' }}>
                                        {[...Array(answerLength)].map((_, index) => (
                                            <input
                                                key={index}
                                                type="number"
                                                style={{ width: '20px', fontSize: '30px', textAlign: "end", marginTop: "10px" }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div style={{ width: '100%', height: '5px', borderBottom: '2px solid #000' }}></div>
                                <div ref={userAnswerRef} className='userAnswer' style={{ display: "flex", justifyContent: "end", gap: '5px' }}>
                                    {[...Array(answerLength)].map((_, index) => (
                                        <input
                                            key={index}
                                            id={index}
                                            type="number"
                                            style={{ width: '20px', fontSize: '30px', textAlign: "end", marginTop: "10px" }}
                                            onChange={handleInputChange}
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
                            key={index}
                            id={index}
                            type="number"
                            style={{ width: '20px', fontSize: '30px', textAlign: "end", marginTop: "10px", padding: '0' }}
                            onChange={handleInputChange}
                        />
                    ))}
                </div>
            }
        </Paper>
    );
}

QuestionCard.propTypes = {
    type: PropTypes.string.isRequired,
    problem: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired
};

export default QuestionCard;
