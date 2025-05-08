import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { registerSchema } from '../utils/validationSchemas';
import { registerUser, getAllSports } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Register = () => {
  const navigate = useNavigate();
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingSports, setFetchingSports] = useState(true);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await getAllSports();
        setSports(response.data);
      } catch (error) {
        console.error('Error fetching sports:', error);
        toast.error('Failed to fetch sports list');
      } finally {
        setFetchingSports(false);
      }
    };

    fetchSports();
  }, []);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    role: '',
    mobile: '',
    dob: '',
    sportID: '',
    machineId: '',
    yearsOfExp: '',
  };

  const handleSubmit = async (values, { setSubmitting, resetForm, setFieldError }) => {
    const formattedDOB = values.dob ? new Date(values.dob).toISOString().split('T')[0] : null;

    const formattedValues = {
      ...values,
      dob: formattedDOB,
      sportID: values.sportID ? parseInt(values.sportID, 10) : 0,
      yearsOfExp: values.yearsOfExp ? parseInt(values.yearsOfExp, 10) : 0
    };

    setLoading(true);
    try {
      const response = await registerUser(formattedValues);
      console.log('Registration successful:', response);

      toast.success('Registration successful! Redirecting to login...');
      resetForm();

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      console.error('Registration error:', error);

      if (error.response?.data?.errors) {
        const apiErrors = error.response.data.errors;
        Object.keys(apiErrors).forEach(key => {
          const formKey = key.charAt(0).toLowerCase() + key.slice(1);
          setFieldError(formKey, apiErrors[key].join(' '));
        });
        toast.error('Please fix the form errors');
      } else {
        toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
      }
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  if (fetchingSports) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Create an Account</h2>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                  User Name *
                </label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.name && touched.name ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                <ErrorMessage name="name" component="p" className="mt-1 text-sm text-red-600" />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                  Email *
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                <ErrorMessage name="email" component="p" className="mt-1 text-sm text-red-600" />
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                  Password *
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.password && touched.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                <ErrorMessage name="password" component="p" className="mt-1 text-sm text-red-600" />
              </div>

              <div>
                <label htmlFor="role" className="block text-gray-700 text-sm font-medium mb-2">
                  Role *
                </label>
                <Field
                  id="role"
                  name="role"
                  type="text"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.role && touched.role ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Enter role"
                />
                <ErrorMessage name="role" component="p" className="mt-1 text-sm text-red-600" />
              </div>


              <div>
                <label htmlFor="mobile" className="block text-gray-700 text-sm font-medium mb-2">
                  Mobile Number *
                </label>
                <Field
                  id="mobile"
                  name="mobile"
                  type="text"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.mobile && touched.mobile ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="e.g., 1234567890"
                />
                <ErrorMessage name="mobile" component="p" className="mt-1 text-sm text-red-600" />
              </div>

              <div>
                <label htmlFor="dob" className="block text-gray-700 text-sm font-medium mb-2">
                  Date of Birth *
                </label>
                <Field
                  id="dob"
                  name="dob"
                  type="date"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.dob && touched.dob ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                <ErrorMessage name="dob" component="p" className="mt-1 text-sm text-red-600" />
              </div>

              <div>
                <label htmlFor="sportID" className="block text-gray-700 text-sm font-medium mb-2">
                  Sports *
                </label>
                <Field
                  as="select"
                  id="sportID"
                  name="sportID"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.sportID && touched.sportID ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="">Select a sport</option>
                  {sports.map((sport) => (
                    <option key={sport.id} value={sport.id}>
                      {sport.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="sportID" component="p" className="mt-1 text-sm text-red-600" />
              </div>

              <div>
                <label htmlFor="machineId" className="block text-gray-700 text-sm font-medium mb-2">
                  Machine *
                </label>
                <Field
                  id="machineId"
                  name="machineId"
                  type="text"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.machineId && touched.machineId ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Machine ID or name"
                />
                <ErrorMessage name="machineId" component="p" className="mt-1 text-sm text-red-600" />
              </div>

              <div>
                <label htmlFor="yearsOfExp" className="block text-gray-700 text-sm font-medium mb-2">
                  Experience (years) *
                </label>
                <Field
                  id="yearsOfExp"
                  name="yearsOfExp"
                  type="number"
                  min="0"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.yearsOfExp && touched.yearsOfExp ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                <ErrorMessage name="yearsOfExp" component="p" className="mt-1 text-sm text-red-600" />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? <LoadingSpinner /> : 'Register'}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-blue-600 hover:text-blue-800">
            Already a user? Please Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;