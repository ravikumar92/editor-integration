import React, { useState, useEffect } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import { editorConfiguration } from '../editor';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import Drawer from '@material-ui/core/Drawer';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
    
  }));





export default function CreateLetter() {
    const classes = useStyles();
    let [text, setText] = useState('');
    const [open, setOpen] = useState(false);
    const [fileNmae, setFileName] = useState('');
    const [list, setList] = useState(Object.keys(localStorage));


    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const centerStyle = {
        width: '1000px',
        height: '1000px',
        margin: '0 auto',
        paddingTop: '25px'
    }
    
    function editLetter(text) {
        setText(localStorage.getItem(text));
    }

    function storeData() {
        localStorage.setItem(fileNmae, text);
        setOpen(false);
        setText('');
        setList(Object.keys(localStorage));
    }
    return (
        <div>
        <div className="App" style={centerStyle}>
            <h2>Editor</h2>
            <CKEditor
                editor={ClassicEditor}
                config={editorConfiguration}
                data={text}
                onInit={editor => {
                    // You can store the "editor" and use when it is needed.
                    // console.log('Editor is ready to use!', editor);
                    // setText(localStorage.getItem('file1'));

                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setText(data);
                }}
                onBlur={(event, editor) => {
                    // console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    // console.log('Focus.', editor);
                }}
            >
            </CKEditor>
            <Button onClick={handleClickOpen} variant="contained" color="primary">Submit</Button>

            

             <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To publish the letter, please enter letter name here.
          </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Save as"
                        type="text"
                        fullWidth
                        value={fileNmae}
                        onChange={(event)=>{
                            setFileName(event.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={storeData} color="primary">
                        Publish
          </Button>
                </DialogActions>
            </Dialog>
        </div>
        <div>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={true}
                classes={{
                    paper: classes.drawerPaper,
                    root:classes.root
                }}
            >
            <List>
          {list.map((text, index) => (
            <ListItem button key={text} onClick={()=>editLetter(text)}>
                <Divider/>            
            <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        </Drawer>
        </div>
        </div>
    );
}