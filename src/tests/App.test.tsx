import matchMedia from './mocks/matchMedia'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../components/App/App'
import { MockedProvider } from '@apollo/client/testing'
import { GET_TASKS, LOGIN_USER } from '../query'
import { GraphQLError } from 'graphql'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../hooks/useAuth'
import { act } from 'react-dom/test-utils'


/**
 * ! ISSUE mocking function not implemented in JSDOM
 * * src: https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
 */
beforeEach(() => {
  matchMedia()
});

describe('On component mount', () => {
  describe('while a user is not connected', () => {
    it('should render a sign up page', () => {
      
      render(
        <MockedProvider mocks={[]} addTypename={false}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MockedProvider>
      )

      const inputUsernameElem = screen.getByPlaceholderText(/username/i)
      const inputPasswordElem = screen.getByPlaceholderText(/password/i)

      expect(inputUsernameElem).toBeInTheDocument()
      expect(inputPasswordElem).toBeInTheDocument()
    })
  })

  // describe('if fetch error', () => {
  //   it('should render Error :', async () => {
  //     const loginUser = { id: 1, username: 'test'}

  //     render(
  //       <MockedProvider
  //         mocks={[
  //           {
  //             request: {
  //               query: LOGIN_USER,
  //               variables: {
  //                 data: {
  //                   username: 'test',
  //                   password: 'test'
  //                 }
  //               }
  //             },
  //             result: {
  //               data: {loginUser},
  //             },
  //           },
  //         ]}
  //         addTypename={false}
  //       >
  //          <BrowserRouter>
  //         <AuthProvider >
  //           <App />
  //         </AuthProvider>
  //         </BrowserRouter>
  //       </MockedProvider>
  //     )

  //     act(() => {
  //       fireEvent.change(
  //         screen.getByPlaceholderText('username'),
  //         {target: {value: 'test'}}
  //       )
  
  //       fireEvent.change(
  //         screen.getByPlaceholderText('password'),
  //         {target: {value: 'test'}}
  //       )
  
  //       fireEvent(
  //         screen.getByText('Login'),
  //         new MouseEvent('click', {
  //           bubbles: true,
  //           cancelable: true
  //         })
  //       )
  //     })
  //     // console.log(screen.debug())

  //     // const errorElem = await waitFor(() => screen.getByText(/Error.../i))
  //     // expect(errorElem).toBeInTheDocument()
  //   })
  // })
  // describe('if data', () => {
  //   it('should render lots of stuff', async () => {
  //     const mocks = [
  //       {
  //         request: {
  //           query: GET_TASKS,
  //         },
  //         result: {
  //           data: [
  //             {
  //               id: 1,
  //               title: 'titre',
  //               description: 'la description',
  //               advancement: 75,
  //               scheduled_time: '5',
  //               status: 'IN PROGRESS',
  //             },
  //           ],
  //         },
  //       },
  //     ]

  //     render(
  //       <MockedProvider mocks={mocks} addTypename={false}>
  //         <App />
  //       </MockedProvider>
  //     )
  //     const elems = ['titre', 'la description', '5%']

  //     elems.map(async (elemText) => {
  //       const regexp = new RegExp(`/${elemText}/i`)
  //       const curElem = await waitFor(() => screen.getByText(regexp))
  //       expect(curElem).toBeInTheDocument()
  //     })
  //   })
  // })
})

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
