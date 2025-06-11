import React, { useState, useCallback, useEffect, useRef, memo, forwardRef, useMemo } from 'react';

import PropTypes from 'prop-types';

const DebouncedInput = memo(
  forwardRef(
    (
      {
        value,
        onChange = () => {},
        onBlur,
        onFocus,
        debounceTime = 500,
        inputComponent: InputComponent = 'input',
        error,
        validateValue,
        transformValue,
        immediateCallback,
        ...others
      },
      ref
    ) => {
      const [inputValue, setInputValue] = useState(value || '');
      const timer = useRef(null);
      const previousValue = useRef(value);

      // Memoize the input props
      const inputProps = useMemo(
        () => ({
          ref,
          value: inputValue,
          onBlur,
          onFocus,
          error,
          ...others
        }),
        [ref, inputValue, onBlur, onFocus, error, others]
      );

      // Sync with external value
      useEffect(() => {
        if (value !== previousValue.current) {
          setInputValue(value || '');
          previousValue.current = value;
        }
      }, [value]);

      // Enhanced handleChange to support both approaches
      const handleChange = useCallback(
        (e) => {
          const newValue = e?.target?.value ?? e;
          setInputValue(newValue);

          if (immediateCallback) {
            immediateCallback(newValue);
          }

          if (timer.current) {
            clearTimeout(timer.current);
          }

          timer.current = setTimeout(() => {
            let processedValue = newValue;

            if (transformValue) {
              processedValue = transformValue(processedValue);
            }

            const isValid = !validateValue || validateValue(processedValue);

            // Handle both event-style and direct value naturally
            onChange({
              target: { value: processedValue },
              preventDefault: () => {},
              stopPropagation: () => {},
              isValid
            });
          }, debounceTime);
        },
        [onChange, debounceTime, immediateCallback, transformValue, validateValue]
      );

      // Cleanup
      useEffect(() => {
        return () => {
          if (timer.current) {
            clearTimeout(timer.current);
          }
        };
      }, []);

      return <InputComponent {...inputProps} onChange={handleChange} />;
    }
  )
);

DebouncedInput.propTypes = {
  /** Input value */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Change handler */
  onChange: PropTypes.func,
  /** Blur handler */
  onBlur: PropTypes.func,
  /** Focus handler */
  onFocus: PropTypes.func,
  /** Debounce delay in milliseconds */
  debounceTime: PropTypes.number,
  /** Component to render as input */
  inputComponent: PropTypes.elementType,
  /** Callback to run immediately before debounce */
  immediateCallback: PropTypes.func,
  /** Minimum length before triggering onChange */
  minLength: PropTypes.number,
  /** Maximum length constraint */
  maxLength: PropTypes.number,
  /** Whether to trim value before onChange */
  trim: PropTypes.bool,
  /** Custom value transformer */
  transformValue: PropTypes.func,
  /** Custom validation function */
  validateValue: PropTypes.func,
  /** Error state */
  error: PropTypes.bool
};

DebouncedInput.displayName = 'DebouncedInput';

export default DebouncedInput;
/**
 * ------------:How to Use DebouncedInput:-------------
 *
 * A highly optimized debounced input component that works with various input components,
 * particularly designed for Material-UI components.
 *
 * Features:
 * - Debounced input handling
 * - Support for Material-UI components
 * - Value transformation and validation
 * - IME input support
 * - Performance optimizations
 * - Proper cleanup
 *
 * @example
 * // Basic usage with Material-UI OutlinedInput
 * <DebouncedInput
 *   inputComponent={OutlinedInput}
 *   value={value}
 *   onChange={handleChange}
 *   placeholder="Enter text"
 *   fullWidth
 * />
 *
 * @example
 * // Advanced usage with validation and transformation
 * <DebouncedInput
 *   inputComponent={OutlinedInput}
 *   value={value}
 *   onChange={handleChange}
 *   debounceTime={500}
 *   minLength={3}
 *   maxLength={50}
 *   trim
 *   transformValue={(value) => value.toLowerCase()}
 *   validateValue={(value) => /^[a-zA-Z0-9]+$/.test(value)}
 *   immediateCallback={(value) => console.log('Typing:', value)}
 * />
 *
 * @example
 * // Password input with toggle
 * <DebouncedInput
 *   inputComponent={OutlinedInput}
 *   type={showPassword ? 'text' : 'password'}
 *   value={password}
 *   onChange={handleChange}
 *   endAdornment={
 *     <InputAdornment position="end">
 *       <IconButton onClick={togglePassword}>
 *         <Icon icon={showPassword ? 'eye' : 'eye-off'} />
 *       </IconButton>
 *     </InputAdornment>
 *   }
 * />
 *
 * @example
 * // With Material-UI TextField and InputProps
 * <DebouncedInput
 *   inputComponent={TextField}
 *   value={value}
 *   onChange={handleChange}
 *   InputProps={{
 *     startAdornment: (
 *       <InputAdornment position="start">
 *         <UserIcon />
 *       </InputAdornment>
 *     )
 *   }}
 * />
 *
 * @typedef {Object} DebouncedInputProps
 * @property {string|number} value - Current input value
 * @property {function} onChange - Change handler function
 * @property {function} [onBlur] - Blur handler function
 * @property {function} [onFocus] - Focus handler function
 * @property {number} [debounceTime=500] - Debounce delay in milliseconds
 * @property {React.ElementType} [inputComponent='input'] - Component to render as input
 * @property {function} [immediateCallback] - Callback to run immediately on change
 * @property {number} [minLength=0] - Minimum length requirement
 * @property {number} [maxLength] - Maximum length constraint
 * @property {boolean} [trim=false] - Whether to trim value
 * @property {function} [transformValue] - Value transformer function
 * @property {function} [validateValue] - Value validator function
 *
 * @component
 * @param {DebouncedInputProps} props
 * @returns {React.ReactElement}
 *
 * @example
 *

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Stack,
  Paper,
  Typography,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  Button,
  Divider,
  TextField
} from '@mui/material';
import { Icon as Iconify } from '@iconify/react';
import DebouncedInput from 'components/DebouncedInput/DebouncedInput';
import MainCard from 'components/MainCard';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AnimateButton from 'components/@extended/AnimateButton';

// Validation schema
const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
  email: yup.string().email('Must be a valid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  phone: yup.string().matches(/^\+?[0-9]{10,}$/, 'Invalid phone number')
});

// Icons configuration
const ICONS = {
  USER: 'solar:user-bold-duotone',
  EMAIL: 'solar:letter-bold-duotone',
  PHONE: 'solar:phone-bold-duotone',
  PASSWORD: 'solar:lock-password-bold-duotone',
  EYE_SHOW: 'solar:eye-bold-duotone',
  EYE_HIDE: 'solar:eye-closed-bold-duotone'
};

const UserManagement = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      phone: ''
    }
  });

  // Watch form values
  const values = watch();

  // Handle form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log('Form submitted:', data);
      // Add your API call here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generic change handler
  const handleChange = (field) => (e) => {
    const value = e?.target?.value ?? e;
    setValue(field, value, { shouldValidate: true });
  };

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Method 1: Using e.target.value (event object)
  const handleChangeWithEvent = (field) => (e) => {
    console.log('🔄 handleChangeWithEvent:', field, e.target.value);
    setValue(field, e.target.value, { shouldValidate: true });
  };

  // Method 2: Using direct value
  const handleChangeWithValue = (field) => (value) => {
    console.log('🔄 handleChangeWithValue:', field, value);
    setValue(field, value, { shouldValidate: true });
    //The { shouldValidate: true } option comes from React Hook Form's setValue method.
    //It's part of the SetValueConfig interface in react-hook-form.
  };

  return (
    <MainCard title="User Management">
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          // Username Field
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="username-input">Username</InputLabel>
              <DebouncedInput
                inputComponent={OutlinedInput}
                id="username-input"
                value={values.username}
                onChange={handleChange('username')}
                placeholder="Enter username"
                fullWidth
                error={Boolean(errors.username)}
                startAdornment={
                  <InputAdornment position="start">
                    <Iconify icon={ICONS.USER} width="20" height="20" />
                  </InputAdornment>
                }
                debounceTime={500}
                minLength={3}
                transformValue={(value) => value.toLowerCase()}
                validateValue={(value) => value.length >= 3}
              />
              {errors.username && (
                <Typography color="error" variant="caption">
                  {errors.username.message}
                </Typography>
              )}
            </Stack>
          </Grid>

          // Email Field
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email-input">Email Address</InputLabel>
              <DebouncedInput
                inputComponent={OutlinedInput}
                id="email-input"
                type="email"
                value={values.email}
                onChange={handleChange('email')}
                placeholder="Enter email address"
                fullWidth
                error={Boolean(errors.email)}
                startAdornment={
                  <InputAdornment position="start">
                    <Iconify icon={ICONS.EMAIL} width="20" height="20" />
                  </InputAdornment>
                }
              />
              {errors.email && (
                <Typography color="error" variant="caption">
                  {errors.email.message}
                </Typography>
              )}
            </Stack>
          </Grid>

          // Password Field
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="password-input">Password</InputLabel>
              <DebouncedInput
                inputComponent={OutlinedInput}
                id="password-input"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                placeholder="Enter password"
                fullWidth
                error={Boolean(errors.password)}
                startAdornment={
                  <InputAdornment position="start">
                    <Iconify icon={ICONS.PASSWORD} width="20" height="20" />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      color="secondary"
                      aria-label="toggle password visibility"
                    >
                      <Iconify icon={showPassword ? ICONS.EYE_SHOW : ICONS.EYE_HIDE} width="20" height="20" />
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password && (
                <Typography color="error" variant="caption">
                  {errors.password.message}
                </Typography>
              )}
            </Stack>
          </Grid>

          // Phone Field
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="phone-input">Phone Number</InputLabel>
              <DebouncedInput
                inputComponent={OutlinedInput}
                id="phone-input"
                value={values.phone}
                onChange={handleChange('phone')}
                placeholder="Enter phone number"
                fullWidth
                error={Boolean(errors.phone)}
                startAdornment={
                  <InputAdornment position="start">
                    <Iconify icon={ICONS.PHONE} width="20" height="20" />
                  </InputAdornment>
                }
              />
              {errors.phone && (
                <Typography color="error" variant="caption">
                  {errors.phone.message}
                </Typography>
              )}
            </Stack>
          </Grid>

         // Submit Button
          <Grid item xs={12}>
            <AnimateButton>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </AnimateButton>
           // Normal Input Password Input with no validation
            <Grid item xs={12}>
              <div style={{ marginTop: '20px' }}>
                <DebouncedInput
                  inputComponent={TextField}
                  id="password-input-no-validation"
                  value={values.password}
                  onChange={handleChange('password')}
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  placeholder="Enter password with no validation"
                  fullWidth
                  variant="outlined"
                  size="small"
                  debounceTime={500}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon={ICONS.PASSWORD} width="20" height="20" />
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon={ICONS.PASSWORD} width="20" height="20" />
                      </InputAdornment>
                    )
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ marginTop: '20px' }}>
               // Method 1: Event-based approach
                <DebouncedInput
                  inputComponent={TextField}
                  id="password-input-event"
                  value={values.password}
                  onChange={handleChangeWithEvent('password')}
                  type={showPassword ? 'text' : 'password'}
                  label="Password (Event-based)"
                  placeholder="Enter password (event-based)"
                  fullWidth
                  variant="outlined"
                  size="small"
                  debounceTime={500}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword}>
                          <Iconify icon={showPassword ? ICONS.EYE_SHOW : ICONS.EYE_HIDE} width="20" height="20" />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

             // Method 2: Direct value approach
                <DebouncedInput
                  inputComponent={TextField}
                  id="password-input-direct"
                  value={values.confirmPassword}
                  onChange={handleChangeWithValue('confirmPassword')}
                  type={showPassword ? 'text' : 'password'}
                  label="Confirm Password (Direct value)"
                  placeholder="Enter password (direct value)"
                  fullWidth
                  variant="outlined"
                  size="small"
                  debounceTime={500}
                  sx={{ mt: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword}>
                          <Iconify icon={showPassword ? ICONS.EYE_SHOW : ICONS.EYE_HIDE} width="20" height="20" />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </form>

     // Debug Section
      {process.env.NODE_ENV === 'development' && (
        <Box mt={4}>
          <Divider />
          <Paper sx={{ p: 2, mt: 2, bgcolor: 'grey.100' }}>
            <Typography variant="h6">Debug Information</Typography>
            <pre>{JSON.stringify({ values, errors }, null, 2)}</pre>
          </Paper>
        </Box>
      )}
    </MainCard>
  );
};

export default UserManagement;
 *
 *

*/
