export const baseMode = {
  breakpoints: {
    values: {
      xxxs: 0,
      xxs: 368,
      xs: 450,
      sm: 600,
      md: 780,
      lg: 900,
      xl: 1200
    },
  },
  shape: {
    borderRadius: 20,
  }
}

export const darkMode = {
  palette: {
     primary: {
      //  main: '#112f49',
       main: '#1e2932',
       dark: '#0a233e',
       light: '#f0f3f5',
       contrastText: '#e1efff',
     },
     secondary: {
      //  main: '#5278a1',
       main: '#2c353e',
       dark: '#890a42',
       light: '#fff',
       contrastText: '#fde4e9',
     },
     custom: {
      main: '#7bf3b0',
      dark: '#0a233e'
    },
     navbar: {
      //  main: '#112f49'
       main: '#1e2932'
     },
     table: {
       bg: '#000004cf'
     },
     sidebar: {
       main: '#e1efff',
     },
     gradient: {
      dark: '#0f1c2a',
      light: '#346eab',
      darkrgba: 'rgba(2,0,36,1)'
     },
     status: {
      await: '#ef5353',
      delivered: '#00d7a7',
      delayed: '#e5a841',
      processing: '#b965d1',
      cancelled: '#ff0753',
      pending: '#f3e03d',
      shipped: '#0a64f3'
     },
     logo: {
       main: '#112f49',
       light: '#e1efff'
     },
     button: {
       main: '#0a783b'
     }
  }
  // appbarpalette: {
  //   "&.MuiAppBar-colorPrimary": {
  //     backgroundColor: purple[600]
  //   },
  //   "&.MuiAppBar-colorSecondary": {
  //     backgroundColor: green[600]
  //   }
  // }
};

export const lightMode = {
  palette: {
     primary: {
       main: '#e7f6f3',
       dark: '#428470',
       light: '#042f5e',
       contrastText: '#e1efff',
     },
     secondary: {
       main: '#f9fdfc',
       dark: '#890a42',
       light: '#fff',
       contrastText: '#366754',
     },
     custom: {
        main: '#366754'
     },
     navbar: {
       main: '#112f49'
     },
     table: {
        bg: '#64e5b929'
     },
     sidebar: {
       main: '#e1efff'
     },
     gradient: {
      dark: '#e7f6f3',
      light: '#fff',
      darkrgba: 'rgba(2,0,36,1)'
     },
     status: {
      await: '#ffcdd3',
      delivered: '#a7d5ca',
      delayed: '#f4e0b8',
      processing: '#e1bdeb',
      cancelled: '#ffc6d5',
      pending: '#fbf6c3',
      shipped: '#bfc8fa'
     },
     logo: {
      main: '#112f49',
      light: '#e1efff'
    },
    button: {
      main: '#0a783b',
      hover: '#4cbf7f'
    }
  }
  // appbarpalette: {
  //   "&.MuiAppBar-colorPrimary": {
  //     backgroundColor: purple[600]
  //   },
  //   "&.MuiAppBar-colorSecondary": {
  //     backgroundColor: green[600]
  //   }
  // }
};