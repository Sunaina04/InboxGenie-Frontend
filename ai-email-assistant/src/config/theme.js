import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    main: {
      purple: "#554FEB",
      lightPurple: "#F5F5FD",
      active: "#8786ED",
      blueGrey: "#788CA5",
      darkPurple: "#1D1974",
    },
    button: {
      lightGreen: "#78C4B2",
      lightGrey: "#F6F6F6",
      mediumGrey: "#CECDCD",
      grey: "#939393",
    },
    primary: {
      main: "#41A0D2",
      mainBackground: "#F9F9F9",
      dark: "#2E2E30",
      sidebar: "#FAFAFA",
      darkText: "#1B212D",
      disabledBorder: "#F3F3F3",
    },
    secondary: {
      main: "#FDA163",
      error: "#E05D59",
      grey: "#929EAE",
      mediumGrey: "#757575",
      white: "#FFFFFF",
      darkGrey: "#78778B",
      black: "#000000",
      light: "#F5F5F5",
      green: "#52C3AA",
      lightGreen: "#9ACE71",
      orange: "#E89266",
      lightRed: "#EA5C5C",
      componentBorder: "#E6E6E6",
    },
    notifications: {
      successBackground: "#F0FFF1",
      successBorder: "#59E066",
      shadow: "0px 2px 15px rgba(33, 33, 52, 0.1)",
      warningBackground: "#FFF0F0",
      warningBorder: "#E05D59",
    },
    transaction: {
      debit: "#FF232E",
      credit: "#008E07",
    },
  },
  typography: {
    fontFamily: ["Open Sans", "Lato", "Dosis", "Roboto", "sans-serif"].join(
      ","
    ),
    button: {
      fontSize: "1.4rem",
      fontWeight: "500",
    },
    h1: {
      fontSize: "4.8rem",
      color: "#2E2E30",
      lineHeight: "normal",
    },
    h3: {
      fontSize: "2.4rem",
      color: "#2E2E30",
      lineHeight: "normal",
    },
    h4: {
      fontSize: "2rem",
      color: "#2E2E30",
      lineHeight: "normal",
    },
    h5: {
      fontSize: "1.6rem",
      color: "#2E2E30",
      lineHeight: "normal",
    },
    h6: {
      fontSize: "1.4rem",
      color: "#2E2E30",
      lineHeight: "normal",
    },
    body1: {
      fontSize: "16px",
      lineHeight: "normal",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: 14,
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          "&.MuiToggleButton-root.Mui-selected": {
            backgroundColor: "#41A0D2",
            color: "#fff",
          },
          "&.MuiToggleButton-root.Mui-disabled": {
            boxSizing: "border-box",
            padding: ".2rem 2.4rem",
            borderTopRightRadius: ".4rem !important",
            borderTopLeftRadius: ".4rem !important",
            borderBottomRightRadius: ".4rem !important",
            borderBottomLeftRadius: ".4rem !important",
            lineHeight: "2rem",
            border: "none",
            textTransform: "none",
            width: "max-content",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
          fontSize: "1.4rem",
          fontWeight: 500,
          borderRadius: 8,
          textTransform: "none",
          "&:hover": {
            background: "#41A0D2",
          },
          ":disabled": {
            background: "#D2D4DA",
            color: "#FFFFFF",
          },
        },
        startIcon: {
          margin: "0",
        },
        outlined: {
          color: "#41A0D2",
          "&:hover": {
            background: "#ffff",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          background: "none",
          color: "#788CA5",
          borderRadius: 8,
          "& svg": {
            width: "18px",
            height: "20px",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& input": {
            fontSize: 14,
          },
          "& .MuiInputLabel-root": {
            color: "#2E2E30",
            fontSize: "1rem",
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: "0.5rem",
            height: "56px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#554FEB !important",
            borderWidth: "1px !important",
          },
          "& .Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#554FEB !important",
              borderWidth: "1px !important",
            },
          },
          "& .Mui-error": {
            color: "#E05D59 !important",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E05D59 !important",
              borderWidth: "1px !important",
            },
          },
          "& .MuiFormHelperText-root": {
            marginLeft: "5px",
            fontSize: "12px",
          },
        },
      },
    },
    MuiPickersToolbar: {
      styleOverrides: {
        root: {
          color: "#1565c0",
          borderRadius: "2px",
          borderWidth: "1px",
          borderColor: "#2196f3",
          border: "1px solid",
          backgroundColor: "#90caf9",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          height: "56px",
          borderRadius: "0.5rem",
          fontSize: "16px",
          fontWeight: "400",
          color: "#2E2E30",
          backgroundColor: "#fff",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#554FEB !important",
            borderWidth: "1px !important",
          },
          "&.Mui-focused": {
            color: "#788CA5E5",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#DFDFDF",
          "&.Mui-checked": {
            color: "#41A0D2",
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
            backgroundColor: "#52C3AA",
            opacity: 1,
          },
          "& .MuiSwitch-track": {
            backgroundColor: "#788CA5",
            opacity: 1,
          },
        },
      },
    },
  },
});

export default theme;
