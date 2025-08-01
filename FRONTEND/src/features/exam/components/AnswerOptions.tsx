import {Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup, TextField} from "@mui/material";
import * as React from "react";



interface AnswerOptionsProps {
    answerType: 'single' | 'multiple' | 'fill';
    questionId: number;
    value: string | string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.ChangeEvent<{ name?: string; value: unknown }>) => void;
}

const AnswerOptions = ({answerType, questionId, value, onChange}: AnswerOptionsProps) => {
    switch (answerType) {
        case 'single':
            return (
                <FormControl sx={{ ml: 1 }}>
                    <RadioGroup
                        row
                        name={`question-${questionId}-options`}
                        value={value}
                        onChange={onChange}
                    >
                        <FormControlLabel
                            value="A"
                            control={<Radio />}
                            label="A"
                        />

                        <FormControlLabel
                            value="B"
                            control={<Radio />}
                            label="B"
                        />

                        <FormControlLabel
                            value="C"
                            control={<Radio />}
                            label="C"

                        />
                        <FormControlLabel
                            value="D"
                            control={<Radio />}
                            label="D"
                        />
                    </RadioGroup>
                </FormControl>
            );
        case 'multiple':
            return (
                <FormGroup row sx={{ ml: 1 }}>
                    <FormControlLabel
                        control={<Checkbox checked={value.includes('A')} onChange={onChange} name="A"/>}
                        label="A"

                    />
                    <FormControlLabel
                        control={<Checkbox checked={value.includes('B')} onChange={onChange} name="B"/>}
                        label="B"

                    />
                    <FormControlLabel
                        control={<Checkbox checked={value.includes('C')} onChange={onChange} name="C"/>}
                        label="C"

                    />
                    <FormControlLabel
                        control={<Checkbox checked={value.includes('D')} onChange={onChange} name="D"/>}
                        label="D"
                    />
                </FormGroup>
            );
        case 'fill':
            return (
                <TextField
                    type="text"
                    placeholder="Học sinh tự điền"
                    variant="outlined"
                    size="small"
                    sx={{marginLeft: 'auto', flexGrow: 1}}
                    value={value}
                    onChange={onChange}
                />
            );
        default:
            return null;
    }
}

export default AnswerOptions