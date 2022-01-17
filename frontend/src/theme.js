import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

/*  Colors  */
const mono = {
  white: '#FFFFFF',
  lightGray: '#E5E5E5',
  gray: '#A0A0A0',
  input: '#535353',
  semiDarkGray: '#383838',
  darkGray: '#272727',
  lightBlack: '#1D1D1D',
  semiLightBlack: '#121212', // background color
  black: '#000000',
};

const blue = {
  60: '#81d4fa',
  80: '#6DC5FF',
  100: '#0277bd',
  dark: '#004c8c',
};

const red = {
  60: '#ef9a9a',
  80: '#FF8176',
  100: '#d32f2f',
  dark: '#D51D0D',
};

const green = {
  60: '#a5d6a7',
  80: '#75a478',
  100: '#388e3c',
  dark: '#00600f',
};

const palette = {
  /*
  Default components applies colors in "grey" sub-object if "color" prop was not specified.
  See component source code to see which one it applies
  (eg. grey[300] for contained Button backgroundColor).
  */
  grey: {
    100: mono.lightGray,
    300: mono.gray,
    A100: mono.semiDarkGray,
    A400: mono.darkGray,
    A500: mono.emptyGray,
    A700: mono.semiDarkGray,
  },

  black: {
    main: mono.semiLightBlack,
    dark: mono.black,
  },

  // primary: blue
  primary: {
    light: blue[60],
    hover: blue[80],
    main: blue[100],
    dark: blue.dark,
    contrastText: '#fff',
  },
  // secondary: green
  secondary: {
    light: green[60],
    main: green[100],
    dark: green.dark,
    contrastText: '#fff',
  },

  error: {
    light: red[60],
    main: red[100],
    dark: red.dark,
    contrastText: '#fff',
  },

  action: {
    disabledBackground: mono.gray,
    disabled: mono.white, // font color
    disabledOpacity: '100%',
  },

  background: {
    default: mono.semiLightBlack,
    paper: mono.darkGray,
    card: mono.darkGray,
  },
};

const typography = {
  /* Note: to change default html font size (basis of 'rem'), go to src/styles/index.css */

  // Big Title
  h3: {
    color: mono.white,
    fontSize: '2.67rem',
    fontWeight: 700,
    lineHeight: 65 / 48,
    // letterSpacing: '-0.01rem',
    fontFamily: 'Noto Sans',
  },

  // Title
  h4: {
    color: mono.white,
    fontSize: '1.33rem',
    fontWeight: 700,
    lineHeight: 33 / 24,
    // letterSpacing: '-0.01rem',
    fontFamily: 'Noto Sans',
  },

  // Bold-Body
  h6: {
    color: mono.white,
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 25 / 18,
    // letterSpacing: '-0.01rem',
    fontFamily: 'Noto Sans',
  },

  // Body
  body1: {
    color: mono.white,
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 25 / 18,
    // letterSpacing: '-0.01rem',
    fontFamily: 'Noto Sans',
  },

  button: {
    textTransform: 'none',
    fontSize: '1rem',
    lineHeight: 24 / 20,
    fontFamily: 'Noto Sans',
  },
};

const shape = {
  borderRadius: 10,
};

const overrides = {
  MuiCssBaseline: {
    '@global': {
      a: {
        textDecoration: 'none',
        cursor: 'pointer',
      },
    },
  },
  // Table
  MuiTableRow: {
    hover: {
      '&:hover': {
        backgroundColor: `${mono.veryLightGray} !important`,
      },
    },
  },
  MuiTableCell: {
    root: {
      background: mono.lightBlack,
      borderBottom: `1px solid ${mono.gray}`,
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    head: {
      color: mono.white,
      background: mono.semiLightBlack,
      fontSize: '1rem',
      fontWeight: 600,
      fontFamily: 'Noto Sans',
    },
    body: {
      color: mono.lightGray,
      fontSize: '1rem',
      fontWeight: 500,
      fontFamily: 'Noto Sans',
    },
  },
  // Divider
  MuiDivider: {
    root: {
      border: `0.1px solid ${mono.gray}`,
    },
  },
  // Paper
  MuiPaper: {
    outlined: {
      border: `1px solid ${mono.gray}`,
    },
    rounded: {
      borderRadius: '0px',
    },
  },
  // "Button"
  MuiButton: {
    root: {
      borderRadius: '20px',
      height: '40px',
      transition: 'background 0.4s',
      margin: '10px 5px 10px 5px',
      padding: '8.5px 25px 10px 25px',
      color: mono.white,
      '&:hover': {
        // border: '1px solid',
        borderColor: mono.semiDarkGray,
      },
      '&:active': {
        backgroundColor: mono.semiDarkGray,
      },
      '& path': {
        fill: mono.black,
        height: '20px',
        width: '20px',
      },
      '&$disabled': {
        color: mono.gray,
        '& path': {
          fill: mono.gray,
        },
      },
    },
    contained: {
      '&:hover': {
        backgroundColor: palette.grey[300],
      },
      '&:active': {
        backgroundColor: palette.grey.A700,
      },
      '& path': {
        fill: mono.black,
      },
      '&$disabled': {
        '& path': {
          fill: mono.lightGray,
        },
      },
    },
    containedPrimary: {
      '&:hover': {
        // backgroundColor: palette.primary.hover,
      },
      '&:active': {
        backgroundColor: palette.primary.dark,
      },
      '& path': {
        fill: mono.white,
      },
    },
    containedSecondary: {
      '&:hover': {
        backgroundColor: palette.secondary.light,
      },
      '&:active': {
        backgroundColor: palette.secondary.dark,
      },
      '& path': {
        fill: mono.white,
      },
    },
    text: {
      margin: '10px 5px 10px 5px',
      padding: '8.5px 25px 10px 25px',
      '&hover': {
        borderColor: mono.semiDarkGray,
      },
      '&$disabled': {
        color: mono.gray,
        '& path': {
          fill: mono.gray,
        },
      },
    },
    textPrimary: {
      '&:hover': {
        backgroundColor: blue[60],
      },
      '&:active': {
        backgroundColor: blue[80],
      },
      '& path': {
        fill: blue[100],
      },
    },
    textSecondary: {
      '&:hover': {
        backgroundColor: red[60],
      },
      '&:active': {
        backgroundColor: red[80],
      },
      '& path': {
        fill: red[100],
      },
    },
    outlined: {
      margin: '10px 5px 10px 5px',
      padding: '7.5px 24px 9px 24px',
      color: mono.white,
      borderColor: mono.gray,
      '&:hover': {
        backgroundColor: mono.darkGray,
      },
      '&:active': {
        backgroundColor: mono.semiDarkGray,
      },
      '& path': {
        fill: mono.black,
        height: '20px',
        width: '20px',
      },
      '&$disabled': {
        color: mono.gray,
        '& path': {
          fill: mono.gray,
        },
      },
    },
    outlinedPrimary: {
      '&:hover': {
        color: mono.white,
        // backgroundColor: blue[80],
        '& path': {
          fill: mono.white,
        },
      },
      '&:active': {
        color: mono.white,
        backgroundColor: blue.dark,
        '& path': {
          fill: mono.white,
        },
      },
      '& path': {
        fill: blue[100],
      },
    },
    outlinedSecondary: {
      '&:hover': {
        color: mono.white,
        backgroundColor: red[60],
        '& path': {
          fill: mono.white,
        },
      },
      '&:active': {
        color: mono.white,
        backgroundColor: red.dark,
        '& path': {
          fill: mono.white,
        },
      },
      '& path': {
        fill: red[100],
      },
    },
  },
  MuiIconButton: {
    root: {
      color: mono.white,
      fontFamily: 'Noto Sans',
    },
  },
  // date-time-picker
  MuiPickersDay: {
    day: {
      color: mono.white,
    },
  },
  MuiPickersCalendarHeader: {
    dayLabel: {
      color: mono.gray,
    },
    switchHeader: {
      marginTop: 12,
      marginBottom: 12,
    },
  },
  MuiPickersModal: {
    dialogRootWider: {
      width: 325,
    },
  },

  // "Input"
  MuiInputBase: {
    root: {
      color: mono.lightGray,
      height: '45px',
      // backgroundColor: mono.semiLightBlack,
      // border: `2px solid ${mono.semiDarkGray}`,
    },
  },
  MuiTextField: {
    root: {
      width: '350px',
      height: '45px',
    },
  },
  MuiOutlinedInput: {
    root: {
      borderRadius: '15px',
      '& $notchedOutline': {
        borderColor: mono.input,
        border: '2px solid',
      },
      '&:hover:not($disabled):not($focused):not($error) $notchedOutline': { borderColor: mono.gray }, // removes hover effect
      '& input': {
        padding: '10px 0px 10px 15px',
        fontWeight: 500,
        fontSize: '1rem',
      },
    },
  },
  MuiFormHelperText: {
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: '5px',
      '& p': {
        marginLeft: '8px',
      },
    },
  },
  MuiInputLabel: {
    root: {
      color: mono.input,
    },
    disableAnimation: true,
    outlined: {
      transform: 'translate(15px, 13px) scale(1)',
      '&$shrink': { transform: 'translate(14px, -20px) scale(0.89)', fontWeight: 400 },
    },
  },

  // Box (dialog)
  MuiDialog: {
    paper: {
      padding: '10px 15px 4px 15px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)',
    },
    paperWidthMd: { width: '600px' },
    paperWidthSm: { width: '460px' },
  },
  MuiDialogTitle: {
    // root: { padding: '20px 30px 0 30px' },
  },
  MuiDialogContent: {
    // root: { padding: '20px 30px 12px 30px' },
  },
  MuiDialogActions: {
    root: { padding: '0 19px 6px 0' },
  },
};

const props = {
  // This includes List items, icon buttons, etc.
  MuiButtonBase: {
    disableRipple: true,
  },

  // Name of the component ⚛️
  MuiButton: {
    variant: 'contained',
    disableElevation: true,
  },

  MuiIconButton: {
    size: 'small',
  },

  MuiSvgIcon: {
    // fontSize: 'small',
  },

  MuiFormControl: {
    variant: 'outlined',
  },

  MuiList: {
    disablePadding: true,
  },

  MuiMenu: {
    // make sure the popover is under the input (MUI default: over the input component)
    getContentAnchorEl: null,
    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
    transformOrigin: { vertical: 'top', horizontal: 'left' },
  },

  MuiTextField: {
    variant: 'outlined',
    style: { width: 350 },
  },

  MuiOutlinedInput: {
    notched: false,
  },

  MuiDialogTitle: {
    disableTypography: true,
  },
};

const headerStyle = {
  background: mono.black,
  color: mono.white,
  activeColor: palette.primary.main,
  hasIndicator: false,
};

const theme = createTheme({
  palette,
  typography,
  shape,
  overrides,
  props,
  headerStyle,
});

export default responsiveFontSizes(theme);
