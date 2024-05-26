import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from '@mui/material'

const QuestionCard = ({ type, problem }) => {
    const problems = type;
    const num1 = problem[0];
    const num2 = String(problem[1]);
    const answer = problem[2];

    return (
        <Paper elevation={1} sx={{ width: '200px', height: '200px', fontSize: '40px', padding: '20px' }}>
            <div style={{ display: "flex", justifyContent: "end", letterSpacing: "5px" }}>
                {num1}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #333"}}>
                <div>
                    {problems === 'addition' ? '+' : '-'}
                </div>
                <div>
                    {num2.split('').map((digit, idx) => (
                        <React.Fragment key={idx}>
                            <input type="text" style={{ width: '5px', height: '10px', fontSize: '10px', textAlign: "end" }} />
                            {digit}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "end"}}>
            <input type="text" style={{ width: '70%', fontSize: '40px', textAlign: "end", marginTop: "10px" }} />
            </div>


        </Paper>
    )
}


QuestionCard.propTypes = {

}

export default QuestionCard
