import theme from "../../config/theme";

export const getStyles = () => {
  return {
    container: {
      display: "flex",
      alignItems: "flex-start",
      background: theme.palette.primary.mainBackground,
      "& > div:nth-of-type(2)": {
        marginLeft: "89px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      },

      "& .tooltipIcon": {
        display: "flex",
      },
    },
    menu: {
      position: "fixed",
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 10,
      height: "100%",
      maxWidth: "80px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: theme.palette.main.purple,
      minHeight: "100vh",
      transition: "max-width 0.5s, background 0.3s",
      overflowX: "hidden",
      paddingBottom: "48px",
      whiteSpace: "nowrap",
      "& h6": {
        opacity: 0,
        transition: "0.5s",
        fontWeight: 400,
        fontSize: "14px",
        color: theme.palette.secondary.white,
      },
      "&:hover": {
        maxWidth: "220px",
        background: theme.palette.main.mediumGrey,        
        h6: {
          opacity: 1,
        },
      },
    },
    header: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 15px",
      borderBottom: `1px solid ${theme.palette.secondary.componentBorder}`,
      background: theme.palette.secondary.white,
      "& img": {
        maxWidth: "50px",
        height: "50px",
        width: "100%",
      },
    },
    content: {
      padding: "48px 31px",
      display: "flex",
      flexDirection: "column",
      gridGap: "15px",
      "& .contentHeader": {
        "& > div:nth-of-type(1)": {
          display: "flex",
          alignItems: "center",
          gridGap: "10px",
          "& > svg": {
            fontSize: "24px",
            color: theme.palette.main.purple,
          },
          "& > h6": {
            fontWeight: 600,
            fontSize: "25px",
            fontFamily: "Lato",
          },
        },
        "& > div:nth-of-type(2)": {
          display: "flex",
          alignItems: "center",
          gridGap: "15px",
        },
        display: "flex",
        gridGap: "2rem",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      },
    },
    intersectionSelect: {
      width: "215px",
      height: "55px",
      background: "white",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: `${theme.palette.button.mediumGrey} !important`,
      },
      "& .MuiOutlinedInput-input": {
        color: `${theme.palette.primary.dark} !important`,
        fontSize: "15px",
        fontWeight: 600,
      },
    },
    headerTitle: {
      display: "flex",
      alignItems: "center",
      columnGap: "10px",
      "& .tooltipIcon": {
        width: "25px",
        height: "25px",
        marginTop: "6px",
        "& svg": {
          fontSize: "25px",
        },
      },
      "& p": {
        fontSize: "30px",
        fontWeight: 600,
      },
    },
    backIcon: {
      width: "0.6rem",
      height: "1.2rem",
      cursor: "pointer",
      marginRight: "1.8rem",
    },
    userInfo: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      background: theme.palette.primary.sidebar,
      borderRadius: "10rem",
      padding: "0.6rem 8.9rem 0.6rem 1.2rem",
      width: "20.3rem",
      height: "4.8rem",
      "& svg": {
        width: "3.6rem",
        height: "3.6rem",
      },
    },
    dropdownIconClosed: {
      fill: theme.palette.primary.darkText,
      cursor: "pointer",
    },
    dropdownIconOpen: {
      fill: theme.palette.primary.darkText,
      transform: "rotate(180deg)",
      cursor: "pointer",
    },
    userMenuWrapper: {
      "& .MuiPaper-root  ": {
        border: `0.1rem solid ${theme.palette.primary.disabledBorder}`,
        borderTop: "none",
        width: "20.04rem",
        borderTopLeftRadius: "0rem !important",
        borderTopRightRadius: "0rem !important",
        borderRadius: "1rem",
        "& ul": {
          padding: "1.2rem 1.8rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
          "& div": {
            display: "flex",
            gap: "1.8rem",
            "& p": {
              display: "block",
            },
            "& p:first-of-type": {
              width: "40%",
            },
            "& p:last-child": {
              color: theme.palette.primary.dark,
            },
          },
        },
      },
    },

    sideBarLogo: {
      width: "11.6rem",
      height: "4rem",
      marginBottom: "4.5rem",
    },
    sideBarHeader: {
      width: "100%",
      background: "linear-gradient(94.42deg, #554FEB 4.61%, #52C3AA 94.02%)",
      padding: "22px",
      display: "flex",
      alignItems: "center",
      gridGap: "1.2rem",
      "& h6": {
        fontWeight: 700,
        color: "#fff",
      },
      "& img": {
        width: "43.3px",
        height: "38.8px",
        objectFit: "cover",
      },
    },
    sideBarContent: {
      flex: 1,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "0 1.1rem 0 1.1rem",
    },
    menuFooter: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      padding: "0 1.5rem 0 1.5rem",
    },
    logout: {
      display: "flex",
      width: "100%",
      gap: "1.2rem",
      alignItems: "normal",
      padding: "10px 8px",
      cursor: "pointer",
      "& svg": {
        width: "20px",
        height: "20px",
        color: "#fff",
      },
    },
  };
};

export const getMenuItemStyles = (active, disabled) => {
  return {
    wrapper: {
      display: "flex",
      width: "100%",
      gap: "1.2rem",
      alignItems: "center",
      background: active ? "rgba(0, 0, 0, 0.04)" : "transparent",
      padding: "12px 10px",
      borderRadius: "8px",
      cursor: "pointer",
      margin: "8px auto",
      transition: "all 0.3s ease",
      boxShadow: active ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        padding: "12px 20px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        "& svg": {
          color: theme.palette.main.purple,
        },
        "& h6": {
          color: theme.palette.main.purple,
        }
      },
      "& svg": {
        width: "22px",
        height: "22px",
        color: active ? theme.palette.main.purple : "#666",
        transition: "color 0.3s ease",
      },
      "& h6": {
        fontSize: "14px",
        fontWeight: active ? 600 : 400,
        color: active ? theme.palette.main.purple : "#666",
        transition: "color 0.3s ease",
      },
    },
  };
};
