import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import  {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    width: '40vw'
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
  textfield: {
    margin: 10,
    width: '100%'
  }
}));

export default function Register(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    type: '',
    login: '',
    password: '',
    password2: '',
    errs: {
      login: '',
      type: '',
      password: '',
      password2: ''
    }
  });
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const { errs, registerUser, history, getErrs } = props;
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    setState({
      ...state,
      errs: {
        ...errs
      }
    });
  }, [errs]);

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value
    });
  };
  const handleClick = () => {
    registerUser({ ...state }, () => {
      history.push('/');
      getErrs({});
    });
  };
  const handleOnChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <Paper
        className={classes.root}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <form>
        <Typography variant="h3">Đăng kí</Typography>
        <TextField
          className={classes.textfield}
          name="login"
          error={state.errs.login ? true : false}
          helperText={state.errs.login ? state.errs.login : ''}
          value={state.login}
          label="Tên đăng nhập"
          variant="outlined"
          onChange={handleOnChange}
        />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel}>Phân loại</InputLabel>
          <Select
            native
            value={state.type}
            error={state.errs.type ? true : false}
            helperText={state.errs.type ? state.errs.type : ''}
            onChange={handleChange('type')}
            input={
              <OutlinedInput
                name="age"
                labelWidth={labelWidth}
                id="outlined-age-native-simple"
              />
            }
          >
            <option value="" />
            <option value={1}>Cơ quan, đơn vị</option>
            <option value={2}>Đơn vị Vận tải</option>
          </Select>
        </FormControl>
        <TextField
          className={classes.textfield}
          name="password"
          error={state.errs.password ? true : false}
          helperText={state.errs.password ? state.errs.password : ''}
          value={state.password}
          label="Mật khẩu"
          variant="outlined"
          onChange={handleOnChange}
        />
        <TextField
          className={classes.textfield}
          name="password2"
          error={state.errs.password2 ? true : false}
          helperText={state.errs.password2 ? state.errs.password2 : ''}
          value={state.password2}
          label="Nhập lại mật khẩu"
          variant="outlined"
          onChange={handleOnChange}
        />

<FormControl error={state.errs.password ? true : false} className={clsx(classes.margin, classes.textField)} variant="outlined"  style={{width: '100%' ,marginBottom: 20}}>
          <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={state.password}
            name="password"
            onChange={handleOnChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
          {state.errs.password ? <FormHelperText id="standard-weight-helper-text">{state.errs.password}</FormHelperText> : ''}
          
        </FormControl>




        <Button variant="outlined" onClick={handleClick}>
          Đăng kí
        </Button>
        <Typography style={{ marginTop: 8 }}>
          (Quay lại{ ' '}
          <Link
            to="/"
            style={{ color: 'blue' }}
            onClick={() => {
              getErrs({});
            }}
          >
            Đăng nhập
          </Link>{' '}
          ){' '}
        </Typography>

        
      </Paper>
        </form>
    </div>
  );
}
