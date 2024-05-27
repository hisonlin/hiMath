import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './Questions.css'
import { useParams } from 'react-router-dom'
import QuestionCard from '../../Component/QuestionCard/QuestionCard'
import { useState } from 'react'
import SubmitButton from '../../Component/SubmitButton/SubmitButton'

const Questions = props => {

    const params = useParams()
    const [problems, setProblems] = useState(params.problems);
    const [digit, setDigit] = useState(params.digit);
    const [negative, setNegative] = useState(params.negative);
    const [questions, setQuestions] = useState(parseInt(params.questions, 10));
    const [problemsArray, setProblemsArray] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const[incorrectAnswers, setIncorrectAnswers] = useState([]);
    const [buttonClicked, setButtonClicked] = useState(false);

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

    const updateAnswers = (id, values) => {
        setUserAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            newAnswers[id] = values;
            return newAnswers;
        });
    };

    //Convert array to string then integer
    const convertArrayToInt = (array) => {
        if (!array) return undefined;
        const string = array.join('');
        return parseInt(string, 10);
    }

    const handleSubmit = () => {
        setButtonClicked(true);
        let newIncorrectAnswers = [];
        for (let i = 0; i < questions; i++) {
            const answer = convertArrayToInt(userAnswers[i]);
            const correctAnswer = problemsArray[i][2];
            if (answer !== correctAnswer) {
                newIncorrectAnswers.push(i);
            }
        }
        setIncorrectAnswers(newIncorrectAnswers);
        
    }

    return (
        <>
            <div className='questions-container'>
                {problemsArray.map((problem, index) => {
                    return <QuestionCard                    
                    key={index} 
                    id={index} 
                    type={problems} 
                    problem={problem} 
                    updateAnswers={updateAnswers}
                    buttonClicked={buttonClicked}
                    redBorder={incorrectAnswers.includes(index)} />
                    
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
