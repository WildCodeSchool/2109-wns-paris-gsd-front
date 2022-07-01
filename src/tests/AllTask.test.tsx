import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import { GraphQLError } from "graphql";
import { BrowserRouter } from "react-router-dom";
import AllTasks from "../components/AllTasks/AllTasks";
import { GET_TASKS } from "../query";

describe('On component mount', () => {
  describe('while no data', () => {
    it('should render loading...', () => {
      render(
        <MockedProvider mocks={[]} addTypename={false}>
           <BrowserRouter>
            <AllTasks theme={'light'}/>
          </BrowserRouter>
        </MockedProvider>
      )

      const loadingElem = screen.getByText(/Loading.../i)
      expect(loadingElem).toBeTruthy()
    });
  });

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
          <BrowserRouter>
            <AllTasks theme={'light'}/>
          </BrowserRouter>
        </MockedProvider>
      )

      const errorElem = await waitFor(() => screen.getByText(/Error.../i))
      expect(errorElem).toBeTruthy()
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
              {
                id: 2,
                title: 'titre',
                description: 'la description',
                advancement: 75,
                scheduled_time: '5',
                status: 'IN PROGRESS',
              },
              {
                id: 3,
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
          <BrowserRouter>
            <AllTasks theme={'light'}/>
          </BrowserRouter>
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