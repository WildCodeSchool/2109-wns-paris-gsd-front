import ProjectsTable from '../ProjectsTable/ProjectsTable'
import Header from '../Header/Header'
import Nav from '../Nav/Nav'
import './AllProjects.scss'
import { ITheme } from '../App/App'

type IAllProjects = ITheme;

const AllProjects: React.FC<IAllProjects> = ({theme}) => {
  
  return (
    <>
      <Header />
      <div className="allprojects_container">
        <Nav />
        <ProjectsTable theme={theme} />
      </div>
    </>
  )
}

export default AllProjects;
