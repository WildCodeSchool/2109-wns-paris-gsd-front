import ProjectsTable from '../ProjectsTable/ProjectsTable'
import Header from '../Header/Header'
import Nav from '../Nav/Nav'
import './AllProjects.scss'

const AllProjects: React.FC = () => {
  
  return (
    <>
      <Header />
      <div className="allprojects_container">
        <Nav />
        <ProjectsTable />
      </div>
    </>
  )
}

export default AllProjects;
