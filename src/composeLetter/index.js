import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { editorConfiguration } from '../editor';

import info from '../data/info';
import Button from '@material-ui/core/Button';

import jsPDF from 'jspdf';


const doc = new jsPDF();

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 500,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


const centerStyle = {
    width: '1000px',
    height: '1000px',
    margin: '0 auto',
    paddingTop: '17px'
}

const fillvalue = name =>{
    let data = localStorage.getItem(name);
    for(let [key, val] of Object.entries(info)){
       data =  data.replace(new RegExp('{'+key+'}','gi'), val);
    }
    return data;
}

export default function ComposeLetter() {
    const classes = useStyles();
    const [letter, setLetter] = React.useState([]);
    const [name, setName] = React.useState('');
    const [text, setText] = React.useState('');

    React.useEffect(() => {
        setLetter(Object.keys(localStorage));
    }, [])


    const pdfDownload = (event) => {
        console.log(event);
        doc.fromHTML(text,20,20,{
            'width': 170
        });
        doc.save(name +'.pdf');
        
    }

    const handleChange = event => {
        setName(event.target.value);
        const data =  fillvalue(event.target.value);
        setText(data);
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Select Letters</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={name}
                    onChange={handleChange}
                >
                    {
                        letter.map((val, index) => {
                           return <MenuItem key={index} value={val}>{val}</MenuItem>

                        })
                    }
                    {
                        letter.length == 0 && 
                         <MenuItem>None</MenuItem>
                    }
                </Select>
            </FormControl>
            <div style={centerStyle}>
            <CKEditor
                editor={ClassicEditor}
                config={editorConfiguration}
                data={text}
                onInit={editor => {
                   const data = editor.getData();
                   setText(data);
                }}
                onChange={(event, editor) => {
    
                }}
                onBlur={(event, editor) => {
                    // console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    // console.log('Focus.', editor);
                }}
            >
            </CKEditor>
            <Button variant="contained" onClick={pdfDownload} color="primary">
                Download PDF
            </Button>
            </div>
        </div>
    );
}
