import { container, title } from "test_ui_kit/jss/material-kit-react.js";
import { red } from '@material-ui/core/colors';

const landingPageStyle = theme =>({
  container: {
    zIndex: "12",
    marginTop: '20px',
    // color: "#FFFFFF",
    ...container
  },
  searchContainer: {
    zIndex: "12",
    marginTop: '-160px',
    // color: "#FFFFFF",
    ...container
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "2px",
    minHeight: "30px",
    color: "#FFFFFF",
    textDecoration: "none"
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "7px auto 0"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'space-evenly', 
    padding: '20px', 
    borderRadius: '3px', 
    backgroundColor: '#e7e7e7',
    opacity: '0.7'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      // backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  mainCartRaised: {
    margin: "80px 30px 0px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  rootCart: {
    flexGrow: 1,
    margin: '5px',
    borderRadius: '3px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  }
});

export default landingPageStyle;
