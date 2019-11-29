import React , {useState} from 'react';
import CreateLetter from '../createLetters/index';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import ComposeLetter from '../composeLetter';
  
  const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      marginTop:'71px'
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    fabGreen: {
      color: theme.palette.common.white,
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[600],
      },
    },
  }));



export default function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  function a11yProps(index) {
    return {
      id: `action-tab-${index}`,
      'aria-controls': `action-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
        return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
            <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Create Template"  {...a11yProps(0)} />
          <Tab label="Compose Letters" {...a11yProps(1)} />
        </Tabs>
        </AppBar>
        { value == 0 &&
            <CreateLetter></CreateLetter>

        }
        {
            value == 1 &&
            <ComposeLetter></ComposeLetter>
        }
        </div>
    );
}