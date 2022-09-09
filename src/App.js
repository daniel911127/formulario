import './App.scss';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';


function App() {
  const [done, setDone] = useState(false);
  return (
    <div className="App">
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = 'por favor ingresa un nombre';
          } else if (values.name.length < 4) {
            errors.name = 'ingresa al menos 4 caracteres'
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
            errors.name = 'el nombre solo puede contener letras y espacios'
          }
          if (!values.email) {
            errors.email = 'por favor ingresa un correo';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'correo invalido';
          }
          if (!values.password) {
            errors.password = 'por favor ingresa una contraseña'
          } else if (values.password.length < 6) {
            errors.password = 'Mínimo 6 caracteres'
          }
          return errors
        }
        }
        onSubmit={(values, { setSubmitting ,resetForm}) => {
          resetForm();
          setDone(true);
          setTimeout(() => {
            setSubmitting(false);
            setDone(false)

          }, 1000);
        }}
      >{({
        isSubmitting
      }
      ) => (
        <Form >
          <div>
            <label htmlFor="name">Name</label>
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Jhon Doe"
            />
            <ErrorMessage className="errors" name="name" component="div" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="example@email.com"
            />
            <ErrorMessage className="errors" name="email" component="div" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="password"
            />
            <ErrorMessage className="errors" name="password" component="div" />
          </div>
          <div>
            <button type="submit" disabled={isSubmitting}>Create User</button>
            {
              done && <p>Usuario creado correctamente</p>
            }
          </div>
        </Form>
      )}

      </Formik>

    </div>
  );
}

export default App;
