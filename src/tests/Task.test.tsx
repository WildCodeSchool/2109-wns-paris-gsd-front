import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Tasks from '../components/Tasks/Tasks'
import { MockedProvider } from '@apollo/client/testing'
import { GET_TASKS } from '../query'
import { GraphQLError } from 'graphql'

describe('On component mount', () => {
  describe('while no data', () => {
    it('should render loading...', () => {
      render(
        <MockedProvider mocks={[]} addTypename={false}>
          <Tasks />
        </MockedProvider>
      )

      const loadingElem = screen.getByText(/Loading.../i)
      expect(loadingElem).toBeInTheDocument()
    })
  })
  describe('if fetch error', () => {
    it('should render Error :', async () => {
      render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: GET_TASKS,
              },
              result: {
                errors: [new GraphQLError('error')],
              },
            },
          ]}
          addTypename={false}
        >
          <Tasks />
        </MockedProvider>
      )

      const errorElem = await waitFor(() => screen.getByText(/Error.../i))
      expect(errorElem).toBeInTheDocument()
    })
  })
  describe('if data', () => {
    it('should render lots of stuff', async () => {
      const mocks = [
        {
          request: {
            query: GET_TASKS,
          },
          result: {
            data: [
              {
                id: 1,
                title: 'titre',
                description: 'la description',
                advancement: 75,
                scheduled_time: '5',
                status: 'IN PROGRESS',
              },
            ],
          },
        },
      ]

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Tasks />
        </MockedProvider>
      )
      const elems = ['titre', 'la description', '5%']

      elems.map(async (elemText) => {
        const regexp = new RegExp(`/${elemText}/i`)
        const curElem = await waitFor(() => screen.getByText(regexp))
        expect(curElem).toBeInTheDocument()
      })
    })
  })
})

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });