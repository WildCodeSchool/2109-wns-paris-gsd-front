import matchMedia from './mocks/matchMedia'
import { render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../components/App/App'
import { MockedProvider } from '@apollo/client/testing'
import { BrowserRouter } from 'react-router-dom'

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
})
