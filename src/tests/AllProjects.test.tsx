import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import ProjectsTable from "../components/ProjectsTable/ProjectsTable";
import Table from "../components/Table/Table";
import IProject from "../interfaces/Project";
import { RoleName } from "../interfaces/Role";
import { ISingleTask } from "../interfaces/SingleTask";
import { StatusName } from "../interfaces/Task";
import { GET_PROJECTS } from "../query";

const elems = ['project', 'manager','progression', 'status', 'deadline']

describe('On component mount', () => {
  describe('while no data', () => {
    it('should render just only columns', () => {
      render(
        <MockedProvider mocks={[]} addTypename={false}>
           <BrowserRouter>
            <ProjectsTable theme={'light'}/>
          </BrowserRouter>
        </MockedProvider>
      )

      elems.map(async (elemText) => {
        const regexp = new RegExp(`/${elemText}/i`)
        const curElem = await waitFor(() => screen.getByText(regexp))
        expect(curElem).toBeInTheDocument()
      })
    });
  });

  describe('if data', () => {
    it('should render lots of stuff', async () => {
      const mocks = [
        {
          request: {
            query: GET_PROJECTS,
          },
          result: {
            data: [
              {
                id: 1,
                status: StatusName.IN_PROGRESS,
                name: 'titre',
                ending_time: JSON.stringify(new Date()),
                tasks: [{
                  id: 1, 
                  title: 'tache', 
                  project: {
                    id: 1, 
                    ending_time: JSON.stringify(new Date())
                  } 
                }],
                users: [{
                  username: 'testuser',
                  role: {
                    id: 1,
                    label: RoleName.MANAGER
                  },
                  comments: [{id: 1, content: 'hkjhhjk'}],
                  Tasks: [{
                    id: 1, 
                    title: 'tache', 
                    project: {
                      id: 1, 
                      ending_time: JSON.stringify(new Date())
                    }
                  }]
                }]
              },
              // {
              //   id: 2,
              //   status: StatusName.IN_PROGRESS,
              //   name: 'titre 2',
              //   ending_time: new Date(),
              //   tasks: [{}],
              //   users: [{}]
              // },
              // {
              //   id: 3,
              //   status: StatusName.IN_PROGRESS,
              //   name: 'titre 3',
              //   ending_time: new Date(),
              //   tasks: [{}],
              //   users: [{}]
              // },
            ],
          },
        },
      ]

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <BrowserRouter>
          <Table entity='project' columns={elems} data={mocks[0].result.data}  displayData={(item: IProject) => {
                const projectManager = item.users?.find(user => user.role.label === 'MANAGER')?.username;
                const totalTasks = item.tasks?.length;
                const tasksDone = item.tasks?.filter((task: ISingleTask) => task.status === StatusName.DONE).length;
                const projectDonePercent = (totalTasks === 0) ? 0 : (tasksDone!*100)/totalTasks!;
                const projectStatus = projectDonePercent === 0 ? 'NEW' : projectDonePercent === 100 ? 'DONE' : 'IN PROGRESS'; 
                return(
                    <tr key={item.id} className="task modal-toggle" onClick={() => {
                       
                      }}>
                        <td className={`project_table_row_item`}>{item.name}</td>
                        <td className={`project_table_row_item`}>{projectManager}</td>
                        <td className={`project_table_row_item`}>{projectDonePercent}%</td>
                        <td className={`project_table_row_item`}>{projectStatus}</td>
                        <td className={`task_table_row_item`}>
                        {/* ici on recoit une string time stamp qu'on doit parser en nombre */}
                        {new Date(item.ending_time).toLocaleDateString('fr')}
                        </td>
                    </tr>
                )
            }} />
          </BrowserRouter>
        </MockedProvider>
      )
    })
  })

})