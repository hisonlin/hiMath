import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './Questions.css'
import { useParams } from 'react-router-dom'
import QuestionCard from '../../Component/QuestionCard/QuestionCard'
import { useState } from 'react'
import SubmitButton from '../../Component/SubmitButton/SubmitButton'

const Questions = props => {

    const [answers, setAnswers] = useState([]);
    const[buttonClicked, setButtonClicked] = useState(false);
    console.log(answers);

    const updateAnswers = (id, values) => {
        setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            newAnswers[id] = values;
            return newAnswers;
        });
    };

    const params = useParams()
    const [problems, setProblems] = useState(params.problems);
    const [digit, setDigit] = useState(params.digit);
    const [negative, setNegative] = useState(params.negative);
    const [questions, setQuestions] = useState(parseInt(params.questions, 10));
    const [problemsArray, setProblemsArray] = useState([]);

    const getRandomNumber = (max) => {
        return Math.floor(Math.random() * max) + 1;
    };

    const calculation = () => {
        let max = 9;
        switch (digit) {
            case "1":
                max = 9;
                break;
            case "2":
                max = 99;
                break;
            case "3":
                max = 999;
                break;
            case "4":
                max = 9999;
                break;
            default:
                max = 9;
                break;
        }
        let num1 = getRandomNumber(max);
        let num2 = getRandomNumber(max);
        if (problems === 'substraction' && negative === 'no' && num1 < num2) {
            let temp = num1;
            num1 = num2;
            num2 = temp;
        }

        let answer = 0;
        if (problems === 'addition') {
            answer = num1 + num2;
        }
        if (problems === 'substraction') {
            answer = num1 - num2;
        }
        if(problems === 'multiplication' || problems ==='division') {
            answer = num1 * num2;
        }
        return [num1, num2, answer];
    }
    useEffect(() => {
        let problemsArray = [];
        for (let i = 0; i < questions; i++) {
            problemsArray.push(calculation());
        }
        setProblemsArray(problemsArray);
    }, [questions]);

    const handleSubmit = () => {
        setButtonClicked(true)
    }



    return (
        <>
            <div className='questions-container'>
                {problemsArray.map((problem, index) => {
                    return <QuestionCard redBorder={buttonClicked} key={index} id={index} type={problems} problem={problem} updateAnswers={updateAnswers}/>
                })}
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <SubmitButton clickAction={handleSubmit}/>
            </div>
        </>
    )
}

Questions.propTypes = {

}

export default Questions
