import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = props => {
    const initialQuestions = {
        problems: 'addition',
        digits: 1,
        negative: "no",
        noOfQuestions: 10
    };
    const [questions, setQuestions] = useState(initialQuestions);

    const navigate = useNavigate();

    const handleRadioChange = (event) => {
        setQuestions({
            ...questions,
            [event.target.name]: event.target.value
        });
    };

    const handleSliderChange = (event, newValue) => {
        setQuestions({
            ...questions,
            noOfQuestions: newValue
        });
    };

    const handleSubmit = () => {
        const problems = questions.problems;
        const digit = questions.digits;
        const negative = questions.negative;
        const numQuestions = questions.noOfQuestions;
        navigate(`/questions/${problems}/${digit}/${negative}/${numQuestions}`);
    };

    return (
        <div className='form-container'>
            <FormGroup>
                <div className='title'>
                <div>Math Problems</div>
                    <RadioGroup
                        aria-label='Problems'
                        defaultValue="addition"
                        sx={{ display: 'flex', flexDirection: 'row' }}
                        name="problems"
                        onChange={handleRadioChange}
                    >
                        <FormControlLabel value="addition" control={<Radio />} label="Addition" />
                        <FormControlLabel value="substraction" control={<Radio />} label="Substraction" />
                        {/* <FormControlLabel value="mixed" control={<Radio />} label="Mixed" /> */}
                    </RadioGroup>
                </div>
                <div className='title'>
                    <div>Number of Digits</div>
                    <RadioGroup
                        aria-label='Digits'
                        defaultValue="1"
                        sx={{ display: 'flex', flexDirection: 'row' }}
                        name="digits"
                        onChange={handleRadioChange}
                    >
                        <FormControlLabel value="1" control={<Radio />} label="1" />
                        <FormControlLabel value="2" control={<Radio />} label="2" />
                        <FormControlLabel value="3" control={<Radio />} label="3" />
                        <FormControlLabel value="4" control={<Radio />} label="4" />
                    </RadioGroup>
                </div>
                <div className='title'>
                    <div>Negative Result</div>
                    <RadioGroup
                        aria-label='Negative'
                        
                        defaultValue="no"
                        sx={{ display: 'flex', flexDirection: 'row'}}
                        name="negative"
                        onChange={handleRadioChange}
                    >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                </div>
                <div className='title'>
                    <div>Number of Questions</div>
                    <Slider
                        aria-label="Number of Questions"
                        defaultValue={10}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={10}
                        max={50}
                        onChange={handleSliderChange}
                    />
                </div>
                <div className='title' style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button sx={{ width: "auto", fontFamily:'Kanit'}} variant="contained" onClick={handleSubmit}>Generate</Button>
                </div>

            </FormGroup>
        </div>
    );
}

Home.propTypes = {};

export default Home;
